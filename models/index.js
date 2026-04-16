const sequelize = require('../config/database');
const Faculty = require('./Faculty');
const Lecturer = require('./Lecturer');
const Student = require('./Student');
const Course = require('./Course');

// Define Relationships
Faculty.hasMany(Course, { onDelete: 'CASCADE' });
Course.belongsTo(Faculty, { 
    foreignKey: { 
        name: 'facultyId',
        allowNull: false 
    } 
});

Lecturer.hasMany(Course, { onDelete: 'RESTRICT' });
Course.belongsTo(Lecturer, { 
    foreignKey: { 
        name: 'lecturerId',
        allowNull: false
    } 
});

Student.belongsToMany(Course, { through: 'Registration' });
Course.belongsToMany(Student, { through: 'Registration' });

module.exports = { sequelize, Faculty, Lecturer, Student, Course };

