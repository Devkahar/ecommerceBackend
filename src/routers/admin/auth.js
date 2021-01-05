const express = require("express");
const router = express.Router();
const {signup, signin,signout} = require('../../controller/admin/auth');
const { validateSignupRequest,validateSigninRequest, isRequestValidated } = require("../../validator/auth");
const {requireSignin} = require('../../comman-middleware/index');
router.post('/admin/signup',validateSignupRequest,isRequestValidated,signup);
router.post('/admin/signin',validateSigninRequest, isRequestValidated,signin);
router.post('/admin/signout',signout);
module.exports = router;