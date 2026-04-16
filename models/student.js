const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('student', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: "Student name cannot be empty" } }
    }
}, { 
    timestamps: false
});
