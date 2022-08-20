const RegistrationDb = (db) => {
    const getTowns = async () => {
        const rows = await db.many('SELECT * FROM towns;')
        return rows
    }
    const getNumbers = async () => {
        const rows = await db.any('SELECT * FROM regnumbers;')
        return rows
    }
    const getNumber = async (regno) => {
        const rows = await db.any(`SELECT * FROM regnumbers WHERE regno = $1;`, [regno])
        return rows[0]?.['regno']
    }

    const getTownName = async (regcode) => {
        const [result] = await db.many('SELECT id FROM towns WHERE regcode = $1', [regcode])
        const { id } = result
        const town_result = await db.many('SELECT regno FROM regnumbers WHERE town_id = $1', [id])
        const { regno } = town_result
        return regno
    }

    const getTown = async (regcode) => {
        const [result] = await db.many('SELECT town FROM towns WHERE regcode = $1;', [regcode])
        const { town } = result
        return town
    }

    const storeNumber = async (regno, regcode) => {
        if (regno?.length < 11) {
            const [result] = await db.any('SELECT id FROM towns WHERE regcode = $1', [regcode])
            const rows = await db.any(`SELECT * FROM regnumbers WHERE regno = $1;`, [regno])
            const { id } = result
            if (rows.length === 0) {
                await db.any(`INSERT INTO regnumbers (regno, town_id) VALUES ($1, $2);`, [regno, id])
            }
        }
    }
    const search = async (regcode) => {
        let query = `SELECT regno FROM regnumbers WHERE regno ILIKE '${regcode}%'`
        const town = await getTown(regcode)
        let towns = ''
        towns = await db.any(query)
        let result = towns.length < 1 ? [{ regno: `${town} has no registrations available.` }] : towns
        return result
    }

    const searchAll = async (searchprop) => {
        let rows = ''
        let towns = ''
        if (searchprop.length > 2) {
            rows = `SELECT * FROM towns WHERE town ILIKE '%${searchprop}%'`
            let result = await db.any(rows)
            if (result.length > 0) {
                const [userId] = result
                const { id } = userId
                towns = await db.any(`SELECT regno FROM regnumbers WHERE town_id = $1;`, [id])
            }
            let allTownResult = towns.length < 1 ? [{ regno: `${searchprop} has no registrations available.` }] : towns
            return allTownResult
        }
        else if (searchprop.length <= 2) {
            rows = `SELECT * FROM towns WHERE regcode ILIKE '%${searchprop}%'`
            let [towns] = await db.any(rows)
            const { regcode } = towns
            const { town } = towns
            let query = `SELECT regno FROM regnumbers WHERE regno ILIKE '${regcode}%'`
            let result = await db.any(query)
            let allTownResult = result.length < 1 ? [{ regno: `${town} has no registrations available.` }] : result
            return allTownResult
        } else {
            let result = ''
            towns = await db.any(rows)
            result = towns.length < 1 ? [{ regno: `${searchprop} has no registrations available.` }] : towns
            return result
        }
    }

    const clear = async (id) => {
        const result = await db.any('DELETE FROM regnumbers WHERE id > 0;')
        return result
    }
    return {
        getTowns,
        getTownName,
        getNumbers,
        getNumber,
        storeNumber,
        getTown,
        search,
        searchAll,
        clear
    }
}
module.exports = RegistrationDb