const express = require('express')
const router = express.Router()

const Category = require('../models/CommandCategory')

router.post('/', async(req, res, next) => {
    const { category } = req.body
    const newCategory = new Category(category)

    try {
        await newCategory.save()
        return res.sendStatus(201)
    } catch (error) {
        return res.json(error.message)
    }
})

module.exports = router