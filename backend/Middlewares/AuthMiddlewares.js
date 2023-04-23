const User = require("../Models/UserModel")
const jwt = require("jsonwebtoken")

module.exports.checkUser = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,"alwin abraham",async(err,decodedToken)=>{
            if(err){
                res.json({status:false, err:err})
            }else{
                const user = await User.findById(decodedToken.id);
                if(user) res.json({status: true, user: user})
                // else if(user.status) res.json({status:false})
                else res.json({status: false});
            }
        })
    }else{
        res.json({status:false});
    }
}
module.exports.checkStatus = (req,res,next) =>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,"alwin abraham",async(err,decodedToken)=>{
            if(err){
                res.json({status:false, err:err})
            }else{
                const user = await User.findById(decodedToken.id);
                if(user) res.json({status: true, user: user})
                else if(user.status) res.json({status:false})
                else res.json({status: false});
            }
        })
    }else{
        res.json({status:false});
    }  
}