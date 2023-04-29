const express = require('express')
const { createNotification, getNotification, getNotifiCounter } = require('../Controllers/NotificationControllers')
const router = express.Router()

router.get('/:id',getNotification)
router.post('/createNotification',createNotification)
router.post("/getNotifiCounter",getNotifiCounter)

module.exports = router