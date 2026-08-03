import express from "express";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { UserRepository } from "../../shared/repositories/user.repository.js";
import { JwtUtils } from "../../shared/utils/jwt.js";
import { ErrorHandler } from "../../shared/errors/error.handler.js";
import { RefreshTokenRepository } from "../../shared/repositories/refresh-token.repository.js";
import { AuthMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

const authService = new AuthService(
  new UserRepository(), 
  new JwtUtils(),
  new RefreshTokenRepository()
);
const authController = new AuthController(
  authService, 
  new ErrorHandler()
);
const authMiddleware = new AuthMiddleware(new JwtUtils());

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.post("/me", authMiddleware.authenticate, authController.me);

export default router;
