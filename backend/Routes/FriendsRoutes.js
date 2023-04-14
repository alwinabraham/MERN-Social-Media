const express = require("express")
const {getSuggestions} = require("../Controllers/FriendsControllers")

const router = express.Router()

router.post("/",getSuggestions)

module.exports = router