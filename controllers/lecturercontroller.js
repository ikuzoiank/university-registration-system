const { Lecturer, Course } = require('../models');

exports.getAllLecturers = async (req, res) => {
    try {
        const lecturers = await Lecturer.findAll({ include: Course });
        res.json(lecturers);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.createLecturer = async (req, res) => {
    try {
        const newLecturer = await Lecturer.create({ name: req.body.name });
        res.status(201).json(newLecturer);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// 🆕 UPDATE Lecturer
exports.updateLecturer = async (req, res) => {
    try {
        const lecturer = await Lecturer.findByPk(req.params.id);
        if (!lecturer) return res.status(404).json({ message: "Lecturer not found" });
        lecturer.name = req.body.name;
        await lecturer.save();
        res.json({ message: "Lecturer updated!", lecturer });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// 🆕 DELETE Lecturer
exports.deleteLecturer = async (req, res) => {
    try {
        const lecturer = await Lecturer.findByPk(req.params.id);
        if (!lecturer) return res.status(404).json({ message: "Lecturer not found" });
        await lecturer.destroy();
        res.json({ message: `Lecturer with ID ${req.params.id} has been deleted.` });
    } catch (err) { res.status(500).json({ error: err.message }); }
};
