"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* This code snippet is setting up a router using Express in a Node.js application. It defines routes
for creating, getting all, getting a single, and deleting courses. The code is using Prisma, an ORM
for Node.js and TypeScript, to interact with the database. */
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const router = express_1.default.Router();
// Create a new course
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
// Get all courses
router.get('/', async (req, res) => {
    const courses = await prisma_1.default.course.findMany({
        include: {
            modules: true,
            instructor: true
        },
    });
    res.json(courses);
});
// Get a single course
router.get('/:id', async (req, res) => {
    const course = await prisma_1.default.course.findUnique({
        where: { id: req.params.id },
        include: { modules: true, instructor: true },
    });
    if (!course)
        return res.status(404).json({ error: 'Course not found' });
    res.json(course);
});
// Delete a course
router.delete('/:id', async (req, res) => {
    await prisma_1.default.course.delete({ where: { id: req.params.id } });
    res.json({ message: 'Course deleted' });
});
exports.default = router;
