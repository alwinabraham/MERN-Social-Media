const UserModel = require("../Models/UserModel")
const { uploadFile, deleteFile, getObjectSignedUrl } = require('../Middlewares/s3');

module.exports.getSearchUser = async (req,res) =>{
    console.log(req.body.searchId);
    try {
        const data = await UserModel.findById(req.body.searchId)
        imageUrl = await getObjectSignedUrl(data.imageName);
        data.imageName = imageUrl
        console.log(data);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}