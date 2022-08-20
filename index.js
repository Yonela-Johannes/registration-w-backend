const Routes = require('./routes/routes.js')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const RegistrationDb = require('./utils/db')
const RegistrationNumbers = require('./Factory Function/main.js')
const pgp = require('pg-promise')();
const local = 'postgres://postgres:juanesse123@localhost:5432/registration';
const connectionString = process.env.DATABASE_URL || local
const handlebars = require('express-handlebars')
const dotenv = require('dotenv')
const app = express()
dotenv.config()

const config = {
    connectionString,
    max: 20,
    ssl: {
        rejectUnauthorized: false
    }
}

const db = pgp(config)
const registrationDb = RegistrationDb(db)
const registration = RegistrationNumbers()
const route = Routes(registrationDb, registration)

app.set('view engine', 'hbs')
app.engine('hbs', handlebars.engine({
    layoutsDir: `./views/layouts`,
    extname: 'hbs',
    defaultLayout: 'main',
}))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(bodyParser.json())

app.get('/', route.homeGet)
app.post('/', route.homePost)
app.get('/towns', route.townsGet)
app.post('/towns', route.townsPost)
app.get('/search', route.searchGet)
app.post('/search', route.searchPost)
app.post('/clear', route.clearPost)

const port = process.env.PORT || 8000
// displaying server in localhost
app.listen(port, () => {
    console.log('Your app is running on port: ', port)
})