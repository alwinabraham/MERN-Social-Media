const CommentModel = require('../Models/CommentModel')
const NotificationModel = require('../Models/NotificationModel')
const PostModel = require('../Models/PostModel')
const ReplyCommentModel = require("../Models/ReplyCommentModel")

module.exports.createComment = async (req,res) =>{
    console.log(req.body);
    try{
        const comment = await CommentModel.create(req.body)
        const post = await PostModel.findById(req.body.postId)
        const senderId = post.userId
        const userId = req.body.userId
        const notification = "Commented"
        post.comments.push(comment._id)
        post.save()
        NotificationModel.create({
            userId,
            senderId,
            notification
          })
        res.status(201).send(comment)
    }catch(error){
        res.status(500).send(error)
    }
}

module.exports.getComment = async (req,res) =>{
    try{
        const comment = await CommentModel.find({postId:req.body.postId}).sort({ _id: -1 })
        res.status(201).send(comment)
    }catch(error){
        res.status(500).send(error)
    }
}

module.exports.getReplyComments = async (req,res)=>{
    try {
        const replyComment = await ReplyCommentModel.find({commentId:req.body.commentId}).sort({ _id: -1 })
        res.status(200).send(replyComment)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.sendReply = async (req,res)=>{
    try {
        const {data} = await ReplyCommentModel.create(req.body)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.getReplyComments = async (req,res)=>{
    try {
        const data = await ReplyCommentModel.find({commentId:req.body.commentId})
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}