import express from "express";
import { AuthMiddleware } from "../../middlewares/auth.middleware.js";
import { JwtUtils } from "../../utils/jwt.js";
import { TodoController } from "./todo.controller.js";
import { TodoService } from "./todo.service.js";
import { TodoRepository } from "../../repositories/todo.repository.js";

const router = express.Router();

const authMiddleware = new AuthMiddleware(new JwtUtils());
const todoController = new TodoController(
  new TodoService(new TodoRepository()),
);

router.use(authMiddleware.authenticate);

// Define your todo routes here
router.get("/", todoController.findAll);

router.get("/:id", todoController.findById);

export default router;
