const { default: rootReducer } = require("../../../flipkart-clone/src/reducres/reducres");

const Order = reqired('../modal/Order');

exports.addOrder = (req,res)=>{
    req.body.user = qer.user._id;
    const order = new Order(req.body);
    order.save((error,order)=>{
        if(error) return res.status(400).json({ error });
        if(order) {
            return res.status(201).json({
                order
            })
        }
    })
}

exports.getOrder = (req,res) =>{
    Order.find({user: req.user._id})
    .select("_id paymentStatus items")
    .populate("itmes.productId","_id name productPictures")
    .exec((error,order) =>{
        if(error) return res.status(400).json({ error });
        if(order) return res.status(200).json(order);
    })
}
