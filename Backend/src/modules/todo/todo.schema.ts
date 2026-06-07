import { z } from 'zod';

export const CreateTodoSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(200, "Title is too long"),
});