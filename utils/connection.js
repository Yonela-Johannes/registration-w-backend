const pgp = require('pg-promise')();
const local = 'postgres://postgres:juanesse123@localhost:5432/registration';
const connectionString = "postgres://gkuojjzysnfpbx:0807e973652b9954052ff9a0b90727e8146e38bd25266002f49ee6d139e7ba81@ec2-44-205-112-253.compute-1.amazonaws.com:5432/dc0o33v5cg7vjt" || local

const config = {
    connectionString,
    max: 20,
    ssl: {
        rejectUnauthorized: false
    }
}

const db = pgp(config)

module.exports = db