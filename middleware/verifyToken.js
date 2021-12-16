const express = require("express");
const jwt = require("jsonwebtoken");

const getTokenDataFromBody = async (req, res, next) => {
    try {
      const secretKey = 'SECRET';
      let token;
  
      //Checking for token
      let encryptedKey = req && req.body && req.body.token;
  
      if (encryptedKey) {
        token = jwt.verify(encryptedKey, secretKey);
        if (!token) {
            throw new Error("Invalid Token");
        }
        req.user = token;
        next();
      } else {
        throw new Error("Invalid Token");
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ status: "failure", message: err });
    }
  };


  module.exports = {getTokenDataFromBody};