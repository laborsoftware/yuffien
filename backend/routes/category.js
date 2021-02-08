const express = require('express')
const router = express.Router()

const Category = require('../crud/CommandCategory')

router.post('/add', async(req, res, next) => {
    const { category } = req.body
    console.log('req.body', req.body)
    const savedCategory = await Category.add(category)
    res.json(savedCategory)
})

module.exports = router