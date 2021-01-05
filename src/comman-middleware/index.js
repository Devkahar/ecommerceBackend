const user = require("../models/user");
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const shortid = require('shortid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
})

exports.upload = multer({ storage });




exports.requireSignin = (req,res,next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token,process.env.JWT_SECRET);
        req.user = user;
        console.log(token);
        next();
    }
    else{
        return res.status(500).json({
            message: "Auth required"
        })
    }
}

exports.userMiddelware = (req,res,next)=>{
    if(req.user.role !== 'user'){
        return res.status(500).json({
            message: 'user Access Denied'
        })
    }
    next();
}

exports.adminMiddelware = (req,res,next)=>{
    if(req.user.role !== 'admin'){
        return res.status(500).json({
            message: 'adminAccess Denied'
        })
    }
    next();
}