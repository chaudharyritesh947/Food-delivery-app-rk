const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Route import
const userRouter = require("./route/user");
const menuRouter = require("./route/menu");
const cartRouter = require("./route/cart");
const orderRouter  = require("./route/order");

//Auth section
const {userLogin} = require("./controller/user.controller");
const {getAuthKey} = require('./middleware/authtoken');
const {getTokenDataFromBody} = require('./middleware/verifyToken');
app.use("/login", userLogin, getAuthKey);


app.use("/user", userRouter);
app.use("/menu", menuRouter);

//protected routes
app.use("/cart", getTokenDataFromBody, cartRouter);
app.use("/order", getTokenDataFromBody, orderRouter);

//error handling for no routes found
app.all("*", (req, res) => {
    res.status(404).json({ status: "failure", message: "route not found" });
  });


app.listen(process.env.PORT || 3000, (err)=>{
    if(!err){
        mongoose
        .connect(process.env.CONNECTION_STRING)
        .then(async (conStatus) => {
        console.log("connection success");
        })
        .catch((err) => {
        console.log(err);
        console.log("Connection failed");
        });
    }
    if(err){
        console.log(err);
    }
})