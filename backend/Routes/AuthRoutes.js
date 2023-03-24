const { register, login, otp_login } = require("../Controllers/AuthControllers")
const { checkUser } = require("../Middlewares/AuthMiddlewares")

const router = require("express").Router()

router.post("/",checkUser)
router.post("/register",register)
router.post("/login",login)
router.post("/otp_login",otp_login)

module.exports = router