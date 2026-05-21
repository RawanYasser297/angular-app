const jwt = require("jsonwebtoken");
const User = require("../models/user");

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  addresses: user.addresses || [],
  phoneNumbers: user.phoneNumbers || [],
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const signToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );

const setAuthCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: COOKIE_MAX_AGE,
  });
};

const normalizeAddresses = (addresses = []) =>
  addresses
    .map((address) => ({
      label: String(address?.label || "Location").trim(),
      addressLine: String(address?.addressLine || "").trim(),
      placeId: String(address?.placeId || "").trim(),
    }))
    .filter((address) => address.addressLine);

const normalizePhoneNumbers = (phoneNumbers = []) =>
  phoneNumbers
    .map((phone) => ({
      label: String(phone?.label || "Phone").trim(),
      number: String(phone?.number || "").trim(),
    }))
    .filter((phone) => phone.number);

const buildAuthResponse = (res, statusCode, message, user) => {
  const token = signToken(user);
  setAuthCookie(res, token);

  return res.status(statusCode).json({
    status: "success",
    message,
    token,
    data: sanitizeUser(user),
  });
};

exports.signup = async (req, res) => {
  try {
    const name = req.body.name ?? req.body.Name ?? '';
    const email = req.body.email ?? '';
    const password = req.body.password ?? '';
    const confirmPassword = req.body.confirmPassword ?? req.body.confirm_password ?? password;
    const role = req.body.role ?? "user";
    const addressesInput =
      req.body.addresses ??
      (req.body.location
        ? [{ addressLine: req.body.location }]
        : []);
    const phoneNumbersInput =
      req.body.phoneNumbers ??
      (req.body.phone
        ? [{ number: req.body.phone }]
        : []);

    const {
      addresses = addressesInput,
      phoneNumbers = phoneNumbersInput,
    } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        status: "fail",
        message: "Name, email, password, and confirm password are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "fail",
        message: "Passwords do not match",
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        status: "fail",
        message: "User already exists",
      });
    }

    const user = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      password,
      role,
      addresses: normalizeAddresses(addressesInput || addresses),
      phoneNumbers: normalizePhoneNumbers(phoneNumbersInput || phoneNumbers),
    });

    return buildAuthResponse(res, 201, "User created successfully", user);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: String(email).trim().toLowerCase(),
    }).select("+password");

    if (!user || !(await user.correctPassword(password))) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    return buildAuthResponse(res, 200, "Login successful", user);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getMe = async (req, res) => {
  return res.status(200).json({
    status: "success",
    data: sanitizeUser(req.user),
  });
};

exports.updateUserInfo = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (payload.addresses) {
      payload.addresses = normalizeAddresses(payload.addresses);
    }

    if (payload.phoneNumbers) {
      payload.phoneNumbers = normalizePhoneNumbers(payload.phoneNumbers);
    }

    if (payload.email) {
      payload.email = String(payload.email).trim().toLowerCase();
    }

    delete payload.password;
    delete payload.confirmPassword;

    const user = await User.findByIdAndUpdate(req.params.id, payload, {
      returnDocument: "after",
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};
