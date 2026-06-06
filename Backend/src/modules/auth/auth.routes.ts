import express from "express";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { UserRepository } from "../../repositories/user.repository.js";

const router = express.Router();

const authService = new AuthService(new UserRepository());
const authController = new AuthController(authService);

router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;
