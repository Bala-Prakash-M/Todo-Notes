import { z }  from 'zod';
import { idSchema, noteSchema } from './notes.schema.js';

export type idDto = z.infer<typeof idSchema>;

export type notesDto = z.infer<typeof noteSchema>;