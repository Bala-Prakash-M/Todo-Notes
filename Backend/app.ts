import express from "express";
import cors from "cors";
import authRoutes from "./src/modules/auth/auth.routes.js";
import { JwtUtils } from "./src/utils/jwt.js";
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

export default app;
