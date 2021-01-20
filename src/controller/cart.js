const { update } = require("../models/cart");
const Cart = require("../models/cart");


function runUpdate(condition,updateData){
  return new Promise((resolve,reject)=>{
    Cart.findOneAndUpdate(condition,updateData,{upsert: true})
    .then(result => resolve())
    .catch(error => reject(error))
  })
}

exports.addItemToCart = (req, res) => {
  if(req.body.cartItems){
    Cart.findOne({ user: req.user._id }).exec((error, cart) => {
      if (error) return res.status(400).json({ error });
      if (cart && req.body.cartItems.product) {
        //if cart already exists then update cart by quantity
        let promiseArray = [];
  
        req.body.cartItems.forEach((cartItem)=>{
          const product = req.body.cartItem.product;
          const item = cart.cartItems.find((c) => c.product == product);
          let condition,update;
          if (item) {
            condition = {"user": req.user._id, "cartItems.product": product};
            update = {
              "$set": {
                "cartItems.$": cartItem,
              },
            };
          } else {
            condition = { "user": req.user._id };
            update = {
              "$push": {
                "cartItems": cartItem,
              },
            }
          }
          promiseArray.push(runUpdate(condition,update));
        })
        
        // Cart.findOneAndUpdate(condition,update).exec((error, _cart) => {
        //   if (error) return res.status(400).json({ error });
        //   if (_cart) {
        //     return res.status(201).json({ cart: _cart });
        //   }
        // });
        //res.status(200).json({ message: cart });
  
  
        Promise.resolve(promiseArray)
        .then(response => res.status(201).json({response}))
        .catch(error => res.status(400).json({error}))
      } else{
        //if cart not exist then create a new cart
        const cart = new Cart({
          user: req.user._id,
          cartItems: req.body.cartItems,
        });
        cart.save((error, cart) => {
          if (error) return res.status(400).json({ error });
          if (cart) {
            return res.status(201).json({ cart });
          }
        });
      }
    });
  }
};


exports.getCartItems = (req,res) =>{
  Cart.findOne({user: req.user._id})
  .populate('cartItems.product','_id name price productPictures')
  .exec((error,cart)=>{
    if(error) return res.status(400).json({error});
    if(cart){
      console.log(cart);
      let cartItems = {};
      cart.cartItems.forEach((item,index)=>{
        cartItems[item.product._id.toString()] = {
          _id: item.product._id.toString(),
          name: item.product.name,
          img: item.product.productPictures[0].img,
          price: item.product.price,
          qty: item.quantity
        }
      })
      return res.status(200).json({cartItems})
    }
  })
}