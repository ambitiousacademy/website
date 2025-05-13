import express from 'express';
import prisma from '../lib/prisma';

const router = express.Router();

// Create a new course
router.post('/', async (req, res) => {
    try {
        const course = await prisma.course.create({
            data: {
                ...req.body,
                modules: {
                    create: req.body.modules,
                },
            },
            include: { modules: true },
        });
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ error: 'Error creating course', details: error });
    }
});

// Get all courses
router.get('/', async (req, res) => {
    const courses = await prisma.course.findMany({ include: { modules: true } });
    res.json(courses);
});

// Get a single course
router.get('/:id', async (req: any, res: any) => {
    const course = await prisma.course.findUnique({
        where: { id: req.params.id },
        include: { modules: true },
    });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
});

// Delete a course
router.delete('/:id', async (req, res) => {
    await prisma.course.delete({ where: { id: req.params.id } });
    res.json({ message: 'Course deleted' });
});

export default router;
