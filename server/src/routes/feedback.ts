import express from 'express';
import prisma from '../lib/prisma';
const router = express.Router();

// Create Feedback
router.post('/', async (req, res) => {
  try {
    const feedback = await prisma.feedback.create({
      data: req.body,
    });
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ error: 'Error creating feedback', details: error });
  }
});

// Get All Feedback
router.get('/', async (_req, res) => {
  try {
    const feedbacks = await prisma.feedback.findMany();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching feedbacks', details: error });
  }
});

// Get Feedback by ID
router.get('/:id', async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const feedback = await prisma.feedback.findUnique({
      where: { id },
    });
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.status(200).json(feedback);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching feedback', details: error });
  }
});

// Update Feedback by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedFeedback = await prisma.feedback.update({
      where: { id },
      data: req.body,
    });
    res.status(200).json(updatedFeedback);
  } catch (error) {
    res.status(400).json({ error: 'Error updating feedback', details: error });
  }
});

// Delete Feedback by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFeedback = await prisma.feedback.delete({
      where: { id },
    });
    res.status(200).json(deletedFeedback);
  } catch (error) {
    res.status(400).json({ error: 'Error deleting feedback', details: error });
  }
});

export default router;
