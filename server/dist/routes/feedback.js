"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const router = express_1.default.Router();
// Create Feedback
router.post('/', async (req, res) => {
    try {
        const feedback = await prisma_1.default.feedback.create({
            data: req.body,
        });
        res.status(201).json(feedback);
    }
    catch (error) {
        res.status(400).json({ error: 'Error creating feedback', details: error });
    }
});
// Get All Feedback
router.get('/', async (_req, res) => {
    try {
        const feedbacks = await prisma_1.default.feedback.findMany();
        res.status(200).json(feedbacks);
    }
    catch (error) {
        res.status(400).json({ error: 'Error fetching feedbacks', details: error });
    }
});
// Get Feedback by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const feedback = await prisma_1.default.feedback.findUnique({
            where: { id },
        });
        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.status(200).json(feedback);
    }
    catch (error) {
        res.status(400).json({ error: 'Error fetching feedback', details: error });
    }
});
// Update Feedback by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedFeedback = await prisma_1.default.feedback.update({
            where: { id },
            data: req.body,
        });
        res.status(200).json(updatedFeedback);
    }
    catch (error) {
        res.status(400).json({ error: 'Error updating feedback', details: error });
    }
});
// Delete Feedback by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFeedback = await prisma_1.default.feedback.delete({
            where: { id },
        });
        res.status(200).json(deletedFeedback);
    }
    catch (error) {
        res.status(400).json({ error: 'Error deleting feedback', details: error });
    }
});
exports.default = router;
