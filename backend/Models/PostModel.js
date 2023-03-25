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
    Image:{
        data: Buffer,   
        contentType: String,
    }
});

module.exports = mongoose.model("Posts", postSchema)