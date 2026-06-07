import { z } from "zod";
import { CreateTodoSchema } from "./todo.schema.js";

export type CreateTodoDto = z.infer<typeof CreateTodoSchema>;