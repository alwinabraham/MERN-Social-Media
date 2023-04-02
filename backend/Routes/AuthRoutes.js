const multer = require("multer");
const { register, login, otp_login } = require("../Controllers/AuthControllers")
const { checkUser } = require("../Middlewares/AuthMiddlewares")
const { upload_post, posts, like_post } = require('../Controllers/PostControllers')
const { profile_post} = require('../Controllers/ProfileControllers')

const router = require("express").Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

router.post("/",checkUser)
router.get("/",posts)
router.post("/register",register)
router.post("/login",login)
router.post("/otp_login",otp_login)
router.post("/upload_post",upload.single('image'),upload_post)
router.post("/like_post",like_post)
router.post("/profile_post",profile_post)

module.exports = router

