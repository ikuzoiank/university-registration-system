const { DataTypes } = require('sequelize');
const sequelize = require('./database');

// 1. Define the Models with Validation
const Faculty = sequelize.define('faculty', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Prevents duplicate faculty names
        validate: {
            notEmpty: { msg: "Faculty name cannot be empty" }
        }
    }
});

const Lecturer = sequelize.define('lecturer', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Lecturer name cannot be empty" }
        }
    }
});

const Student = sequelize.define('student', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Student name cannot be empty" }
        }
    }
});

const Course = sequelize.define('course', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Prevents duplicate course names (e.g., two "Math 101"s)
        validate: {
            notEmpty: { msg: "Course name cannot be empty" }
        }
    }
});

// 2. Define the Relationships
Faculty.hasMany(Course, { onDelete: 'CASCADE' });
Course.belongsTo(Faculty, { foreignKey: { allowNull: false } }); // A course MUST have a faculty

Lecturer.hasMany(Course, { onDelete: 'SET NULL' });
Course.belongsTo(Lecturer);

// Many-to-Many: Students <-> Courses through a "Registration" table
Student.belongsToMany(Course, { through: 'Registration' });
Course.belongsToMany(Student, { through: 'Registration' });

module.exports = { sequelize, Faculty, Lecturer, Student, Course };
