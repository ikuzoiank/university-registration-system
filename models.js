const { DataTypes } = require('sequelize');
const sequelize = require('./database');

// 1. Define the Models
const Faculty = sequelize.define('Faculty', { name: DataTypes.STRING });
const Lecturer = sequelize.define('Lecturer', { name: DataTypes.STRING });
const Student = sequelize.define('Student', { name: DataTypes.STRING });
const Course = sequelize.define('Course', { name: DataTypes.STRING });

// 2. Define the Relationships (The Project 8 Requirements)
Faculty.hasMany(Course);
Course.belongsTo(Faculty);

Lecturer.hasMany(Course);
Course.belongsTo(Lecturer);

// Many-to-Many: Students <-> Courses through a "Registration" table
Student.belongsToMany(Course, { through: 'Registration' });
Course.belongsToMany(Student, { through: 'Registration' });

module.exports = { sequelize, Faculty, Lecturer, Student, Course };
