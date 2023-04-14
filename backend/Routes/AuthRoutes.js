const multer = require("multer");
const { register, login, otp_login } = require("../Controllers/AuthControllers")
const { checkUser } = require("../Middlewares/AuthMiddlewares")
const { upload_post, getPosts, like_post } = require('../Controllers/PostControllers')
const { profile_post, profile_image} = require('../Controllers/ProfileControllers');
const { send_friendRequest, followers, following } = require("../Controllers/FriendsControllers");

const router = require("express").Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

router.post("/",checkUser)
router.get("/:user",getPosts)
router.post("/register",upload.single('image'),register)
router.post("/login",login)
router.post("/otp_login",otp_login)
router.post("/upload_post",upload.single('image'),upload_post)
router.post("/like_post",like_post)
router.post("/profile_post",profile_post)
router.post("/profile_image",profile_image)
router.post("/send_friendRequest",send_friendRequest)
router.post("/followers",followers)
router.post("/following",following)

module.exports = router
