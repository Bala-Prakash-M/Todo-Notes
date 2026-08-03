import { z } from "zod";

export const notebookNotePreviewSchema = z.object({
  id: z.string(),
  title: z.string(),
});

export const notebookSchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const notebookResponseSchema = z.object({
  data: notebookSchema,
});

export const getAllNotebookSchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  notes: z.array(notebookNotePreviewSchema),
});

export const getAllNotebookResponseSchema = z.object({
  data: z.array(getAllNotebookSchema),
});
