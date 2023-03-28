const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const PostModel = require("../Models/PostModel");
const crypto = require('crypto')
const sharp = require('sharp')
const { uploadFile, deleteFile, getObjectSignedUrl } = require('../Middlewares/s3')


const maxAge = 1*24*60*60
const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')


const createToken = (id) =>{
    return jwt.sign({id},"alwin abraham",{
        expiresIn:maxAge
    })
};

const handleErrors = (err) =>{
    let errors = {email:"",password:"",phoneno:""}; 

    if(err.message === "Incorrect Email") 
        errors.email = "That email is not registered"
    if(err.message === "Incorrect password")
        errors.email = "That password is incorrect"
    if(err.code===11000){
        errors.email = "Email is already registered";
        return errors;
    }
    if(err.message.includes("Users validation failed")){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        })
    }
    return errors;
}
 
module.exports.login = async (req,res,next)=>{
    try{
        const {email,password} = req.body;
        const user = await UserModel.login(email, password)
        const token = createToken(user._id);

        res.cookie("jwt",token,{
            withCredentials:true,
            httpOnly: false,
            maxAge:maxAge*1000
        })
        res.status(200).json({user:user._id, created:true})
    }catch(err){
        const errors = handleErrors(err)
        res.json({errors,created: false})
    }
}

module.exports.otp_login = async(req,res,next)=>{
    console.log(req.body);
    try{
        const {phoneno} = req.body;
        const user = await UserModel.otp_login(phoneno)
        const token = createToken(user._id);

        res.cookie("jwt",token,{
            withCredentials:true,
            httpOnly: false,
            maxAge:maxAge*1000
        })
        res.status(200).json({user:user._id, created:true})
    }catch(err){
        const errors = handleErrors(err)
        res.json({errors,created: false})
    }
}

module.exports.register = async (req,res,next)=>{
    try{
        const {email,password,phoneno} = req.body;
        const user = await UserModel.create({email, password, phoneno})
        const token = createToken(user._id);

        res.cookie("jwt",token,{
            withCredentials:true,
            httpOnly: false,
            maxAge:maxAge*1000
        })
        res.status(201).json({user:user._id, created:true})
    }catch(err){
        const errors = handleErrors(err)
        res.json({errors,created: false})
    }
}

module.exports.upload_post = async (req,res,next)=>{
    try{
        console.log("req.body",req.body);
        console.log("req.file",req.file);

        const file = req.file
        const content = req.body.caption
        const imageName = generateFileName()
        const dateAndTime = new Date();
      
        const fileBuffer = await sharp(file.buffer)
          .resize({ height: 1080, width: 1920, fit: "contain" })
          .toBuffer()
      
        await uploadFile(fileBuffer, imageName, file.mimetype)
      
        const post = await PostModel.create({
            imageName,
            content,
            dateAndTime,
        })
        res.status(201).send(post)
    }catch(err){
        console.log(err);
    }
}