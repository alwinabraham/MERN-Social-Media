const express = require('express')
const { createComment, getComment, sendReply, getReplyComments, commentCount } = require('../Controllers/CommentControllers')
const router = express.Router()

router.post("/createComment",createComment)

router.post("/getComment",getComment)

router.post("/sendReply",sendReply)

router.post("/getReplyComments", getReplyComments)

router.post("/commentCount",commentCount)

module.exports = router