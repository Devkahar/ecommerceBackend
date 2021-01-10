const express = require('express');
const { userMiddelware, requireSignin } = require('../comman-middleware');
const { addAddress, getAddress } = require('../controller/address');
const router = express.Router();

router.post('/user/address/create',requireSignin,userMiddelware,addAddress);
router.get('/user/getAddress',requireSignin,userMiddelware,getAddress);
module.exports = router;