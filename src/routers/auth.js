const express = require("express");
const router = express.Router();
const {signup, signin} = require('../controller/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require("../validator/auth");

router.post('/signup',validateSignupRequest,isRequestValidated, signup);
router.post('/signin',validateSigninRequest, isRequestValidated,signin);
// router.post('/profile', requireSignin, (req,res)=>{
//     res.status(200).json({
//         user: 'profile'
//     })
//})
module.exports = router;                  