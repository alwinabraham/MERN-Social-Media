const UserModel = require('../Models/UserModel')
const { uploadFile, deleteFile, getObjectSignedUrl } = require('../Middlewares/s3');

module.exports.friends = async (req,res,next)=>{
    try {
        const user = await UserModel.find({}).sort({ _id: -1 })
          for (let i=0;i<user.length;i++){
            imageUrl = await getObjectSignedUrl(user[i].imageName);
            user[i].imageName = imageUrl
          }
          // post.filter
        res.send(user)
    } catch (error) {
        console.log(error);
    }
}

module.exports.send_friendRequest = async (req,res,next)=>{
    try {
      
      const {targetId, userId} = req.body.addObject
      const user = await UserModel.findById(targetId)
      const alreadySend = user.pending_requests.find((id)=>id == userId)
      if(!alreadySend){
        user.pending_requests.push(userId)
      }else{
        user.pending_requests.pull(userId)
      }
      user.save()

      const target = await UserModel.findById(userId)
      const alreadyReceived = target.request_send.find((id)=>id == targetId)
      if(!alreadyReceived){
        target.request_send.push(targetId)
      }else{
        target.request_send.pull(targetId)
      }
      target.save()

      res.status(201).send({})
    } catch (error) {
      
    }
}

module.exports.friend_requests = async (req,res,next)=>{
  try {
    
  } catch (error) {
    
  }
}