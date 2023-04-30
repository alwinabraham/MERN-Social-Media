const express = require('express')
const {deletePost, updatePost, reportPost, sharedPost} = require("../Controllers/PostControllers")
const router = express.Router()

router.post("/deletePost",deletePost)
router.post("/updatePost",updatePost)
router.post("/reportPost",reportPost)
router.post("/sharedPost",sharedPost)

module.exports = router