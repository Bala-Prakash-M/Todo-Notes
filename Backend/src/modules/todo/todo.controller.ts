import { Response, Request } from "express";
import { TodoService } from "./todo.service.js";
import { TodoDto, CreateTodoDto, UpdateTodoDto } from "./todo.dto.js";
import { TodoSchema, CreateTodoSchema, UpdateTodoSchema } from "./todo.schema.js";
import { ErrorHandler } from "../../utils/error.handler.js";

type TodoParams = {
  id: string;
};

export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    // private readonly errorHandler: ErrorHandler,
  ) {}

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

  updateTodo = async (req: Request<TodoParams>, res: Response): Promise<void> => {
    try {

      if (!req.user) {
        res.status(401).json({
          message: "Unauthorized",
        });

        return;
      }

      const id: string = req.params.id;
      const userId = req.user.userId;
      const updatingDetails: UpdateTodoDto = UpdateTodoSchema.parse(req.body);

      const updatedTodo: TodoDto = await 
        this.todoService.updateTodo(
          id,
          userId,
          updatingDetails.title, 
          updatingDetails.completed
        );

      res.status(200).json({
        data: updatedTodo,
      });

      return;

    } catch (error: unknown) {
      ErrorHandler.handleError(res, error);
    }
  }

  deleteTodo = async (req: Request<TodoParams>, res: Response): Promise<void> => {
    try {

      if (!req.user) {
        res.status(401).json({
          message: "Unauthorized",
        });

        return;
      }

      const userId = req.user.userId;
      const id: string = (req.params.id);

      if (!id) {
        res.status(400).json({
          message: "id not found",
        });

        return;
      }

      await this.todoService.deleteTodo(
        id, 
        userId
      );

      res.status(204).send();

      return;

    } catch (error: unknown) {
      ErrorHandler.handleError(res, error);
    }
  }
}
