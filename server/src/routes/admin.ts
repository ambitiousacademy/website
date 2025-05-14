import express from 'express';
import prisma from '../lib/prisma';

const router = express.Router();

// Create a new course
router.use(requireAdmin);
router.use(checkAdmin);
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

// Delete a course
router.delete('/:id', async (req, res) => {
  await prisma.course.delete({ where: { id: req.params.id } });
  res.json({ message: 'Course deleted' });
});

export default router;
