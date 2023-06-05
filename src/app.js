import express from 'express'
import session from 'express-session'
import handlebars from 'express-handlebars'
import sessionRouter from './routers/session.router.js'
import initializePassport from './config/passport.config.js'
import passport from 'passport'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

app.use(session({
    secret: 'c0d3r',
    resave: true,
    saveUninitialized: true
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => res.send('Everything is Ok'))
app.use('/api/session', sessionRouter)

try {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.MONGO_DB_NAME
    })
    console.log('DB connected!')
    app.listen(8080, () => console.log('Server Up'))

} catch(err) {}
