import { z } from 'zod';

export const idSchema = z.string()
  .trim()
  .min(1, "Notebook id not found")

export const noteSchema = z.object({
  title: z.string()
    .trim()
    .min(1, "Title can't be empty")
    .max(100, "Title can not exceed more than 100 characters"),
  content: z.string(),
});

export const updateNoteParamsSchema = z.object({
  id: z.string().cuid(),
  notebookId: z.string().cuid(),
});