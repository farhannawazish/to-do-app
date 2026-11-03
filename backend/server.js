import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import { connectDB } from "./config/db.js";
import todoRoutes from "./routes/todo.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(`server is running on port ${PORT}`);
});
