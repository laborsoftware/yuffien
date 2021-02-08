const express = require('express')
const router = express.Router()

const Command = require('../crud/Command')

router.post('/add', async(req, res, next) => {
    const { command } = req.body
    console.log('req.body', req.body)
    const savedCommand = await Command.add(command)
    res.json(savedCommand)
})

module.exports = router