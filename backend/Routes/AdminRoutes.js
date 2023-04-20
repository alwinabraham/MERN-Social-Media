const express = require("express")
const { getAllUsers, login } = require("../Controllers/AdminControllers")
const {checkAdmin} = require("../Middlewares/AdminMiddlewares")
const router = express.Router()

router.get("/",checkAdmin)
router.post("/login",login)
router.post("/users", getAllUsers)

module.exports = router
