const express = require('express');
const { sequelize, Student, Course, Lecturer, Faculty } = require('./models');

const app = express();
const PORT = 3000;

// 1. MIDDLEWARE FIRST (Important!)
app.use(express.json()); 

// 2. GET ROUTE
app.get('/timetable/:studentId', async (req, res) => {
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
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. POST ROUTE
app.post('/students', async (req, res) => {
    try {
        const newStudent = await Student.create({
            name: req.body.name // This only works if express.json() is at the top
        });
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ROUTE: Enroll a student into a course
app.post('/enroll', async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        // 1. Find the student and the course
        const student = await Student.findByPk(studentId);
        const course = await Course.findByPk(courseId);

        if (!student || !course) {
            return res.status(404).json({ message: "Student or Course not found" });
        }

        // 2. The Magic Part: Link them in the join table
        await student.addCourse(course);

        res.json({ message: `Successfully enrolled ${student.name} in ${course.name}` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ROUTE: Update a student's name
app.put('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });

        // Update the name and save
        student.name = req.body.name;
        await student.save();

        res.json({ message: "Student updated!", student });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ROUTE: Delete a student
app.delete('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });

        // This removes them from the Students table AND 
        // cleans up their enrollments in the join table automatically!
        await student.destroy();

        res.json({ message: `Student with ID ${req.params.id} has been deleted.` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// 4. DATABASE SYNC & SEED
async function seedDatabase() {
    await sequelize.sync({ force: true }); // This wipes the old tables and creates them with the new rules

    // Only seed if the database is empty
    const count = await Student.count();
    if (count === 0) {
        const engineering = await Faculty.create({ name: 'Faculty of Engineering' });
        const profSmith = await Lecturer.create({ name: 'Dr. Smith' });
        const nodeCourse = await Course.create({ 
            name: 'Backend Web Development', 
            FacultyId: engineering.id, 
            LecturerId: profSmith.id 
        });

        const me = await Student.create({ name: 'Project Student' });
        await me.addCourse(nodeCourse);
        console.log("✅ Database synced and test data added!");
    } else {
        console.log("✅ Database synced (Data already exists)");
    }
}

seedDatabase().then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
});
