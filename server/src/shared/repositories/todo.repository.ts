import { prisma } from "../../lib/prisma.js";
import type { Todo } from "../../config/generated/prisma/client.js";
import { AppError } from "../errors/app-error.js";

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

  updateTodo = async (
    id: string,
    userId: string,
    title: string,
    completed: boolean,
  ): Promise<Todo> => {

    return prisma.todo.update({
      where: {
        id,
        userId
      },
      data: {
        title,
        completed,
      },
    });
  };

  deleteTodo = async (id: string, userId: string): Promise<number> => {
    const result = await prisma.todo.deleteMany({
      where: {
        id,
        userId,
      },
    });

    return result.count;
  };
}
