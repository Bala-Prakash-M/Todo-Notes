import { z } from 'zod';
import {
  notebookSchema,
  notebookResponseSchema,
  getAllNotebookSchema,
  getAllNotebookResponseSchema,
} from "../schema/notebook.schema"

export type Notebook = z.infer<typeof notebookSchema>;
export type NotebookResponse = z.infer<typeof notebookResponseSchema>;
export type GetAllNotebook = z.infer<typeof getAllNotebookSchema>;
export type GetAllNotebookResponse = z.infer<typeof getAllNotebookResponseSchema>;
