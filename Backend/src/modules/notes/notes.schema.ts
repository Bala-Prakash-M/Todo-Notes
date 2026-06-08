import { z } from 'zod';

export const NotebookIdSchema = z.string()
  .trim()
  .min(1, "Notebook id not found")