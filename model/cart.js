const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1
    },
    qty:{
        type:Number,
        default:1
    }
});


const cart = mongoose.model('cart', cartSchema);

module.exports = cart;

