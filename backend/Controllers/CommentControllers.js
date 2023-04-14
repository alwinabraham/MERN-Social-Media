const CommentModel = require('../Models/CommentModel')
const PostModel = require('../Models/PostModel')

module.exports.createComment = async (req,res) =>{
    try{
        const comment = await CommentModel.create(req.body)
        const post = await PostModel.findById(req.body.postId)
        post.comments.push(comment._id)
        post.save()
        res.status(201).send(comment)
    }catch(error){
        res.status(500).send(error)
    }
}

module.exports.getComment = async (req,res) =>{
    try{
        const comment = await CommentModel.find({postId:req.body.postId})
        res.status(201).send(comment)
    }catch(error){
        res.status(500).send(error)
    }
}