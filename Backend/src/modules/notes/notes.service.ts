import { NotesRepository } from "../../shared/repositories/notes.repository.js";

export class NotesService {
  constructor(private readonly notesRepository: NotesRepository) {}

  getAll = (userId: string, notebookId: string) => {
    return this.notesRepository.getAll(
      userId,
      notebookId
    );
  }
}