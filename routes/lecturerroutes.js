const express = require('express');
const router = express.Router();
const lecturerController = require('../controllers/lecturerController');

/**
 * @swagger
 * /api/lecturers:
 *   get:
 *     summary: Get all lecturers
 *     tags: [Lecturers]
 *     responses:
 *       200:
 *         description: List of lecturers
 *   post:
 *     summary: Create a new lecturer
 *     tags: [Lecturers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @swagger
 * /api/lecturers/{id}:
 *   put:
 *     summary: Update a lecturer
 *     tags: [Lecturers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 *   delete:
 *     summary: Delete a lecturer
 *     tags: [Lecturers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 */


router.get('/lecturers', lecturerController.getAllLecturers);
router.post('/lecturers', lecturerController.createLecturer);
router.put('/lecturers/:id', lecturerController.updateLecturer);    // 🆕 Update
router.delete('/lecturers/:id', lecturerController.deleteLecturer); // 🆕 Delete

module.exports = router;
