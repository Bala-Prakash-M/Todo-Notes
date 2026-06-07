import { Request, Response } from 'express';
import { NotebookService } from './notebook.service.js';
import { ErrorHandler } from '../../shared/errors/error.handler.js';
import { createDto } from './notebook.dto.js';
import { createSchema } from './notebook.schema.js';

interface NotebookIdParams {
  id: string;
}

interface NotebookQueryParams {
  name?: string,
}

export class NotebookController {
  constructor(private readonly notebookService: NotebookService) {}

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {

      if (!req.user) {
        res.status(401).json({
          message: "Unauthorized",
        });

        return;
      }

      const userId: string = req.user.userId;

      const data = await this.notebookService.getAll(userId);

      res.status(200).json({
        data,
      });

      return;

    } catch (error: unknown) {
      ErrorHandler.handleError(res, error);
    }
  }

  getById = async (req: Request<NotebookIdParams>, res: Response): Promise<void> => {
    try {

      const userId: string = req.user!.userId;
      const id: string = req.params.id;

      const data = await this.notebookService.getById(userId, id);

      res.status(200).json({
        data,
      });

      return;

    } catch (error: unknown) {
      ErrorHandler.handleError(res, error);
    }
  }

  getByName = async (req: Request<NotebookQueryParams>, res: Response): Promise<void> => {
    try {

      if (!req.params.name) {
        res.status(400).json({
          message: "Notebook name not found",
        });
      }
      
      const userId: string = req.user!.userId;
      const name: string = req.params.name!;
      
      const notebook = await this.notebookService.getByName(name, userId);
      res.status(200).json({
        data: notebook,
      });
      return;

    } catch (error: unknown) {
      ErrorHandler.handleError(res, error);
    }
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {

      const userId: string = req.user!.userId;
      const data: createDto = createSchema.parse(req.body);

      const notebook = await this.notebookService.create(userId, data.name);

      res.status(201).json({
        data: notebook,
      });

    } catch (error: unknown) {
      ErrorHandler.handleError(res, error);
    }
  }
}