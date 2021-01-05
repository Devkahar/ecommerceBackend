const express = require('express');
const { userMiddelware, requireSignin } = require('../comman-middleware');
const { addItemToCart } = require('../controller/cart');
const router = express.Router();

router.post('/user/cart/addtocart',requireSignin,userMiddelware,addItemToCart);
module.exports = router;