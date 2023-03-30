const PostModel = require("../Models/PostModel");
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
        console.log(post);
        res.send(post)
    } catch (error) {
        console.log(error);
    }
}