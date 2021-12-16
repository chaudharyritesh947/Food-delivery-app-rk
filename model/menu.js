const mongoose = require('mongoose');
const menu = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    price: {type: String}
});

const MenuSchema = mongoose.model('MenuSchema', menu);
module.exports = {MenuSchema};