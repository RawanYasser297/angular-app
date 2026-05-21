const express = require("express");
const router = express.Router();

const { getHero , updateHero } = require("../controllers/hero.controller");
const { upload } = require("../middlewares/upload.middleware");
//const { protect } = require("../middlewares/auth.middleware");

router.get("/", getHero);
//router.post("/",upload.single('backgroundImage'), createHero);
router.put("/:id",upload.single('backgroundImage'), updateHero);

module.exports = router;