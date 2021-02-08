const express = require('express')
const router = express.Router()
const passport = require('passport')
router.get('/', passport.authenticate('discord'))

router.get(
    '/redirect',
    passport.authenticate('discord', {
        failureRedirect: process.env.FAILURE_REDIRECT,
        successRedirect: process.env.SUCCESSFUL_REDIRECT,
    })
)

router.delete('/session', (req, res, next) => {
    if (req.user) {
        req.session.destroy()
        req.logout()
    }
    res.json(req.user)
})

router.get('/session', (req, res, next) => {
    return res.status(200).json(req.user)
})

module.exports = router