import { prisma } from "../lib/prisma.js";

export class TodoRepository {

  findAll = async (userId: string): Promise<object[]> => {
    return await prisma.todo.findMany({
      where: {
        userId,
      },
    });
  };

}
