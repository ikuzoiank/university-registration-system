const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');

/**
 * @swagger
 * /api/faculties:
 *   get:
 *     summary: Get all faculties
 *     tags: [Faculties]
 *     responses:
 *       200:
 *         description: List of faculties
 *   post:
 *     summary: Create a new faculty
 *     tags: [Faculties]
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
 * /api/faculties/{id}:
 *   put:
 *     summary: Update a faculty
 *     tags: [Faculties]
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
 *     summary: Delete a faculty
 *     tags: [Faculties]
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

router.get('/faculties', facultyController.getAllFaculties);
router.post('/faculties', facultyController.createFaculty);
router.put('/faculties/:id', facultyController.updateFaculty);   
router.delete('/faculties/:id', facultyController.deleteFaculty);
module.exports = router;
