"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const router = express_1.default.Router();
// Create a new course
router.use(requireAdmin);
router.use(checkAdmin);
router.post('/', async (req, res) => {
    try {
        const course = await prisma_1.default.course.create({
            data: {
                ...req.body,
                modules: {
                    create: req.body.modules,
                },
            },
            include: { modules: true },
        });
        res.status(201).json(course);
    }
    catch (error) {
        res.status(400).json({ error: 'Error creating course', details: error });
    }
});
// Delete a course
router.delete('/:id', async (req, res) => {
    await prisma_1.default.course.delete({ where: { id: req.params.id } });
    res.json({ message: 'Course deleted' });
});
exports.default = router;
