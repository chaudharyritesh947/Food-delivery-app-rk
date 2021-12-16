const mongoose = require('mongoose');
const menu = require('./menu');

const cart = new mongoose.Schema({
    items:  [{ name: {type: String}, description: {type: String}, price: {type: String} }],
    userId:  { type: mongoose.SchemaTypes.ObjectId, ref: "userschema" },
    amount: {type: Number},
    cartOrdered: {type: Boolean, default: false}
})

const CartSchema = mongoose.model('CartSchema', cart);
module.exports = {CartSchema};