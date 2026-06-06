import { TodoRepository } from "../../repositories/todo.repository.js";

export class TodoService {

  constructor(
    private readonly todoRepository:
      TodoRepository
  ) {}

  findAll = async (
    userId: string
  ): Promise<object[]> => {

    return this.todoRepository.findAll(
      userId
    );

  };

}
