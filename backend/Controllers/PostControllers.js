const PostModel = require("../Models/PostModel");
const mongoose = require('mongoose')
const crypto = require('crypto')
const sharp = require('sharp')
const { uploadFile, deleteFile, getObjectSignedUrl } = require('../Middlewares/s3');
const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

module.exports.upload_post = async (req,res,next)=>{
    try{
        const file = req.file
        const content = req.body.caption
        const userId = req.body.userId
        const imageName = generateFileName()
        const dateAndTime = new Date();
      
        const fileBuffer = await sharp(file.buffer)
          .resize({ height: 1080, width: 1920, fit: "contain" })
          .toBuffer()
      
        await uploadFile(fileBuffer, imageName, file.mimetype)
      
        const post = await PostModel.create({
            userId,
            imageName,
            content,
            dateAndTime,
        })
        res.status(201).send(post)
    }catch(err){
        console.log(err);
    }
}

module.exports.posts = async (req,res,next)=>{
    try {
        const post = await PostModel.find({}).sort({ _id: -1 })

          for (let i = 0; i < post.length; i++) {
            imageUrl = await getObjectSignedUrl(post[i].imageName);
            // post[i] = {...post[i], imageUrl}
            post[i].imageName = imageUrl
          }
        res.send(post)
    } catch (error) {
        console.log(error);
    }
}

module.exports.like_post = async (req,res,next)=>{
    try {
      console.log(req.body)
        console.log(req.body.postData.postId);
        const post = await PostModel.findById(req.body.postData.postId)
        const likedPost = post.likes.find((id)=>id == req.body.postData.userId)
        if(!likedPost){
          post.likes.push(req.body.postData.userId)
        }else{
          post.likes.pull(req.body.postData.userId)
        }
        post.save()
        
    } catch (error) {
        console.log(error);
    }
}