const express = require('express')
const router = express.Router()
const socketServer = require('../socket/connection')
const loginAuth = require('../middleware/loginAuth')

router.post('/', loginAuth, async(req, res, next) => {
    const { type, data } = req.body
    if (type && data) {
        socketServer().emit(type, data)
        res.send(true)
    } else res.json({ success: false, message: 'Eksik parametre' })
})

module.exports = router