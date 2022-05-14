const Sequelize = require('sequelize');

const db = require('../utils/database');

const user =  db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull:false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: true,
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull:false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull:false,
    }

})

module.exports = user;