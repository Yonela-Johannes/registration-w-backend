const pgp = require('pg-promise')();
const local = 'postgres://postgres:juanesse123@localhost:5432/registration';
const connectionString = process.env.DATABASE_URL || local

const config = {
    connectionString,
    max: 20,
    ssl: {
        rejectUnauthorized: false
    }
}

const db = pgp(config)

module.exports = db