const express = require("express");
const { upload, requireSignin, adminMiddelware } = require("../../comman-middleware");
const { createPage, getPage } = require("../../controller/admin/page");
const router = express.Router();


router.post('/page/create',requireSignin,adminMiddelware,upload.fields([
    {name: 'banners'},
    {name: 'products'}
]),createPage);

router.get('/page/:category/:type',getPage);
module.exports = router;