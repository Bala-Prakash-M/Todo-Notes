import { Todo } from "../../config/generated/prisma/client.js";
import { TodoRepository } from "../../repositories/todo.repository.js";
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
      userId, todoId
    );
  }

  createTodo =  (
    todo: CreateTodoDto, 
    userId: string
  ): Promise<Todo> => {

    return this.todoRepository.createTodo(userId, todo.title);

  }

}
