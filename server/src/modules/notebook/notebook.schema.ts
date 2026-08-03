import { z } from 'zod';

export const idSchema = z.string()
.trim()
.min(
  1, 
  "id not found"
)

export const nameSchema = z.string()
.trim()
.min(
  1, 
  "name not found"
)
.max(
  100, 
  "Name can not contain more than 100 characters"
);

export const createSchema = z.object({
  name: nameSchema,
});