const express = require("express");
const router = express.Router();
const {
  getTestimonials,
  getAllTestimonials,
  createTestimonial,
  reviewTestimonial,
} = require("../controllers/testimonials.controllers");

const { protect } = require("../middlewares/auth.middleware");

// public
router.get("/", getTestimonials);
router.post("/", createTestimonial);

// admin
router.get("/admin", protect("admin"), getAllTestimonials);

// 🔥 review
router.patch("/:id/review", protect("admin"), reviewTestimonial);

module.exports = router;
