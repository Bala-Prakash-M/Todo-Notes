import type { Request, Response } from "express";
import { ZodError } from "zod";
import { AuthService } from "./auth.service.js";
import type { RegisterDto, LoginDto } from "./auth.dto.js";
import { RegisterSchema, LoginSchema } from "./auth.schema.js";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData: RegisterDto = RegisterSchema.parse(req.body);

      const newUser = await this.authService.register(userData);

      res.status(201).json(newUser);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        res.status(400).json({
          errors: error.issues,
        });
      }

      if (error instanceof Error) {
        res.status(400).json({
          message: error.message,
        });
      }
      return;
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const credentials: LoginDto = LoginSchema.parse(req.body);

      const user = await this.authService.login(credentials);

      res.status(200).json({ message: "Login successful", user });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        res.status(400).json({
          errors: error.issues,
        });
        return;
      }

      if (error instanceof Error) {
        res.status(400).json({
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        message: "Unknown error",
      });
    }
  };
}
