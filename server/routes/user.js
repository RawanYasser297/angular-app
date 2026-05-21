const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getUsers,
  getMe,
  updateUserInfo,
  logout,
} = require("../controllers/user");
const { protect } = require("../middlewares/auth.middleware");

router.post("/login", login);
router.post("/logout", logout);
router.get("/me", ...protect(), getMe);

router.route("/").get(...protect("admin"), getUsers).post(signup);

router.route("/:id").put(updateUserInfo);

module.exports = router;
