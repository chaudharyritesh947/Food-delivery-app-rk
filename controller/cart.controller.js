const {CartSchema} = require('../model/cart');
const {UserSchema} = require('../model/user');

const addCart = (req, res) => {
    const cartItem = req.body;
    const user = req.user.user;
    //61ba3ad9f42c8a157890b41e
    const query = {
        "userId": user._id,
        "cartOrdered": false
    }
    const cart = CartSchema.findOne(query).then((data)=>{
        if(data){
            let cartDataItem = {
                name: cartItem.name,
                description: cartItem.description,
                price: cartItem.amount
            }
            let newAmount = Number(data.amount) + Number(cartItem.amount);
            CartSchema.updateOne({userId:user._id}, 
                {
                    "$push": { "items": cartDataItem },
                    "amount": newAmount
                }, 
                function (err, data) {
                if (err){
                    console.log(err);
                    return  res.status(400).json({"msg":"failure", err: err})
                }
                else{
                    console.log("Updated Docs : ", data);
                    return  res.status(200).json({"msg":"Success", data: data})
                }
            });
        }
        else{
            const item = {
                items: [{name: cartItem.name, description: cartItem.description, price: cartItem.amount }],
                userId: user._id,
                amount: cartItem.amount
            }

            const newCart = new CartSchema(item)
            newCart.save().then((data)=>{
                if(data){
                  return  res.status(200).json({"msg":"Success", data: data})
                }
                else{
                    return  res.status(400).json({"msg":"Could not save data"})
                }
            }).catch((err)=>{
                return  res.status(400).json({"msg":err})
            });
        }
    });

    if(!cart){
        return res.json({
           msg:"Cart not found"
        })
    }
   
}


const deleteCartItem = (req, res) => {
    const cartItem = req.body;
    const user = req.user.user;

    const query = {
        "userId": user._id
    }

    const cart = CartSchema.findOne(query).then((data)=>{
        if(data){
            CartSchema.updateOne({userId:user._id}, 
                {
                    "$pull": { "items": cartItem.item }
                },
                function (err, data) {
                if (err){
                    console.log(err);
                    return  res.status(400).json({"msg":"failure", err: err})
                }
                else{
                    console.log("Updated Docs : ", data);
                    return  res.status(200).json({"msg":"Success", data: data})
                }
            });
        }
        else{
            return  res.status(400).json({"msg":"List is empty"})
        }
    });
}

module.exports = {
    addCart,
    deleteCartItem
}