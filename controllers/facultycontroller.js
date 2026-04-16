const { Faculty, Course } = require('../models');

exports.getAllFaculties = async (req, res) => {
    try {
        const faculties = await Faculty.findAll({ include: Course });
        res.json(faculties);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.createFaculty = async (req, res) => {
    try {
        const newFaculty = await Faculty.create({ name: req.body.name });
        res.status(201).json(newFaculty);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// 🆕 UPDATE Faculty
exports.updateFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findByPk(req.params.id);
        if (!faculty) return res.status(404).json({ message: "Faculty not found" });
        faculty.name = req.body.name;
        await faculty.save();
        res.json({ message: "Faculty updated!", faculty });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// 🆕 DELETE Faculty
exports.deleteFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findByPk(req.params.id);
        if (!faculty) return res.status(404).json({ message: "Faculty not found" });
        await faculty.destroy();
        res.json({ message: `Faculty with ID ${req.params.id} has been deleted.` });
    } catch (err) { res.status(500).json({ error: err.message }); }
};
