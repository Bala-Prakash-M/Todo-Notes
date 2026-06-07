import { Response, Request } from "express";
import { string, ZodError } from "zod";
import { TodoService } from "./todo.service.js";
import { CreateTodoDto } from "./todo.dto.js";
import { CreateTodoSchema } from "./todo.schema.js";
import { ErrorHandler } from "../../utils/error.handler.js";

type TodoParams = {
  id: string;
};

export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly errorHandler: ErrorHandler,
  ) {}

  // private static handleError = (res: Response, error: unknown) => {
  //   if (error instanceof ZodError) {
  //     res.status(400).json({
  //       message: error.issues,
  //     });

  //     return;
  //   }

  //   if (error instanceof Error) {
  //     res.status(500).json({
  //       message: "Internal server error",
  //     });
  //     return;
  //   }

  //   res.status(500).json({
  //     message: "Internal server error",
  //   });
  // }

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
      ErrorHandler.handleError(res, error);
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
      ErrorHandler.handleError(res, error);
    }
  };

  createTodo = async (req: Request, res: Response): Promise<void> => {
    try {

      if (!req.user) {
        res.status(401).json({
          message: "Unauthorized",
        });

        return;
      }

      const userId = req.user.userId;
      const data: CreateTodoDto = CreateTodoSchema.parse(req.body);

      const createdTodo = await this.todoService.createTodo(data, userId);

      res.status(201).json({
        data: createdTodo,
      });
    } catch (error: unknown) {
      ErrorHandler.handleError(res, error);
    }
  };
}
