const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const crypto = require('crypto')
const sharp = require('sharp')
const bcrypt = require('bcrypt')
const { uploadFile, deleteFile, getObjectSignedUrl } = require('../Middlewares/s3');
const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const maxAge = 1*24*60*60

const createToken = (id) =>{
    return jwt.sign({id},"alwin abraham",{
        expiresIn:maxAge
    })
};

const handleErrors = (err) =>{
    let errors = {name:"",email:"",password:"",phoneno:""}; 

    if(err.message === "Incorrect Name") 
        errors.email = "That name is not registered"
    if(err.message === "Incorrect Email") 
        errors.email = "That email is not registered"
    if(err.message === "Incorrect password")
        errors.email = "That password is incorrect"
    if(err.code===11000){
        errors.email = "Email Or Phone Number is already registered";
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
    console.log(req.body);
    try{
        const {email,password} = req.body;
        const user = await UserModel.login(email, password)
        const token = createToken(user._id);

        res.cookie("jwt",token,{
            withCredentials:true,
            httpOnly: false,
            maxAge:maxAge*1000
        })
        console.log(res.cookie);
        
        res.status(200).json({user:user._id, created:true})
    }catch(err){
        const error = handleErrors(err)
        res.json({error,created: false})
    }
}

module.exports.otp_login = async(req,res,next)=>{
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
        const name = req.body.name
        const email = req.body.email
        let password = req.body.password
        const phoneno = req.body.phoneno
        const file = req.file
        const imageName = generateFileName()
        const status = "Block"

        const fileBuffer = await sharp(file.buffer)
          .resize({ height: 1000, width: 1000, fit: "contain" })
          .toBuffer()
      
        await uploadFile(fileBuffer, imageName, file.mimetype)

        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password,salt)
        
        const post = await UserModel.create({
            name,
            email,
            imageName,
            password,
            phoneno,
            status,
        })

        const token = createToken(post._id);

        res.cookie("jwt",token,{
            withCredentials:true,
            httpOnly: false,
            maxAge:maxAge*1000
        })
        res.status(201).json({user:post._id, created:true})
    }catch(err){
        const errors = handleErrors(err)
        res.json({errors,created: false})
    }
}

module.exports.updateProfile = async (req,res,next)=>{
    console.log(req.body);
    try {
        if(req.file){
            const file = req.file
            const imageName = generateFileName()
    
            const fileBuffer = await sharp(file.buffer)
              .resize({ height: 1000, width: 1000, fit: "contain" })
              .toBuffer()
          
            await uploadFile(fileBuffer, imageName, file.mimetype)
    
            await UserModel.updateOne({_id:req.body.userId},{$set:{name:req.body.name,bio:req.body.bio,imageName:imageName}})
        }else{
            await UserModel.updateOne({_id:req.body.userId},{$set:{name:req.body.name,bio:req.body.bio}})
        }
        res.status(201).json({created:true})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

module.exports.getMembers = async (req, res, next) => {
    const name = req.body.value;
    try {
        if(name){
            const regex = new RegExp(`^${name}`, "i");
            const members = await UserModel.find({ name: regex });
            for (let i = 0; i < members.length; i++) {
                imageUrl = await getObjectSignedUrl(members[i].imageName);
                members[i].imageName = imageUrl
              }
            res.status(200).json(members);
        }else{
            res.status(200).json();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
  };