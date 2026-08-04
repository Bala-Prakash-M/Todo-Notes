import { Request, Response, type CookieOptions } from "express";
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

  private getRefreshCookieOptions(req: Request): CookieOptions {
    const isHttps =
      process.env.NODE_ENV === "production" ||
      req.secure ||
      req.headers["x-forwarded-proto"] === "https";

    return {
      httpOnly: true,
      secure: isHttps,
      sameSite: isHttps ? "none" : "lax",
      path: "/",
    };
  }

  private setRefreshCookie(req: Request, res: Response, refreshToken: string): void {
    res.cookie("refreshToken", refreshToken, {
      ...this.getRefreshCookieOptions(req),
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }

  private clearRefreshCookie(req: Request, res: Response): void {
    res.clearCookie("refreshToken", this.getRefreshCookieOptions(req));
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

      this.setRefreshCookie(req, res, result.refreshToken);

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

      this.setRefreshCookie(req, res, result.refreshToken);

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

  logout = async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (refreshToken) {
        await this.authService.logout(refreshToken);
      }

      this.clearRefreshCookie(req, res);

      res.status(200).json({
        message: "Logged out successfully",
      });
      return;
    } catch (error: unknown) {
      ErrorHandler.handleError(res, error);
    }
  };

  logoutAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (refreshToken) {
        await this.authService.logoutAll(refreshToken);
      }

      this.clearRefreshCookie(req, res);

      res.status(200).json({
        message: "Logged out of all devices successfully",
      });
      return;
    } catch (error: unknown) {
      ErrorHandler.handleError(res, error);
    }
  };
}

