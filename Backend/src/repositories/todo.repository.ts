import { prisma } from "../lib/prisma.js";
import type { Todo } from "../config/generated/prisma/client.js";

export class TodoRepository {
  findAll = async (userId: string): Promise<Todo[]> => {
    return await prisma.todo.findMany({
      where: {
        userId,
      },
    });
  };

  findById = async (userId: string, todoId: string): Promise<Todo | null> => {
    return await prisma.todo.findFirst({
      where: {
        userId,
        id: todoId,
      },
    });
  };

  createTodo = (userId: string, title: string): Promise<Todo> => {
    return prisma.todo.create({
      data: {
        userId,
        title,
      },
    });
  };
}
