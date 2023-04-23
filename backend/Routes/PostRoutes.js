const express = require('express')
const {deletePost, updatePost, reportPost} = require("../Controllers/PostControllers")
const router = express.Router()

router.post("/deletePost",deletePost)
router.post("/updatePost",updatePost)
router.post("/reportPost",reportPost)

module.exports = router