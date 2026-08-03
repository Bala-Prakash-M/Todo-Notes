import express from "express";

import { AuthMiddleware } from "../../middlewares/auth.middleware.js";
import { JwtUtils } from "../../shared/utils/jwt.js";

import { NotesController } from "./notes.controller.js";
import { NotesService } from "./notes.service.js";
import { NotesRepository } from "../../shared/repositories/notes.repository.js";

const router = express.Router();

const authMiddleware = new AuthMiddleware(
  new JwtUtils()
);

const notesController = new NotesController(
  new NotesService(
    new NotesRepository()
  ),
);

router.use(authMiddleware.authenticate);

router.get('/:notebookId', notesController.getAll);

router.get('/:notebookId/:id', notesController.getById);

router.post('/:notebookId', notesController.create);

router.delete('/:notebookId/:id', notesController.delete);

router.put('/:notebookId/:id', notesController.update);

export default router;