const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('lecturer', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: "Lecturer name cannot be empty" } }
    }
}, { 
    timestamps: false
});
