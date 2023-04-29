const express = require("express")
const {getSuggestions, sendFriendRequest} = require("../Controllers/FriendsControllers")

const router = express.Router()

router.post("/",getSuggestions)

router.post("/sendFriendRequest",sendFriendRequest)

module.exports = router