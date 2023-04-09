const NotificationModel = require('../Models/NotificationModel')

module.exports.createNotification = async (req,res) =>{
    const {userId,notification} = req.body
    const notificationData = new NotificationModel({
        userId,
        notification
    })
    try {
        const result = await notificationData.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.getNotification = async (req,res) =>{
    console.log("value",req.params.id);
    try {
        const data = await NotificationModel.find({userId:req.params.id})
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}