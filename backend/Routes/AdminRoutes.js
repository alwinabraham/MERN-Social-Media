const express = require("express")
const { getAllUsers, login, blockAUser, getReportedPosts, blockAPost, dailyPost, countAllPost, countAllUsers, monthlyPost, yearlyPost } = require("../Controllers/AdminControllers")
const {checkAdmin} = require("../Middlewares/AdminMiddlewares")
const router = express.Router()

router.get("/",checkAdmin)
router.post("/login",login)
router.post("/users", getAllUsers)
router.post("/blockAUser", blockAUser)
router.post("/getReportedPosts", getReportedPosts)
router.post("/blockAPost",blockAPost)
router.post("/dailyPost",dailyPost)
router.post("/countAllPost",countAllPost)
router.post("/countAllUsers",countAllUsers)
router.post("/monthlyPost",monthlyPost)
router.post("/yearlyPost",yearlyPost)

module.exports = router
