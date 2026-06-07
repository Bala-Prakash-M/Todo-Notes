import { Request, Response } from 'express';
import { NotebookService } from './notebook.service.js';
import { ErrorHandler } from '../../shared/errors/error.handler.js';
import { createDto, idDto, nameDto } from './notebook.dto.js';
import { createSchema, idSchema, nameSchema } from './notebook.schema.js';

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
      const id: idDto = idSchema.parse(req.params.id);

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
      const name: nameDto = nameSchema.parse(req.params.name);
      
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
      const { name }: createDto = createSchema.parse(req.body);

      const notebook = await this.notebookService.create(userId, name);

      res.status(201).json({
        data: notebook,
      });

    } catch (error: unknown) {
      ErrorHandler.handleError(res, error);
    }
  }

  update = async (req: Request<NotebookIdParams>, res: Response) => {
    try {

      const userId: string = req.user!.userId;
      const id: idDto = idSchema.parse(req.params.id);
      const { name }: createDto = createSchema.parse(req.body);

      const notebook = await this.notebookService.update(id, userId, name);

      res.status(201).json({
        data: notebook
      });

      return;

    } catch (error: unknown) {
      ErrorHandler.handleError(res, error);
    }
  }

  delete = async (req: Request<NotebookIdParams>, res: Response) => {
    try {

      const userId: string = req.user!.userId;
      const id: idDto = idSchema.parse(req.params.id);

      await this.notebookService.delete(id, userId);

      res.status(201).json({
        message: "Deleted succesfully"
      });

      return;

    } catch (error: unknown) {
      ErrorHandler.handleError(res, error);
    }
  }
}