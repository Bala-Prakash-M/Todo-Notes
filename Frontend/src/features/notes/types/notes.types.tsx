import { z } from "zod";
import { noteSchema, notesResponseSchema } from "../schema/notes.schema";

export type Note = z.infer<typeof noteSchema>;
export type NotesResponse = z.infer<typeof notesResponseSchema>;