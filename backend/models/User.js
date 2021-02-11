const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    locale: {
        type: String,
        required: true,
    },
    guilds: {
        type: Array,
        required: true,
    },
    onlyOwnerGuilds: {
        type: Array,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
}, { timestamps: true })

module.exports = mongoose.model('user', userSchema)