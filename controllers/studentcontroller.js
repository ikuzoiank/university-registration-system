const { Student, Course, Lecturer, Faculty } = require('../models');

// GET Timetable
exports.getTimetable = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.studentId, {
            include: {
                model: Course,
                through: { attributes: [] },
                include: [Lecturer, Faculty]
            }
        });
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.json(student);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// POST New Student
exports.createStudent = async (req, res) => {
    try {
        const newStudent = await Student.create({ name: req.body.name });
        res.status(201).json(newStudent);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// POST Enroll Student
exports.enrollStudent = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;
        const student = await Student.findByPk(studentId);
        const course = await Course.findByPk(courseId);
        if (!student || !course) return res.status(404).json({ message: "Student or Course not found" });
        await student.addCourse(course);
        res.json({ message: `Successfully enrolled ${student.name} in ${course.name}` });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// PUT Update Student
exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        student.name = req.body.name;
        await student.save();
        res.json({ message: "Student updated!", student });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// DELETE Student
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        await student.destroy();
        res.json({ message: `Student with ID ${req.params.id} has been deleted.` });
    } catch (err) { res.status(500).json({ error: err.message }); }
};
