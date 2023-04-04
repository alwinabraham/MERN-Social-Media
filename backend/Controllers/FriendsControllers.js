const UserModel = require('../Models/UserModel')
const { uploadFile, deleteFile, getObjectSignedUrl } = require('../Middlewares/s3');

module.exports.friends = async (req,res,next)=>{
    try {
        const post = await UserModel.find({}).sort({ _id: -1 })
          for (let i=0;i<post.length;i++){
            imageUrl = await getObjectSignedUrl(post[i].imageName);
            post[i].imageName = imageUrl
          }
        res.send(post)
    } catch (error) {
        console.log(error);
    }
}

module.exports.send_friendRequest = async (req,res,next)=>{
    try {
      console.log(req.body);
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

      res.status(201).send({user:user,target:target})
    } catch (error) {
      
    }
}