import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./src/modules/auth/auth.routes.js";
import todosRoutes from "./src/modules/todo/todo.routes.js";
import notebookRoutes from "./src/modules/notebook/notebook.routes.js";
import notesRoutes from "./src/modules/notes/notes.routes.js";
import { JwtUtils } from "./src/shared/utils/jwt.js";
import { AuthMiddleware } from "./src/middlewares/auth.middleware.js";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://notebook-bp.vercel.app/",
  "https://todo-notes-eta.vercel.app/",
];

app.use(
  cors({
    origin(origin, callback) {
      // Allow tools like Postman or server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const jwtUtils = new JwtUtils();
const authMiddleware = new AuthMiddleware(jwtUtils);

app.get("/test", authMiddleware.authenticate, async (req, res) => {
  try {
    res.json({ success: true, message: "Test route is working!" });
  } catch (error) {
    console.error("Error in /test route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/todo", todosRoutes);
app.use("/api/notebook", notebookRoutes);
app.use("/api/notes", notesRoutes);

export default app;
