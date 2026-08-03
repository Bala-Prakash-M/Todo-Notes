import { Request, Response } from "express";
import { NotesService } from "./notes.service.js";
import { ErrorHandler } from "../../shared/errors/error.handler.js";
import {
  idSchema,
  noteSchema,
  updateNoteParamsSchema,
} from "./notes.schema.js";
import { idDto, notesDto } from "./notes.dto.js";

interface notebookIdParams {
  notebookId: string;
}
interface idParams {
  id: string;
}

interface UpdateNoteParams {
  id: string;
  notebookId: string;
}

export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  getAll = async (
    req: Request<notebookIdParams>,
    res: Response,
  ): Promise<void> => {
    try {
      // const userId: string = req.user!.userId;
      const notebookId: idDto = idSchema.parse(req.params.notebookId);

      const notes = await this.notesService.getAll(notebookId);

      res.status(200).json({
        data: notes,
      });
    } catch (error: unknown) {
      ErrorHandler.handleError(res, error);
    }
  };

  getById = async (req: Request<UpdateNoteParams>, res: Response) => {
    try {
      const params = updateNoteParamsSchema.parse(req.params);

      const note = await this.notesService.getById(params.id, params.notebookId);

      res.status(200).json({
        data: note,
      });

      return;
    } catch (error: unknown) {
      ErrorHandler.handleError(res, error);
    }
  };

  create = async (req: Request<notebookIdParams>, res: Response) => {
    try {
      const notebookId: idDto = idSchema.parse(req.params.notebookId);
      const data = req.body;

      const note = await this.notesService.create(
        notebookId,
        data.title,
        data.content,
      );

      res.status(200).json({
        data: note,
      });

      return;
    } catch (error: unknown) {
      ErrorHandler.handleError(res, error);
    }
  };

  update = async (
    req: Request<UpdateNoteParams>,
    res: Response,
  ): Promise<void> => {
    try {
      const params = updateNoteParamsSchema.parse(req.params);

      const data = noteSchema.parse(req.body);

      const updatedNote = await this.notesService.update(
        params.id,
        params.notebookId,
        data.title,
        data.content,
      );

      res.status(200).json({
        data: updatedNote,
      });
    } catch (error: unknown) {
      ErrorHandler.handleError(res, error);
    }
  };

  delete = async (req: Request<UpdateNoteParams>, res: Response) => {
    try {
      const params = updateNoteParamsSchema.parse(req.params);

      await this.notesService.delete(params.id, params.notebookId);

      res.status(201).json({
        message: "Note deleted succesfully",
      });

      return;
    } catch (error: unknown) {
      ErrorHandler.handleError(res, error);
    }
  };
}
