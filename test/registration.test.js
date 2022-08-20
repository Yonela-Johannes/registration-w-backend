const RegistrationDb = require('../utils/db.js')
const RegistrationNumbers = require('../Factory Function/main.js')
const assert = require('assert')
const pgp = require('pg-promise')();

const local = 'postgres://postgres:juanesse123@localhost:5432/registration_tests';
const connectionString = process.env.DATABASE_URL || local
const config = {
    connectionString,
    max: 20
}

const db = pgp(config)
const registrationDb = RegistrationDb(db)

describe('Registration Test', () => {
    beforeEach(async () => {
        await registrationDb.clear()
    })
    describe("Empty", () => {
        it('should not store empty registration', async () => {
            const registration = RegistrationNumbers()
            const text = ''
            registration.setNumber(text)
            const validatedReg = registration.getValidReg()
            const id = registration.splitRegistration()
            registration.getValidReg() && registration.checkRegistrationAbrev() ? await registrationDb.storeNumber(validatedReg, id) : ''
            const numbers = await registrationDb.getNumbers()
            assert.deepEqual([], numbers)
        })
    });
    describe("Store", () => {
        it('should store new registration to database', async () => {
            const registration = RegistrationNumbers()
            const text = 'ca 123'
            registration.setNumber(text)
            const validatedReg = registration.getValidReg()
            const number = await registrationDb.getNumber(validatedReg)
            const id = registration.splitRegistration()
            registration.getValidReg() && registration.checkRegistrationAbrev() ? await registrationDb.storeNumber(validatedReg, id) : ''
            const numbers = await registrationDb.getNumbers()
            let result = [{ id: numbers[0].id, regno: 'CA 123', town_id: 1 }]
            assert.deepEqual([result], [numbers])
        })
    });
    describe("Update", () => {
        it('should not update/add duplicates', async () => {
            const registration = RegistrationNumbers()
            const text = 'ca 123'
            registration.setNumber(text)
            const validatedReg = registration.getValidReg()
            const id = registration.splitRegistration()
            registration.getValidReg() && registration.checkRegistrationAbrev() ? await registrationDb.storeNumber(validatedReg, id) : ''
            registration.getValidReg() && registration.checkRegistrationAbrev() ? await registrationDb.storeNumber(validatedReg, id) : ''
            const numbers = await registrationDb.getNumbers()
            let result = [{ id: numbers[0].id, regno: 'CA 123', town_id: 1 }]
            assert.deepEqual([result], [numbers])
        })
    });
    describe("TOWN", () => {
        it('should be able to get registration from town', async () => {
            const text = 'ca'
            const numbers = await registrationDb.search(text)
            assert.deepEqual(numbers, [{ regno: 'Cape Town has no registrations available.' }]
            )
        })
    });
    describe("TOWN 2", () => {
        it('should be able to registration from any town', async () => {
            const text = 'cw'
            const numbers = await registrationDb.search(text)
            assert.deepEqual(numbers, [{ regno: 'Worcester has no registrations available.' }]
            )
        })
    });
    describe("TOWN FILTER", () => {
        it('should be able to registrations from any town', async () => {
            // setting numbers to frontend
            let registration = RegistrationNumbers()
            let text = 'ca 123'
            registration.setNumber(text)
            let validatedReg = registration.getValidReg()
            let id = registration.splitRegistration()
            registration.getValidReg() && registration.checkRegistrationAbrev() ? await registrationDb.storeNumber(validatedReg, id) : ''
            // setting second number
            registration = RegistrationNumbers()
            text = 'ct 123'
            registration.setNumber(text)
            validatedReg = registration.getValidReg()
            id = registration.splitRegistration()
            registration.getValidReg() && registration.checkRegistrationAbrev() ? await registrationDb.storeNumber(validatedReg, id) : ''
            // setting third number
            registration = RegistrationNumbers()
            text = 'ct 123321'
            registration.setNumber(text)
            validatedReg = registration.getValidReg()
            id = registration.splitRegistration()
            registration.getValidReg() && registration.checkRegistrationAbrev() ? await registrationDb.storeNumber(validatedReg, id) : ''
            // setting fourth number
            registration = RegistrationNumbers()
            text = 'cn 123-321'
            registration.setNumber(text)
            validatedReg = registration.getValidReg()
            id = registration.splitRegistration()
            registration.getValidReg() && registration.checkRegistrationAbrev() ? await registrationDb.storeNumber(validatedReg, id) : ''
            // setting fourth number
            registration = RegistrationNumbers()
            text = 'ca 123321'
            registration.setNumber(text)
            validatedReg = registration.getValidReg()
            id = registration.splitRegistration()
            registration.getValidReg() && registration.checkRegistrationAbrev() ? await registrationDb.storeNumber(validatedReg, id) : ''
            let search = 'ct'
            let searchNumbers = await registrationDb.search(search)
            let result = [{ regno: 'CT 123' }, { regno: 'CT 123321' }]
            assert.deepEqual(searchNumbers, result)
        })
    });


    describe("TOWNS", () => {
        it('should be able to get all towns', async () => {
            const text = 'cw'
            const towns = await registrationDb.getTowns()
            const result = [
                { id: 1, town: 'Cape Town', regcode: 'ca' },
                { id: 2, town: 'Stellenbosch', regcode: 'cl' },
                { id: 3, town: 'Bellville', regcode: 'cy' },
                { id: 4, town: 'Kuils River', regcode: 'cf' },
                { id: 5, town: 'Wellington', regcode: 'cn' },
                { id: 6, town: 'Malmesbury', regcode: 'ck' },
                { id: 7, town: 'Worcester', regcode: 'cw' },
                { id: 8, town: 'Ceres', regcode: 'ct' },
                { id: 9, town: 'George', regcode: 'caw' }
            ]

            assert.deepEqual(result, towns)
        })
    });
    describe("Delete", () => {
        it('should delete all registrations', async () => {
            const numbers = await registrationDb.clear()
            let result = []
            assert.deepEqual(result, numbers)
        })
    });

});