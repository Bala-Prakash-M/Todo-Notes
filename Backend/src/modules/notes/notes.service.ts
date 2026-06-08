import { AppError } from "../../shared/errors/app-error.js";
import { NotesRepository } from "../../shared/repositories/notes.repository.js";

export class NotesService {
  constructor(private readonly notesRepository: NotesRepository) {}

  getAll = (notebookId: string) => {
    return this.notesRepository.getAll(
      notebookId
    );
  }

  getById = (id: string, notebookId: string) => {
    return this.notesRepository.getById(
      id,
      notebookId,
    );
  }

  create = (
    notebookId: string, 
    title: string, 
    content: string
  ) => {
    return this.notesRepository.create(
      notebookId,
      title,
      content,
    );
  }

  update = (
      id: string, 
      notebookId: string, 
      title: string, 
      content: string
    ) => {
    return this.notesRepository.update(
      id, 
      notebookId, 
      title, 
      content
    );
  }

  delete = async (id: string, notebookId: string) => {
    const deleteCount = await this.notesRepository.delete(id, notebookId);

    if (deleteCount === 0) {
      throw new AppError(404, "Note not found");
    }

    return deleteCount;

  }
}