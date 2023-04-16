const express = require("express")
const {getSearchUser} = require("../Controllers/SearchPageControllers")
const router = express.Router()

router.post("/getSearchUser",getSearchUser)

module.exports = router