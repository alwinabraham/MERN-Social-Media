const mongoose = require('mongoose')

const ReplyCommentSchema = mongoose.Schema(
    {
        commentId:{
            type:String
        },
        userId:{
            type:String
        },
        comment:{
            type:String
        }
    },
    {
        timestamps:true
    }
)

const ReplyCommentModel = mongoose.Model("ReplyComment", ReplyCommentSchema)

module.exports = ReplyCommentModel