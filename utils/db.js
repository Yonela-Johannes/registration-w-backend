const db = require("./connection.js")

const RegistrationDb = () => {
    const getNumbers = async () => {
        const rows = await db.any('SELECT * FROM regnumbers;')
        return rows
    }
    const getNumber = async (regno) => {
        const rows = await db.any(`SELECT * FROM regnumbers WHERE regno = $1;`, [regno])
        return rows[0]?.['regno']
    }
    const storeNumber = async (regno) => {
        console.log("REG NO----> ", regno)
        const rows = await db.any(`SELECT * FROM regnumbers WHERE regno = $1;`, [regno])
        if (rows.length === 0) {
            await db.any(`INSERT INTO regnumbers (regno) VALUES ($1);`, [regno])
        }
    }
    const search = async (regno) => {
        const rows = await db.any(`SELECT * FROM regnumbers WHERE LIKE = $1;`, [regno])
        return rows[0]?.['regno']
    }
    const clear = async (id) => {
        await db.any('DELETE FROM regnumbers WHERE id > 0;')
    }
    return {
        getNumbers,
        getNumber,
        storeNumber,
        search,
        clear
    }
}
module.exports = RegistrationDb