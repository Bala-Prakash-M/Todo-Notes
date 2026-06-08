import express from "express";

import { AuthMiddleware } from "../../middlewares/auth.middleware.js";
import { JwtUtils } from "../../shared/utils/jwt.js";

import { NotebookController } from "../notebook/notebook.controller.js";
import { NotebookService } from "../notebook/notebook.service.js";
import { NotebookRepository } from "../../shared/repositories/notebook.repository.js";

const router = express.Router();

const authMiddleware = new AuthMiddleware(
  new JwtUtils()
);

const notebookController = new NotebookController(
  new NotebookService(
    new NotebookRepository()
  ),
);

router.use(authMiddleware.authenticate);

router.get('/', notebookController.getAll);

export default router;