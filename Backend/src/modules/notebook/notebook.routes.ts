import express from 'express';
import { AuthMiddleware } from '../../middlewares/auth.middleware.js';
import { JwtUtils } from '../../shared/utils/jwt.js';

import { NotebookController } from './notebook.controller.js';
import { NotebookService } from './notebook.service.js';
import { NotebookRepository } from '../../shared/repositories/notebook.repository.js';

const router = express.Router();

const authMiddleware = new AuthMiddleware(
    new JwtUtils()
  );

const notebookController = new NotebookController(
  new NotebookService(
    new NotebookRepository()
  )
);

router.use(authMiddleware.authenticate);

router.get('/', notebookController.getAll);

router.get('/:id', notebookController.getById);

router.get('/name/:name', notebookController.getByName);

router.post('/', notebookController.create);

router.put('/:id', notebookController.update);

router.delete('/:id', notebookController.delete);

export default router;