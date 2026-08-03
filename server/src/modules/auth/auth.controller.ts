import { Request, Response } from "express";
import { AppError } from "../../shared/errors/app-error.js";
import { ErrorHandler } from "../../shared/errors/error.handler.js";
import { AuthService } from "./auth.service.js";
import { LoginDto, RegisterDto } from "./auth.dto.js";
import { LoginSchema, RegisterSchema } from "./auth.schema.js";

export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly errorHandler: ErrorHandler,
  ) {}

  private setRefreshCookie(res: Response, refreshToken: string): void {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }
  
  me = async (req: Request, res: Response): Promise<void> => {
    try {

      const userId = req.user?.userId;

      if (!userId) {
        throw new AppError(401, "Unauthorized");
      }

      const user = await this.authService.me(userId);

      res.status(200).json({
        user,
      });

    } catch (error: unknown) {
      ErrorHandler.handleError(res, error);
    }
  }

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData: RegisterDto = RegisterSchema.parse(req.body);

      const result = await this.authService.register(userData);

      this.setRefreshCookie(res, result.refreshToken);

      res.status(201).json({
        accessToken: result.accessToken,
        user: result.user,
      });

      return;
    } catch (error: unknown) {
      ErrorHandler.handleError(res, error);
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const credentials: LoginDto = LoginSchema.parse(req.body);

      const result = await this.authService.login(credentials);

      this.setRefreshCookie(res, result.refreshToken);

      res.status(200).json({
        message: "Login successful",
        accessToken: result.accessToken,
        user: result.user,
      });

      return;
    } catch (error: unknown) {
      ErrorHandler.handleError(res, error);
    }
  };

  refresh = async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        throw new AppError(401, "Refresh token is missing");
      }

      const result = await this.authService.refresh(refreshToken);

      res.status(200).json({
        accessToken: result.accessToken,
      });

      return;
    } catch (error: unknown) {
      ErrorHandler.handleError(res, error);
    }
  };
}
