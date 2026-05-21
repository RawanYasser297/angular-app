const express = require("express");
const router = express.Router();

const {
  getBrands,
  updateBrands,
  toggleLogoStatus,
  showBrands
} = require("../controllers/brands.controllers");
const { upload } = require("../middlewares/upload.middleware");

router.get("/", getBrands);
router.get("/show", showBrands);
router.put("/", upload.array("logos"), updateBrands);
router.put("/:logoId", toggleLogoStatus);

module.exports = router;