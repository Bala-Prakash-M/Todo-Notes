import { z } from "zod";
import { CreateTodoSchema, TodoSchema, UpdateTodoSchema } from "./todo.schema.js";

export type TodoDto = z.infer<typeof TodoSchema>;

export type CreateTodoDto = z.infer<typeof CreateTodoSchema>;

export type UpdateTodoDto = z.infer<typeof UpdateTodoSchema>;