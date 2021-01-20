const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    addressId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAddress.address",
        required:true,
    },
    totalAmount:{
        type:Naumber,
        required: true,

    },
    items:[
        {
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"Product",
            },
            payablePrice:{
                type: Number,
                required: true,
            },
            purchasedQty:{
                type: Number,
                reqired: true,
            },
        },
    ],
    paymentStatus:{
        type:String,
        enum:["pending","complete","cancelled","refund"],
        required: true,
    },
},
{timestamps: true}
)

modules.exports =mongoose.model("Order",orderSchema);