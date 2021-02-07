const express = require('express');
const router = express.Router();
const socketServer = require("../socket/connection")
const loginAuth = require("../middleware/loginAuth")

router.post("/socket", loginAuth, async(req, res, next) => {
    const { type, data } = req.body;
    if (type && data)
        switch (type) {
            case 'guildInformation':
                socketServer().emit(`guildInformation`, data);
                res.send(true)
                break;

            default:
                res.json("Geçersiz type")
        }
    else
        res.json({ success: false, message: "Eksik parametre" })



})

module.exports = router;