const express = require('express');
const { adminMiddelware, requireSignin } = require('../comman-middleware');
const { addCategory, getCategory, updateCategories,deleteCategories} = require('../controller/category');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
})
const upload = multer({ storage });
router.post('/category/create',requireSignin,adminMiddelware,upload.single('categoryImage'),addCategory);
router.post('/category/update',upload.array('categoryImage'),updateCategories);
router.get('/category/getcategory',getCategory);
router.post('/category/delete',deleteCategories);
module.exports = router;