const address = require("../models/address");
const UserAddress = require("../models/address");

exports.addAddress = (req, res) => {
  //return res.status(200).json({body: req.body})
  const { payload } = req.body;
  if (payload.address) {
    if (payload.address._id) {
        console.log(payload.address);
      UserAddress.findOne(
        { user: req.user._id}
      ).exec((error, _address) => {
          if(_address){
            let {address} = _address;
            let temp = [];
            address.forEach(e =>{
                if(e._id.toString() === payload.address._id.toString()){
                    temp.push(payload.address);
                }else{
                    temp.push(e);
                }
            })
            UserAddress.findOneAndUpdate({user: req.user._id},{"$set":{"address": temp}})
            .exec((error, result) =>{
                if(error) return res.status(400).json({ error });
                if(result) return res.status(201).json({address: result});
            })
          }  
        if (error) return res.status(400).json({ error });
      });
    } else {
      UserAddress.findOneAndUpdate(
        { user: req.user._id },
        {
          $push: {
            address: payload.address,
          },
        },
        { new: true, upsert: true }
      ).exec((error, address) => {
        if (error) return res.status(400).json({ error });
        if (address) {
          res.status(201).json({ address });
        }
      });
    }
  } else {
    res.status(400).json({ error: "Params address required" });
  }
};

exports.getAddress = (req, res) => {
  UserAddress.findOne({ user: req.user._id }).exec((error, userAddress) => {
    if (error) return res.status(400).json({ error });
    if (userAddress) {
      res.status(200).json({ userAddress });
    }
  });
};