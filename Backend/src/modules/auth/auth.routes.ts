import express from "express";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { UserRepository } from "../../repositories/user.repository.js";
import { JwtUtils } from "../../utils/jwt.js";
import { ErrorHandler } from "../../utils/error.handler.js";

const router = express.Router();

const authService = new AuthService(
  new UserRepository(), 
  new JwtUtils()
);
const authController = new AuthController(
  authService, 
  new ErrorHandler()
);

router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;
