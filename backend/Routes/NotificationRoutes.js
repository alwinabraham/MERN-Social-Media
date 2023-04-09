const express = require('express')
const { createNotification, getNotification } = require('../Controllers/NotificationControllers')
const router = express.Router()

router.get('/:id',getNotification)
router.post('/createNotification',createNotification)

module.exports = router