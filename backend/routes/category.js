const express = require('express')
const router = express.Router()

const Category = require('../models/Category')

router.get('/', async(req, res, next) => {
    try {
        const Categories = await Category.aggregate([{
            $lookup: { from: 'commands', localField: '_id', foreignField: 'categoryID', as: 'commands' },
        }, ])

        res.json(Categories)
    } catch (error) {
        res.json(error.message)
    }
})

router.post('/', async(req, res, next) => {
    const { name, description } = req.body
    console.log(req.body)
    const newCategory = new Category({ name, description })

    try {
        await newCategory.save()
        return res.sendStatus(201)
    } catch (error) {
        return res.json(error.message)
    }
})

module.exports = router