import { z } from 'zod';
import type { GetAllTodosResponseSchema, TodoSchema } from "../schema/todo.schema";

export type Todo = z.infer<
  typeof TodoSchema
>;

export type GetAllTodoResponse =
  z.infer<
    typeof GetAllTodosResponseSchema
  >;