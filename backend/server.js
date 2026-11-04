import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { connectDB } from "./config/db.js";
import todoRoutes from "./routes/todo.route.js";
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();

const rootDir = path.resolve();

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(rootDir, "/frontend/dist")));
    app.get("*any", (req, res) => {
        res.sendFile(path.resolve(rootDir, "frontend","dist","index.html"));
    });
}

// app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`server is running on port ${PORT}`);
});
