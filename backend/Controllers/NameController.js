const UserModel = require("../Models/UserModel");
const NotificationModel = require("../Models/NotificationModel")
const { uploadFile, deleteFile, getObjectSignedUrl } = require('../Middlewares/s3');

module.exports.getName = async(req,res) =>{
    try {
        userData = await UserModel.findById(req.body.userId);
        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.getImage = async(req,res) =>{
    try {
        userData = await UserModel.findById(req.body.userId);
        imageUrl = await getObjectSignedUrl(userData.imageName);
        userData.imageName = imageUrl
        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json(error)
    }
}