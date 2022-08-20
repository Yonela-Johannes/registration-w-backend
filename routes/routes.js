const express = require('express')
const router = express.Router()
const RegistrationNumbers = require('../Factory Function/main.js')
const RegistrationDb = require('../utils/db.js')

const registrationDb = RegistrationDb()
const registration = RegistrationNumbers()

const Routes = (registrationDb, registration) => {
    const homePost = async (req, res) => {
        const { text } = req.body
        const towns = await registrationDb.getTowns()
        registration.setNumber(text)
        const validatedReg = registration.getValidReg()
        const number = await registrationDb.getNumber(validatedReg)
        const checkRegistration = registration.checkRegistration(number)
        const id = registration.splitRegistration()
        registration.getValidReg() && registration.checkRegistrationAbrev() ? await registrationDb.storeNumber(validatedReg, id) : ''
        const numbers = await registrationDb.getNumbers()
        res.render('index', {
            townName: 'All Towns',
            towns,
            registrationNumbers: numbers,
            successhandler: registration.successHandler(checkRegistration),
            errorhandler: registration.errorHandler(checkRegistration),
        })
    }
    const homeGet = async (req, res) => {
        const towns = await registrationDb.getTowns()
        const numbers = await registrationDb.getNumbers()
        res.render('index', {
            townName: 'All Towns',
            registrationNumbers: numbers,
            towns,
        })
    }


    const townsPost = async (req, res) => {
        const { name } = req.body
        const towns = await registrationDb.getTowns()
        const numbers = await registrationDb.search(name)
        // const townName = await registrationDb.getTown(name)
        res.render('index', {
            // townName,
            towns,
            registrationNumbers: numbers,
        })
    }
    const townsGet = async (req, res) => {
        const { name } = req.body
        const towns = await registrationDb.getTowns()
        const numbers = await registrationDb.search(name)
        res.render('index', {
            towns,
            registrationNumbers: numbers,
        })
    }
    const clearPost = async (req, res) => {
        await registrationDb.clear()
        res.render('index', {
            successhandler: 'All registration numbers are cleared'
        })
    }
    const searchPost = async (req, res) => {
        const { search } = req.body
        const towns = await registrationDb.getTowns()
        const numbers = await registrationDb.searchAll(search)
        res.render('index', {
            townName: search,
            towns,
            registrationNumbers: numbers,
        })
    }

    const searchGet = async (req, res) => {
        const { name } = req.body
        const towns = await registrationDb.getTowns()
        const numbers = await registrationDb.search(name)
        res.render('index', {
            towns,
            registrationNumbers: numbers,
        })
    }
    return {
        homeGet,
        homePost,
        townsGet,
        townsPost,
        searchPost,
        searchGet,
        clearPost,
    }
}

module.exports = Routes