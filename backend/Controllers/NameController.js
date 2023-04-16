const UserModel = require("../Models/UserModel");
const NotificationModel = require("../Models/NotificationModel")

module.exports.getName = async(req,res) =>{
    try {
        userData = await UserModel.findById(req.body.userId);
        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json(error)
    }
}