const UserModel = require("../Models/UserModel")
const PostModel = require("../Models/PostModel")
const { uploadFile, deleteFile, getObjectSignedUrl } = require('../Middlewares/s3');


module.exports.profile_post = async (req,res,next)=>{
    try {
        const {userId} = req.body
        const post = await PostModel.find({userId:userId}).sort({ _id: -1 })
  
        for (let i = 0; i < post.length; i++) {
          imageUrl = await getObjectSignedUrl(post[i].imageName);
          post[i].imageName = imageUrl
        }
        console.log(post);
      res.send(post)
    } catch (error) {
      console.log(error);
    }
  }