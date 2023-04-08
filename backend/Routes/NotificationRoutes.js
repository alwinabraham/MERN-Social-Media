const express = require('express')
const { createNotification, getNotification } = require('../Controllers/NotificationControllers')
const router = express.Router()

router.post('/',getNotification)
router.post('/createNotification',createNotification)

module.exports = router