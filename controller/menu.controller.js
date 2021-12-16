const {MenuSchema} = require('../model/menu');

const addMenuItem = (req, res) => {
    const menuItem = req.body;
    const menu = new MenuSchema(menuItem);
    menu.save().then((data)=>{
        console.log('dk')
        return res.status(200).json({msg:"Menu item added", data: data});
    }).catch((err)=>{
        return res.status(400).json({msg: "error", err: err})
    })
}


const getMenuItem = (req, res) => {
    const menuItems = MenuSchema.find().then((data)=>{
        res.status(200).json({data: data})
    }).catch((err)=>{
        res.status(400).json({err: err})
    })
}


module.exports = {addMenuItem, getMenuItem}