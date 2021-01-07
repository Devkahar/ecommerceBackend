const express = require('express');
const { userMiddelware, requireSignin } = require('../comman-middleware');
const { addItemToCart, getCartItems } = require('../controller/cart');
const router = express.Router();

router.post('/user/cart/addtocart',requireSignin,userMiddelware,addItemToCart);
router.get('/user/cart/getCartItems',requireSignin,userMiddelware,getCartItems);
module.exports = router;