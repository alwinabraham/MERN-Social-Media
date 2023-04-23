const AdminModal = require("../Models/AdminModel")
const UserModal = require("../Models/UserModel")
const jwt = require("jsonwebtoken");
const { getObjectSignedUrl } = require("../Middlewares/s3");
const UserModel = require("../Models/UserModel");
const ReportModel = require("../Models/ReportModel");
const PostModel = require("../Models/PostModel");

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

module.exports.blockAUser = async (req,res,next)=>{
    try {
        if(req.body.userId){
            const user = await UserModel.findById(req.body.userId)
            if(user.status == "Block"){
                await UserModel.updateOne({_id:req.body.userId},{$set:{status:"Unblock"}})
                console.log("Blocked");
                res.status(200).json({id:req.body.userId})
            }else{
                await UserModel.updateOne({_id:req.body.userId},{$set:{status:"Block"}})
                console.log("UnBlocked");
                res.status(200).json({id:req.body.userId})
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.getReportedPosts = async(req,res,next)=>{
    try {
        const data = await ReportModel.find({}).sort({ _id: -1 })
        for(let i=0;i<data.length;i++){
            const post = await PostModel.findById(data[i].postId)
            imageUrl = await getObjectSignedUrl(post.imageName);
            post.imageName = imageUrl
            data[i] = ({...data[i],post:post})
        }
        // console.log(data);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)   
    }
}

module.exports.blockAPost = async (req,res,next)=>{
    console.log(req.body.postId);
    try {
        if(req.body.postId){
            const post = await PostModel.findById(req.body.postId)
            console.log(post);
            if(post.status == "Block"){
                await PostModel.updateOne({_id:req.body.postId},{$set:{status:"Unblock"}})
                console.log("Blocked");
                res.status(200).json({id:req.body.postId})
            }else{
                await PostModel.updateOne({_id:req.body.postId},{$set:{status:"Block"}})
                console.log("UnBlocked");
                res.status(200).json({id:req.body.postId})
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
}