"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const course_1 = __importDefault(require("./routes/course"));
const mentor_1 = __importDefault(require("./routes/mentor"));
const feedback_1 = __importDefault(require("./routes/feedback"));
const payment_1 = __importDefault(require("./routes/payment"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/courses', course_1.default);
app.use('/mentors', mentor_1.default);
app.use('/feedback', feedback_1.default);
app.use('/payment', payment_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
