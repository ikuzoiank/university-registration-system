const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('course', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: { msg: "Course name cannot be empty" } }
    }
}, { 
    timestamps: false
});
