const express = require("express");
const router = express.Router();
const {
  getProgress,
  updateProgress,
  createProgress,
} = require("../controllers/progress.controller");

const { protect } = require("../middlewares/auth.middleware");

router.get("/", getProgress);
router.post("/", createProgress);
router.put("/", updateProgress);

module.exports = router;
