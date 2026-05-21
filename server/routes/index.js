const express = require("express");
const router = express.Router();

router.use("/hero", require("./hero.routes"));
router.use("/settings", require("./settings.routes"));
router.use("/banner", require("./banner.routes"));
router.use("/progress", require("./progress.routes"));
router.use("/categories", require("./category.routes"));
router.use("/products", require("./product"));
router.use("/testimonials", require("./testimonials.routes"));
router.use("/brands", require("./brands.routes"));
router.use("/user", require("./user"));
router.use("/cart", require("./cart.routes"));

module.exports = router;
