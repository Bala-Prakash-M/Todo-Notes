import { Notebook } from "../../config/generated/prisma/client.js";
import { NotebookRepository } from "../../shared/repositories/notebook.repository.js";
import { AppError } from "../../shared/errors/app-error.js";

export class NotebookService {
  constructor(private readonly notebookRepository: NotebookRepository) {}

  getAll = (userId: string) => {
    return this.notebookRepository.getAll(userId);
  };

  getById = async (userId: string, id: string) => {
    const notebook = await this.notebookRepository.getById(userId, id);

    if (!notebook) {
      throw new AppError(404, "Notebook not found");
    }

    return notebook;
  };

  getByName = async (name: string, userId: string) => {
    const notebook = this.notebookRepository.getByName(
      name, 
      userId
    );

    if (!notebook) {
      throw new AppError(
        400, 
        `Notebook not found with the name ${name}`
      );
    }

    return notebook;

  }

  create = async (
    userId: string, 
    name: string
  ) => {

    const existing = await this.notebookRepository.getByName(
      name, 
      userId
    );

    if (existing) {
        throw new AppError(
          409, 
          `Notebook '${name}' already exists`
        );
    }

    return this.notebookRepository.create(
      userId,
      name,
    );
  }
}
