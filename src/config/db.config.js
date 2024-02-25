const dotenv = require('dotenv')
dotenv.config()

const config = {
  development: {
    database: `${process.env.TEST_DB_DATABASE}`,
    username: `${process.env.TEST_DB_USERNAME}`,
    password: `${process.env.TEST_DB_PASSWORD}`,
    dialect: 'postgres',
    port: Number(process.env.TEST_DB_PORT),
    host: `${process.env.TEST_DB_HOST}`,
  },
  production: {
    database: `${process.env.DB_DATABASE}`,
    username: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    dialect: 'postgres',
    port: Number(process.env.DB_PORT),
    host: `${process.env.DB_HOST}`,
  },
}

module.exports = config
