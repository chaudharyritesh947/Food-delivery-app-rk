const express = require('express');
const router = express.Router();
const {addMenuItem, getMenuItem} = require('../controller/menu.controller');

router.post('/add-item', addMenuItem );
router.get('/', getMenuItem)
module.exports = router;