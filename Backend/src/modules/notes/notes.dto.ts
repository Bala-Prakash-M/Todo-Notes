import { z }  from 'zod';
import { NotebookIdSchema } from './notes.schema.js';

export type NotebookIdDto = z.infer<typeof NotebookIdSchema>;