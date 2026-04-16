const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const express = require('express');
const { sequelize, Student, Faculty, Lecturer, Course } = require('./models');

const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const lecturerRoutes = require('./routes/lecturerRoutes');
const facultyRoutes = require('./routes/facultyRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Swagger Definition
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'University System API',
            version: '1.0.0',
            description: 'Live interactive API documentation',
        },
        servers: [{ url: 'http://localhost:3000' }],
    },
    // IMPORTANT: This path tells Swagger to read every .js file in your routes folder
    apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Load Routes
app.use('/api', studentRoutes);
app.use('/api', courseRoutes);
app.use('/api', lecturerRoutes);
app.use('/api', facultyRoutes);

// Database Sync & Seeding
async function seedDatabase() {
    try {
        await sequelize.sync({ force: false });
        const count = await Student.count();
        if (count === 0) {
            const engineering = await Faculty.create({ name: 'Faculty of Engineering' });
            const profSmith = await Lecturer.create({ name: 'Dr. Smith' });
            const nodeCourse = await Course.create({ 
                name: 'Backend Web Development', 
                facultyId: engineering.id, 
                lecturerId: profSmith.id   
            });

            const me = await Student.create({ name: 'Project Student' });
            await me.addCourse(nodeCourse);
            console.log("✅ Database synced and test data added!");
        } else {
            console.log("✅ Database synced (Data already exists)");
        }
        app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
    } catch (error) {
        console.error('❌ Failed to start server:', error);
    }
}

seedDatabase();
