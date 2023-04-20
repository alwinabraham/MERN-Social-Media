const AdminModal = require("../Models/AdminModel")
const UserModal = require("../Models/UserModel")
const jwt = require("jsonwebtoken");
const { getObjectSignedUrl } = require("../Middlewares/s3");

const maxAge = 1*24*60*60

const createToken = (id) =>{
    return jwt.sign({id},"alwin abraham",{
        expiresIn:maxAge
    })
};

module.exports.login = async (req,res,next)=>{
    try{
        const {email,password} = req.body;
        const user = await AdminModal.login(email, password)
        const token = createToken(user._id);

        res.cookie("adminjwt",token,{
            withCredentials:true,
            httpOnly: false,
            maxAge:maxAge*1000
        })        
        res.status(200).json({user:user._id, created:true})
    }catch(err){
        res.status(500).json(err)
    }
}

module.exports.getAllUsers = async (req,res,next)=>{
    try {
        const data = await UserModal.find({})
        for (let i = 0; i < data.length; i++) {
            imageUrl = await getObjectSignedUrl(data[i].imageName);
            data[i].imageName = imageUrl
          }
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}