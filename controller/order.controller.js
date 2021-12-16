const {OrderSchema} = require('../model/order');
const {UserSchema} = require('../model/user');
const {CartSchema} = require('../model/cart');
const mongoose = require('mongoose');
const {sendEmail} = require('../util/sendMail');

const placeOrder = (req, res) => {

    //contains cartId and user Id
    const cart = req.body;

    const user = req.user.user;
    const query = {
        "userId": mongoose.Types.ObjectId(user._id),
        cartOrdered: false, 
        "_id": mongoose.Types.ObjectId(cart.cartId)
    }
 
    //Fetch and update cart
    CartSchema.findOne(query).then((cartData)=>{
        if(cartData && cartData.items && (cartData.items.length > 0)){
            const order = new OrderSchema({
                cartId: mongoose.Types.ObjectId(cartData._id),
                userId: mongoose.Types.ObjectId(user._id)
            });
       
            order.save().then((orderData)=>{
                CartSchema.updateOne(query,
                {
                    "cartOrdered": "true"
                }, 
                function(err, data){
                  
                    if(!err){
                        const orderInfo = {
                            "user": user,
                            "data": data,
                            "orderData": orderData,
                            "cartData": cartData
                        };
                        sendEmail(orderInfo)
                        return res.status(200).json({
                            msg: "Order placed",
                            orderInfo: orderInfo
                        })
                    }
                    else{
                        return res.status(400).json({
                            err: err,
                            msg: "Error while saving the order"
                        })
                    }
                })
            }).catch((err)=>{
                return res.status(400).json({
                    err: err,
                    msg: "Error while saving the order"
                })
            });
        }
        else{
            return res.status(400).json({
                msg: "No cart found or cart is empty!"
            });
        }
    }).catch((err)=>{
        return res.status(400).json({
            err: err
        });
    });  
}


module.exports = {
    placeOrder,
}