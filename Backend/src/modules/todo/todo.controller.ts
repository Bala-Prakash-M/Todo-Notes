import { Response, Request } from "express";
import { TodoService } from "./todo.service.js";

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
}
