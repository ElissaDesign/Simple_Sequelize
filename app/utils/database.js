const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PASSWORD,
    {
        host: 'localhost',
        dialect:'postgres'
    }
)

module.exports = sequelize;