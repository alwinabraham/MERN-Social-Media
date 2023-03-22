const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()

app.listen(4000,()=>{
    console.log(`Server started at 4000`);
})

mongoose.connect("mongodb://localhost:27017/jwt",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("DB connection Successful");
}).catch(err=>{
    console.log(err.message);
})

app.use(
    cors({
        origin:["https://localhost:5173"],
        method:["GET","POST"],
        credentials:true
    })
)

app.use(express.json());
