const express = require('express')
const router = express.Router()

const Command = require('../models/Command')

router.post('/', async(req, res, next) => {
    const { command } = req.body

    const newCommand = new Command(command)

    try {
        await newCommand.save()
        return res.sendStatus(201)
    } catch (error) {
        return res.json(error.message)
    }
})

module.exports = router