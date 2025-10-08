import express from "express";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
// Derive the directory of this file (ESM safe) instead of using path.resolve(),
// so relative joins to the frontend build are correct both locally and on Render.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

const PORT = process.env.PORT ?? 3000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(distPath));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
