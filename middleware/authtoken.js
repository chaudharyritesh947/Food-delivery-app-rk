const express = require("express");
const jwt = require("jsonwebtoken");
var router = express.Router();

const getAuthKey = async (req, res, next) => {

  const secretKey = 'SECRET';
  let user ;

  if(req && req.user){
    user = req.user;
    const token = jwt.sign({ user }, secretKey);

    return res.json({
        token,
        user
      });
  }
  else{
      return res.json({"msg": "Login Failed, no user found"})
  }
}

module.exports = {getAuthKey};
