import { z } from 'zod';
import { createSchema } from './notebook.schema.js';

export type createDto = z.infer<typeof createSchema>;