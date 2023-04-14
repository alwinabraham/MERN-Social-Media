const UserModel = require('../Models/UserModel')
const { uploadFile, deleteFile, getObjectSignedUrl } = require('../Middlewares/s3');

module.exports.getSuggestions = async (req,res,next)=>{
    try {
        const user = await UserModel.find({}).sort({ _id: -1 })
          for (let i=0;i<user.length;i++){
            imageUrl = await getObjectSignedUrl(user[i].imageName);
            user[i].imageName = imageUrl
          }
        res.send(user)
    } catch (error) {

    }
}

module.exports.send_friendRequest = async (req,res,next)=>{
    try {
      const {targetId, userId} = req.body.addObject
      const user = await UserModel.findById(targetId)
      const alreadySend = user.followers.find((id)=>id == userId)
      if(!alreadySend){
        user.followers.push(userId)
      }else{
        user.followers.pull(userId)
      }
      user.save()

      const target = await UserModel.findById(userId)
      const alreadyReceived = target.following.find((id)=>id == targetId)
      if(!alreadyReceived){
        target.following.push(targetId)
      }else{
        target.following.pull(targetId)
      }
      target.save()

      res.status(201).send({user,target})
    } catch (error) {
      
    }
}

module.exports.followers = async (req,res,next)=>{
  const userId = req.body.userId
  try {
    const user = await UserModel.findById(userId)
        let followerIds = user.followers; // Retrieve the follower ids from your own user data
        const followers = await UserModel.find({ _id: { $in: followerIds }})
        for (let i=0;i<followers.length;i++){
          imageUrl = await getObjectSignedUrl(followers[i].imageName);
          followers[i].imageName = imageUrl
        }
      res.status(201).send(followers)
      } catch (error) {
    
  }
}

module.exports.following = async (req,res,next)=>{
  const userId = req.body.userId
  try {
    const user = await UserModel.findById(userId)
        let followerIds = user.following; // Retrieve the follower ids from your own user data
        const followers = await UserModel.find({ _id: { $in: followerIds }})
        for (let i=0;i<followers.length;i++){
          imageUrl = await getObjectSignedUrl(followers[i].imageName);
          followers[i].imageName = imageUrl
        }
      res.status(201).send(followers)
      } catch (error) {
    
  }
}