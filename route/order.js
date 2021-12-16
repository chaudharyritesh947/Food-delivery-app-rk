
const express = require('express');
const router = express.Router();
const {placeOrder} = require('../controller/order.controller');

router.post('/place',  placeOrder);

module.exports = router;