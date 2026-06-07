import { z } from 'zod';
import { createSchema, idSchema, nameSchema } from './notebook.schema.js';

export type createDto = z.infer<typeof createSchema>;

export type idDto = z.infer<typeof idSchema>;
export type nameDto = z.infer<typeof nameSchema>;