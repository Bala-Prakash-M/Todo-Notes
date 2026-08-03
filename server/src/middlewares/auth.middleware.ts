import { Request, Response, NextFunction } from "express";
import { JwtUtils } from "../shared/utils/jwt.js";

export class AuthMiddleware {
  constructor(private readonly JwtUtils: JwtUtils) {}

  authenticate = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const authHeader = req.headers["authorization"];
      // TypeScript complains because a string[] might be returned, and string[] is not assignable to string.
      if (typeof authHeader !== "string") {
        res.status(401).json({ message: "Invalid authorization header" });
        return;
      }

      if (!authHeader) {
        res.status(401).json({ message: "Authorization header missing" });
        return;
      }

      const [schema, token]: string[] = authHeader.split(" ");

      if (schema !== "Bearer" || !token) {
        res.status(401).json({ message: "Invalid authorization format" });
        return;
      }

      const payload = this.JwtUtils.verifyAccessToken(token);

      req.user = payload;

      next();
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(401).json({
          message: error.message || "Unauthorized",
        });
      }
      return;
    }
  };
}
