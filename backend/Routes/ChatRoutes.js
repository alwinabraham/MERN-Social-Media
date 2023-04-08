const express = require('express')
const {createChat, userChats, findChat, getUser } = require('../Controllers/ChatControllers')

const router = express.Router()

router.post("/", createChat)
router.get("/:userId", userChats)
router.get("/find/:firstId/:secondId", findChat)
router.get("/getUser/:userId",getUser)

module.exports = router
