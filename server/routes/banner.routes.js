const express = require("express");
const router = express.Router();
const {
  getBanner,
  updateBanner
} = require("../controllers/banner.controller");
const { protect } = require("../middlewares/auth.middleware");

router.get("/", getBanner);
router.put("/", protect("admin"), updateBanner);

module.exports = router;