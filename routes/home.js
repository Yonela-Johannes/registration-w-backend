const express = require('express')
const router = express.Router()
const RegistrationNumbers = require('../Factory Function/main.js')
const RegistrationDb = require('../utils/db.js')

const registrationDb = RegistrationDb()
const registration = RegistrationNumbers()

router.route('/')
    .post(async (req, res) => {
        const { text, name } = req.body
        console.log(req.body)
        registration.setNumber(text)

        await registrationDb.storeNumber(registration.getValidReg())
        const numbers = await registrationDb.getNumbers()
        // const filterTowns = await registrationDb.search(name)
        res.render('index', {
            registrationNumbers: numbers,
            errorhandler: !registration.validNo() ? "Invalid registration number!" : 'registration number valid'
        })
    })
    .get(async (req, res) => {
        res.render('index', {
        })
    })
module.exports = router