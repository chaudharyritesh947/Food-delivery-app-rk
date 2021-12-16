const mongoose = require('mongoose');

const order = new mongoose.Schema({
    cartId: { type: mongoose.SchemaTypes.ObjectId, ref: "cartschema" },
    userId:  { type: mongoose.SchemaTypes.ObjectId, ref: "userschema" }
})

const OrderSchema = mongoose.model('OrderSchema', order);
module.exports = {OrderSchema};