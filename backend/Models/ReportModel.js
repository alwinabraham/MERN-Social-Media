const mongoose = require("mongoose")

const reportSchema = mongoose.Schema(
    {
        userId:{
            type:String
        },
        postId:{
            type:String
        },
        reason:{
            type:String,
            required:true
        }
    },
    {
        timestamps: true
    }
)

const ReportModel = mongoose.model("Report", reportSchema)

module.exports = ReportModel