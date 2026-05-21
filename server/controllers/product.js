const Product = require("../models/product"); // Path to your schema file

// @desc    Create a new product
// @route   POST /api/products
exports.createProduct = async (req, res) => {
  const { title, price, slug, category, stock, session, description } =
    req.body;


  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      message: "Please upload at least one image",
    });
  }

  const images = req.files.map((file) => file.filename);

  try {
    const product = await Product.create({
      title,
      price,
      images,
      slug,
      category,
      stock,
      session,
      status: getStatus(Number(stock)),
      description,
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
};

const getStatus = (stock) => {
  if (stock === 0) return "outOfStock";
  if (stock < 5) return "lowStock";
  return "inStock";
};

// @desc    Get all products (with optional filtering)
// @route   GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res
      .status(200)
      .json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Get single product by slug
// @route   GET /api/products/:slug
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const { stock } = req.body;

    const updatedData = {
      ...req.body,
    };

    // 👇 احسب status بس لو stock موجود
    if (stock !== undefined) {
      updatedData.stock = Number(stock);
      updatedData.status = getStatus(Number(stock));
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
