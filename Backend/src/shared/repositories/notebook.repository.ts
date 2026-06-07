import { prisma } from "../../lib/prisma.js";
import type { Notebook } from "../../config/generated/prisma/client.js";
import { AppError } from "../errors/app-error.js";

export class NotebookRepository {
  getAll = async (userId: string) => {
    return prisma.notebook.findMany({
      where: {
        userId,
      },
      include: {
        notes: {
          take: 5,
          select: {
            id: true,
            title: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  };

  getById = async (
    userId: string, 
    id: string
  ): Promise<Notebook | null> => {
    return await prisma.notebook.findFirst({
      where: {
        id,
        userId,
      }
    });
  }

  getByName = (name: string, userId: string) => {
    return prisma.notebook.findFirst({
      where: {
        name,
        userId,
      }
    });
  }

  create = (
    userId: string,
    name: string,
  ): Promise<Notebook> => {
    return prisma.notebook.create({
      data: {
        userId,
        name,
      }
    });
  }

  update = (id: string, userId: string, name: string) => {

    return prisma.notebook.update({
      where:{
        id,
        userId
      },
      data: {
        name
      }
    });
  }

  delete = async (id: string, userId: string) => {
    const result = await prisma.notebook.deleteMany({
      where: {
        id,
        userId
      }
    });
    return result.count;
  }
}
