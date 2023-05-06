const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("DB connection Successful");
    }).catch(err=>{
        console.log(err.message);
    })
}

module.exports = connectDB