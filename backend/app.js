require('dotenv').config()
require('console-stamp')(console, 'HH:MM:ss.l')
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const authRouter = require('./routes/auth')
const botRouter = require('./routes/bot')
const commandRouter = require('./routes/command')
const commandCategoryRouter = require('./routes/category')

const app = express()

// cors
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }))

//passport
const session = require('express-session')
const passport = require('passport')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const discordStrategy = require('./strategies/discordStrategy')
app.use(
    session({
        secret: 'secret_key',
        cookie: {
            maxAge: 60 * 60 * 1000,
        },
        saveUninitialized: false,
        name: 'discord.oauth2',
        resave: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)

app.use(passport.initialize())
app.use(passport.session())

//mongodb
require('./config/dbConnect')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/auth', authRouter)
app.use('/bot', botRouter)
app.use('/command', commandRouter)
app.use('/command-category', commandCategoryRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    console.log(err)
        // res.locals.message = err.message
        // res.locals.error = req.app.get('env') === 'development' ? err : {}

    // // render the error page
    // res.status(err.status || 500)
    // res.render('error')
})

module.exports = app