import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import type { RegisterDto, LoginDto } from "./auth.dto.js";
import { RegisterSchema, LoginSchema } from "./auth.schema.js";
import { ErrorHandler } from "../../shared/errors/error.handler.js";

export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly errorHandler: ErrorHandler,
  ) {}

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData: RegisterDto = RegisterSchema.parse(req.body);

      const newUser = await this.authService.register(userData);

      res
        .cookie("refreshToken", newUser.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        })
        .status(201)
        .json({
          accessToken: newUser.accessToken,
          user: newUser.user,
        });
    } catch (error: unknown) {
      ErrorHandler.handleError(res, error);
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const credentials: LoginDto = LoginSchema.parse(req.body);

      const user = await this.authService.login(credentials);

      res
        .cookie("refreshToken", user.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
          message: "Login successful",
          accessToken: user.accessToken,
          user: user.user,
        });
    } catch (error: unknown) {
      ErrorHandler.handleError(res, error);
    }
  };
}
