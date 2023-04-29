const mongoose = require("mongoose")

const NotifiCounterSchema = new mongoose.Schema(
    {
    userId:{
        type:String,
        required:true
    },
    counter:{
        type:Number
    }
})

const NotifiCounterModel = mongoose.model("NotifiCounter",NotifiCounterSchema)

module.exports = NotifiCounterModel
