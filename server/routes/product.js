const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
} = require('../controllers/product');
const { upload } = require('../middlewares/upload.middleware');


router.route('/')
  .get(getProducts) 
  .post(upload.array('images', 5),createProduct);



// Specific route for slug lookup
router.route('/slug/:slug')
  .get(getProduct);

router.route('/:id')
  .put(updateProduct)

module.exports = router;