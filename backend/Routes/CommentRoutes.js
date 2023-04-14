const express = require('express')
const { createComment, getComment } = require('../Controllers/CommentControllers')
const router = express.Router()

router.post("/createComment",createComment)

router.post("/getComment",getComment)

module.exports = router