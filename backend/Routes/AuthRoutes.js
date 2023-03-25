const { register, login, otp_login, upload_post } = require("../Controllers/AuthControllers")
const { checkUser } = require("../Middlewares/AuthMiddlewares")

const router = require("express").Router()

router.post("/",checkUser)
router.post("/register",register)
router.post("/login",login)
router.post("/otp_login",otp_login)
router.post("/upload_post",checkUser,upload_post)

module.exports = router