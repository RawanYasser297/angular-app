const express = require("express");
const router = express.Router();
const {
 addToCart,getCart,updateQuantity,removeFromCart
} = require("../controllers/cart.controller");

const { protect } = require("../middlewares/auth.middleware");


router.post("/", protect("user"), addToCart);
router.get("/", protect("user"), getCart);
router.delete("/:productSlug", protect("user"), removeFromCart);
router.put("/", protect,protect("user"), updateQuantity);

module.exports = router;