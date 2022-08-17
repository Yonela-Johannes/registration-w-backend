const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const handlebars = require('express-handlebars')
const dotenv = require('dotenv')
const app = express()
dotenv.config()

const home = require('./routes/home.js')
const clear = require('./routes/clear.js')

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
app.use('/', home)
app.use('/clear', clear)

const port = process.env.PORT || 8000
// displaying server in localhost
app.listen(port, () => {
    console.log('Your app is running on port: ', port)
})