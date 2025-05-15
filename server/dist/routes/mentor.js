"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const router = express_1.default.Router();
// Create a new mentor
router.post('/', async (req, res) => {
    try {
        const mentor = await prisma_1.default.mentor.create({ data: req.body });
        res.status(201).json(mentor);
    }
    catch (error) {
        res.status(400).json({ error: 'Error creating mentor', details: error });
    }
});
// Get all mentors
router.get('/', async (_req, res) => {
    try {
        const mentors = await prisma_1.default.mentor.findMany();
        res.json(mentors);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching mentors' });
    }
});
// Get mentor by ID
router.get('/:id', async (req, res) => {
    try {
        const mentor = await prisma_1.default.mentor.findUnique({
            where: { id: req.params.id },
        });
        if (!mentor)
            return res.status(404).json({ error: 'Mentor not found' });
        res.json(mentor);
    }
    catch (error) {
        res.status(400).json({ error: 'Invalid ID format' });
    }
});
// Update mentor
router.put('/:id', async (req, res) => {
    try {
        const mentor = await prisma_1.default.mentor.update({
            where: { id: req.params.id },
            data: req.body,
        });
        res.json(mentor);
    }
    catch (error) {
        res.status(400).json({ error: 'Error updating mentor', details: error });
    }
});
// Delete mentor
router.delete('/:id', async (req, res) => {
    try {
        await prisma_1.default.mentor.delete({
            where: { id: req.params.id },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: 'Error deleting mentor' });
    }
});
exports.default = router;
