const User = require("../../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
exports.signup =  (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user) {
      return res.status(400).json({
        message: "Admin already registered",
      });
    }

    const { firstName, lastName, email, password } = req.body;
    const hash_password =await bcrypt.hash(password,10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: Math.random().toString(),
      role: 'admin'
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(500).json({
          message: "Something went wrong",
        });
      }
      if (data) {
        return res.status(201).json({
          message: "Admin created Successfully..!",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error){
      return res.status(500).json({
        error
      });
    }
    if(user){

      if(user.authenticate(req.body.password) && user.role === 'admin'){
        const token = jwt.sign({_id : user._id, role: user.role},process.env.JWT_SECRET,{expiresIn: '48h'});

        res.cookie('token',token,{expiresIn: '48h'});
        const {_id,firstName,lastName,email,role,fillName} = user;
        res.status(200).json({
          token,
          user: {
            _id,firstName,lastName,email,role,fillName
          }
        })

      }else{
        return res.status(400).json({
          message: 'Invalid password'
        })
      }
    }
  });
};

exports.signout = (req,res)=>{
  res.clearCookie('token');
  res.status(200).json({message: 'signout Successful'})
}