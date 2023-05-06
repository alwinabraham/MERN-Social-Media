const express = require("express")
const cors = require("cors")
const authRoutes = require("./Routes/AuthRoutes")
const app = express()
const cookieParser = require("cookie-parser")
const dotenv = require('dotenv')
const ChatRoutes = require("./Routes/ChatRoutes")
const MessageRoutes = require("./Routes/MessageRoutes")
const NotificationRoutes = require("./Routes/NotificationRoutes")
const CommentRoutes = require("./Routes/CommentRoutes")
const FriendsRoutes = require("./Routes/FriendsRoutes")
const SearchPageRoutes = require("./Routes/SearchPageRoutes")
const AdminRoutes = require("./Routes/AdminRoutes")
const PostRoutes = require("./Routes/PostRoutes")
const connectDB = require("./config/connectDB")
dotenv.config()

app.listen(4000,()=>{
    console.log(`Server started at 4000`);
})

connectDB()

app.use(
    cors({
        origin:["http://localhost:5173"],
        methods:["GET","POST","DELETE"],
        credentials: true
    })
)

app.use(cookieParser())
app.use(express.json());

app.use("/",authRoutes)
app.use("/chat",ChatRoutes)
app.use("/message", MessageRoutes)
app.use("/notification", NotificationRoutes)
app.use("/comment", CommentRoutes)
app.use("/friends", FriendsRoutes)
app.use("/searchPage", SearchPageRoutes)
app.use("/Admin", AdminRoutes)
app.use("/post", PostRoutes)