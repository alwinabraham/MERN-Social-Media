const ChatModel = require('../Models/ChatModel')
const UserModel = require('../Models/UserModel')
const { uploadFile, deleteFile, getObjectSignedUrl } = require('../Middlewares/s3');

module.exports.createChat = async(req,res)=>{
    if(req.body?.addChat[0]==null){
    }
    const newChat = new ChatModel({
        members: [req.body.addChat.senderId, req.body.addChat.receiverId]
    });
    try {
        const result = await newChat.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.userChats = async(req,res)=>{
    try {
        const chat = await ChatModel.find({
            members: {$in: [req.params.userId]}
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.findChat = async (req,res)=>{
    try {
        const chat = await ChatModel.findOne({
            members: {$all: [req.params.firstId, req.params.secondId]}
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.getUser = async (req,res)=>{
    try {
        const userData = await UserModel.findById(req.params.userId)
        imageUser = await getObjectSignedUrl(userData.imageName);
        userData.imageName = imageUser
        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json(error)

    }
}