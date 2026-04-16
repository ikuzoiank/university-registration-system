const { Course, Lecturer, Faculty } = require('../models');

// GET All Courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll({ include: [Lecturer, Faculty] });
        res.json(courses);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// POST New Course
exports.createCourse = async (req, res) => {
    try {
        const { name, facultyId, lecturerId } = req.body;
        const newCourse = await Course.create({ name, facultyId, lecturerId });
        res.status(201).json(newCourse);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// DELETE Course
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });
        await course.destroy();
        res.json({ message: `Course with ID ${req.params.id} has been deleted.` });
    } catch (err) { res.status(500).json({ error: err.message }); }
};
// UPDATE Course
exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });
        
        // Update fields if they are provided in the request body
        if (req.body.name) course.name = req.body.name;
        if (req.body.facultyId) course.facultyId = req.body.facultyId;
        if (req.body.lecturerId) course.lecturerId = req.body.lecturerId;
        
        await course.save();
        res.json({ message: "Course updated!", course });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

