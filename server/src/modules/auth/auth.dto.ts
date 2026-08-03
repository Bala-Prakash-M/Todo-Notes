import { z } from "zod";
import { RegisterSchema, LoginSchema } from "./auth.schema.js";

export type RegisterDto = 
  z.infer<typeof RegisterSchema>;

export type LoginDto = 
  z.infer<typeof LoginSchema>;
