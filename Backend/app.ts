import express from "express";
import cors from "cors";
import authRoutes from "./src/modules/auth/auth.routes.js";
import todosRoutes from "./src/modules/todo/todo.routes.js";
import notebookRoutes from './src/modules/notebook/notebook.routes.js';
import notesRoutes from './src/modules/notes/notes.routes.js';
import { JwtUtils } from "./src/shared/utils/jwt.js";
import { AuthMiddleware } from "./src/middlewares/auth.middleware.js";

const app = express();
app.use(cors());
app.use(express.json());

const jwtUtils = new JwtUtils();
const authMiddleware = new AuthMiddleware(jwtUtils);

app.get('/test', authMiddleware.authenticate, async (req, res) => {

 try {

  res.json({ success: true, message: "Test route is working!" });

 } catch (error) {

  console.error("Error in /test route:", error);
  res.status(500).json({ error: "Internal Server Error" });

 }
})

app.use('/api/auth', authRoutes);
app.use('/api/todo', todosRoutes);
app.use('/api/notebook', notebookRoutes);
app.use('/api/notes', notesRoutes);

export default app;
