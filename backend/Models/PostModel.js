const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    content:{
        type:String,
    },
    dateAndTime:{
        type:String,
        required:true
    },
    imageName:{
        type: String,
        required:true
    },
    likes:{
        type:[String]
    },
    comments:{
        type:[String]
    },
    status:{
        type:String
    }
},{
    timestamps: true
});

module.exports = mongoose.model("Posts", postSchema)