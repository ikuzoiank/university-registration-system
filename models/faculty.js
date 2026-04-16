const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('faculty', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: { msg: "Faculty name cannot be empty" } }
    }
}, { 
    timestamps: false
});
