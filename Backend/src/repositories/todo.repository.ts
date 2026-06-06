import { prisma } from "../lib/prisma.js";

export class TodoRepository {

  findAll = async (userId: string): Promise<object[]> => {
    return await prisma.todo.findMany({
      where: {
        userId,
      },
    });
  };

  findById = async (userId: string, todoId: string): Promise<object | null> => {
    return await prisma.todo.findFirst({
      where: {
        userId,
        id: todoId
      },
    });
  };

}
