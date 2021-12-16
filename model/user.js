const mongoose = require('mongoose');
const user = new mongoose.Schema({
    name:   {type: String},
    email:  {type: String, unique: true},
    street: {type: String},
    password: {type: String, min: [8, "password should be atleast 8 characters long"]}
    
});

const UserSchema = mongoose.model('UserSchema', user);
module.exports = {UserSchema};