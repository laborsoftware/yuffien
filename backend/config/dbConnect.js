const mongoose = require('mongoose');
(function() {
    mongoose.connect(process.env.MONGODB_CONNECT, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
    })

    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected')
    })
    mongoose.connection.on('error', err => {
        console.log('MongoDB: Error', err)
    })

    mongoose.Promise = global.Promise
})()