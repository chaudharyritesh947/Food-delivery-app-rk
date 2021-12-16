const {UserSchema} = require('../model/user')

const createUser = (req, res) => {
    const userData = req.body;
    const user = new UserSchema(userData);
    user.save().then((data)=>{
            return res.status(200).json(data);
    }).catch(err =>{
        return res.status(400).json({msg:"Error on saving data", error: err});
    });

}

const userLogin = (req, res, next) => {
    const userLogin = req.body;
    UserSchema.findOne({email: userLogin.email}).then((data)=>{
        if(data.password == userLogin.password){
            req.user = data;
            next();
        }
        else{
           return res.json({msg:"Authentication failed"});
        }
    }).catch(err=>{
        res.json(data);
    })
   
}
module.exports = {createUser, userLogin}