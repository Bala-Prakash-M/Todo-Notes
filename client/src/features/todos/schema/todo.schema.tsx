import { z } from "zod";

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
  userId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const GetAllTodosResponseSchema =
  z.object({
    message: z.string(),
    todos: z.array(TodoSchema),
  });

