const UserModel = require("../Models/UserModel")
const PostModel = require("../Models/PostModel")
const { uploadFile, deleteFile, getObjectSignedUrl } = require('../Middlewares/s3');


module.exports.profile_post = async (req,res,next)=>{
    try {
        const {userId} = req.body
        const post = await PostModel.find({userId:userId}).sort({ _id: -1 })
        const user = await UserModel.findById(userId)

        for (let i = 0; i < post.length; i++) {
          imageUrl = await getObjectSignedUrl(post[i].imageName);
          post[i].imageName = imageUrl
          imageUser = await getObjectSignedUrl(user.imageName);
          post[i] = ({...post[i],imageUser:imageUser})
        }
        console.log(post);
      res.send(post)
    } catch (error) {
      console.log(error);
    }
  }

module.exports.profile_image = async (req,res,next)=>{
  console.log(req.body);
  try {
    const {userId} = req.body
    const post = await UserModel.findById(userId).sort({ _id: -1 })
      imageUrl = await getObjectSignedUrl(post.imageName);
      post.imageName = imageUrl
    // console.log(post);
    res.send(post)
} catch (error) {
  console.log(error);
}
}