const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
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
        type: String,
        default:1   
    }
});


const product = mongoose.model('product', productSchema);

module.exports = product;

