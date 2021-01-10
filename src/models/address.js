const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        min:3,
        max:40
    },
    mobileNumber: { 
        type: String, 
        required: true,
        trim: true
    },
    pinCode:{
        type: String,
        required: true,
        trim: true
    },
    locality:{
        type: String,
        required: true,
        trim: true,
        min: 10,
        max: 100,
    },
    address:{
        type: String,
        required: true,
        trim: true,
        min: 10,
        max: 100,
    },
    cityDistrictTown:{
        type: String,
        required: true,
        trim: true,
    },
    state:{
        type: String,
        required: true,
        trim: true,
    },
    landmark:{
        type: String,
        min: 10,
        max: 100,
    },
    alternatePhoneNumber:{
        type: String,
        required: true,
        enum:['home','work'],
        required: true
    }
    

},{timestamps: true});

const userAddressSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    address: [addressSchema]
})

module.exports = mongoose.model('CartAddress',userAddressSchema);