const express = require("express");
const router = express.Router();
const {
  getSettings,
  updateSettings
} = require("../controllers/site-settings.controller");
const { protect } = require("../middlewares/auth.middleware");

router.get("/", getSettings);
router.put("/", protect("admin"), updateSettings);

module.exports = router;