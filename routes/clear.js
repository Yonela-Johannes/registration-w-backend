const express = require('express')
const router = express.Router()
const RegistrationDb = require('../utils/db.js')

const registrationDb = RegistrationDb()

router.route('/')
    .post(async (req, res) => {
        await registrationDb.clear()
        res.redirect('/')
    })
module.exports = router