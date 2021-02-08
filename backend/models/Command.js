const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*
    type: 0 --> log(kullanıcı bir komut yazmadan calısan komut),
    type: 1 --> command(kullanıcı bir komut yazınca calısan komut),
    ...
*/

const commandSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    shortName: {
        type: String,
        required: true,
        unique: true,
    },
    fileName: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
    },
    website: {
        active: {
            type: Boolean,
            required: true,
        },
    },
    maintenance: {
        active: {
            type: Boolean,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    updateLog: {
        type: Array,
    },
    type: {
        type: Number,
        enum: [0, 1],
        required: true,
    },
    aliases: {
        type: Array,
        unique: true,
    },
    createdUser: {
        nickname: {
            type: String,
            required: true,
        },
    },
    data: {
        type: Object,
    },
    categoryID: {
        type: Schema.ObjectId,
        required: true,
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('command', commandSchema)