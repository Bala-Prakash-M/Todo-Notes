import { prisma } from "../../lib/prisma.js";
import { Note } from "../../config/generated/prisma/browser.js";

export class NotesRepository {
  getAll = (userId: string, notebookId: string) => {
    return prisma.note.findMany({
      where: {
        notebookId,
        userId
      }
    });
  };
}
