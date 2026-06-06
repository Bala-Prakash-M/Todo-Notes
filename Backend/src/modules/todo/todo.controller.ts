import { Response, Request } from "express";
import { TodoService } from "./todo.service.js";
import { string } from "zod";

type TodoParams = {
  id: string;
};

export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          message: "Unauthorized",
        });
        return;
      }

      const userId = req.user.userId;

      const todos = await this.todoService.findAll(userId);

      res.status(200).json({
        message: "success",
        todos,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          message: "Internal server error",
          error: error.message,
        });
      }
    }
  };

  findById = async (req: Request<TodoParams>, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          message: "Unauthorized",
        });
        return;
      }

      const userId = req.user.userId;
      const id = req.params.id;

      const todo = await this.todoService.findById(userId, id);

      if (!todo) {
        res.status(404).json({
          message: "Todo not found",
        });
        return;
      }

      res.status(200).json({
        message: "Success",
        data: todo,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({
          message: "Internal server error",
        });
        return;
      }

      res.status(500).json({
        message: "Internal server error",
      });
    }
  };
}
