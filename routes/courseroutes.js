const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of courses
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               facultyId:
 *                 type: integer
 *               lecturerId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Course created
 */

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update a course
 *     tags: [Courses]
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
 *               facultyId:
 *                 type: integer
 *               lecturerId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Course updated
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Course deleted
 */

router.get('/courses', courseController.getAllCourses);
router.post('/courses', courseController.createCourse);
router.delete('/courses/:id', courseController.deleteCourse);
router.put('/courses/:id', courseController.updateCourse);


module.exports = router;
