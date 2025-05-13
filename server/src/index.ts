import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import courseRoutes from './routes/course';
import mentorRoutes from './routes/mentor';
import feedbackRoutes from './routes/feedback';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/courses', courseRoutes);
app.use('/mentors', mentorRoutes);
app.use('/feedback', feedbackRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
