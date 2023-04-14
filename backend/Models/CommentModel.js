const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema(
    {
        postId:{
            type:String
        },
        userId:{
            type:String
        },
        comment:{
            type:String
        },
        replyComments:{
            type:[String]
        }
    },
    {
        timestamps:true
    }
)

const CommentModel = mongoose.model("Comment", CommentSchema)

module.exports = CommentModel