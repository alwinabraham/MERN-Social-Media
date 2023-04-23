const express = require("express")
const { getAllUsers, login, blockAUser, getReportedPosts, blockAPost } = require("../Controllers/AdminControllers")
const {checkAdmin} = require("../Middlewares/AdminMiddlewares")
const router = express.Router()

router.get("/",checkAdmin)
router.post("/login",login)
router.post("/users", getAllUsers)
router.post("/blockAUser", blockAUser)
router.post("/getReportedPosts", getReportedPosts)
router.post("/blockAPost",blockAPost)

module.exports = router
