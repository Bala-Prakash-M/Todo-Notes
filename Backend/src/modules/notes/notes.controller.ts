import { Request, Response } from 'express';
import { NotesService } from './notes.service.js';
import { ErrorHandler } from '../../shared/errors/error.handler.js';
import { NotebookIdSchema } from './notes.schema.js';
import { NotebookIdDto } from './notes.dto.js';


interface notebookIdParams {
  notebookId: string,
}

export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  getAll = async (req: Request<notebookIdParams>, res: Response): Promise<void> => {
    try {

      const userId: string = req.user!.userId;
      const notebookId: NotebookIdDto = NotebookIdSchema.parse(req.params.notebookId);

      const notes = await this.notesService.getAll(userId, notebookId);

      res.status(200).json({
        data: notes
      });

    } catch (error: unknown) {
      ErrorHandler.handleError(res, error);
    }

  }
}