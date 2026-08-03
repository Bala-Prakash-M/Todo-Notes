import type { Todo } from "../../config/generated/prisma/client.js";
import { TodoRepository } from "../../shared/repositories/todo.repository.js";
import { AppError } from "../../shared/errors/app-error.js";
import { CreateTodoDto } from "./todo.dto.js"

export class TodoService {

  constructor(
    private readonly todoRepository:
      TodoRepository
  ) {}

  findAll = async (
    userId: string
  ): Promise<Todo[]> => {

    return this.todoRepository.findAll(
      userId
    );

  };

  findById = async (
    userId: string, 
    todoId: string
  ): Promise<Todo | null> => {

    return this.todoRepository.findById(
      userId, 
      todoId
    );
  }

  createTodo =  (
    todo: CreateTodoDto, 
    userId: string
  ): Promise<Todo> => {

    return this.todoRepository.createTodo(
      userId, 
      todo.title
    );

  }

  updateTodo = async (
    id: string,
    userId: string,
    title: string,
    completed: boolean
  ): Promise<Todo> => {
    return await this.todoRepository.updateTodo(
      id,
      userId,
      title,
      completed
    );
  }

  deleteTodo = async (
    id: string,
    userId: string
  ): Promise<void> => {
    const deletedCount = await this.todoRepository.deleteTodo(
      id,
      userId,
    );

    if (deletedCount === 0) {
      throw new AppError(404, "Todo not found");
    }
  }

}
