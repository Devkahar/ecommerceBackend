const express = require('express');
const { adminMiddelware, requireSignin } = require('../../comman-middleware');
const { initData } = require('../../controller/admin/initData');
const router = express.Router();


router.get('/initialdata',requireSignin,adminMiddelware,initData);

module.exports = router;