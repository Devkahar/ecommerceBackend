const express = require('express');
const { adminMiddelware, requireSignin, upload } = require('../comman-middleware');
const { addProduct,getProductBySlug, getProductDetailsById } = require('../controller/product');
const router = express.Router();


router.post('/product/create',requireSignin,adminMiddelware,upload.array('productPicture'),addProduct);
router.get('/products/:slug',getProductBySlug);
router.get('/product/:productId',getProductDetailsById);
module.exports = router;