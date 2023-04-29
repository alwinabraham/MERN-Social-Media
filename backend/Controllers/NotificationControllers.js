const NotificationModel = require('../Models/NotificationModel')
const NotifiCounterModel = require('../Models/NotifiCounterModel')

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
    console.log(req.params.id);
    try {
        const data = await NotificationModel.find({senderId:req.params.id}).sort({_id:-1})
        await NotifiCounterModel.updateOne(
            {userId:req.params.id},
            {$set:{counter:0}}
        )
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.getNotifiCounter = async (req,res) =>{
    try{
        const data = await NotifiCounterModel.find({userId:req.body.userId})
        res.status(200).json(data)
    }catch{
        res.status(500).json(error)
    }
}