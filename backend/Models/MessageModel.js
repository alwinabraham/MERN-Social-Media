const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    chatId:{
        type:String,
    },
    senderId:{
        type:String,
        required:true,
    },
    text:{
        type:String
    }
},{
    timestamps: true
})

const MessageModel = mongoose.model("Message", MessageSchema)

module.exports = MessageModel
