import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string()
    .trim()
    .min(
      1, 
      "Name is required and cannot be empty"
    ),
  email: z.email(
    "Invalid email address"
  ),
  password: z.string()
    .trim()
    .min(
      6, 
      "Password must be at least 6 characters long"
    ),
});

export const LoginSchema = z.object({
  email: z.email(
    "Invalid email address"
  ),
  password: z.string()
    .trim()
    .min(
      6, 
      "Password must be at least 6 characters long"
    ),
});