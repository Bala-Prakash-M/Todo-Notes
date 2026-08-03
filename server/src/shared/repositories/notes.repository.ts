import { prisma } from "../../lib/prisma.js";
import { Note } from "../../config/generated/prisma/browser.js";

export class NotesRepository {
  getAll = (notebookId: string) => {
    return prisma.note.findMany({
      where: {
        notebookId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  };

  getById = (id: string, notebookId: string) => {
    return prisma.note.findFirst({
      where: {
        id,
        notebookId,
      },
    });
  };

  create = (
    notebookId: string, 
    title: string, 
    content: string
  ) => {
    return prisma.note.create({
      data: {
        notebookId,
        title,
        content,
      },
    });
  };

  update = (
    id: string, 
    notebookId: string, 
    title: string, 
    content: string
  ) => {
    return prisma.note.update({
      where: {
        id,
        notebookId,
      },
      data: {
        title,
        notebookId,
        content,
      },
    });
  };

  delete = async (id: string, notebookId: string) => {
    const result = await prisma.note.deleteMany({
      where: {
        id,
        notebookId
      },
    });

    return result.count;
  };
}
