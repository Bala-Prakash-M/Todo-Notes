import { z } from 'zod';

export const TitleSchema = z
  .string()
  .trim()
  .min(1, "Title is required")
  .max(200, "Title is too long");

export const TodoSchema = z.object({
  title: TitleSchema,
  id: z.string(),
  completed: z.boolean(),
});

export const CreateTodoSchema = z.object({
  title: TitleSchema,
});

export const UpdateTodoSchema = z.object({
  title: TitleSchema,
  completed: z.boolean(),
});