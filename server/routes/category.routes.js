const express = require("express");
const router = express.Router();

const {
  getCategories,
  updateSingleCategory
} = require("../controllers/category-panel.controller");

const { protect } = require("../middlewares/auth.middleware");

// GET all categories
router.get("/", getCategories);

// UPDATE single (women, men, ...)
router.patch("/:type", protect("admin"), updateSingleCategory);

module.exports = router;