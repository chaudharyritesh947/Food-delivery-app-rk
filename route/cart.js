const express = require('express');
const router = express.Router();
const {addCart, deleteCartItem} = require('../controller/cart.controller');

router.post('/add',  addCart);
router.post('/delete',  deleteCartItem);

module.exports = router;