import { Response } from "express";
import { Prisma } from "../../config/generated/prisma/client.js";
import { ZodError } from "zod";
import { AppError } from "./app-error.js";

export class ErrorHandler {
  static handleError = (res: Response, error: unknown) => {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: error.issues,
      });

      return;
    }

    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        message: error.message,
      });
      return;
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        const modelName =
          typeof error.meta?.modelName === "string"
            ? error.meta.modelName
            : "Resource";

        res.status(404).json({
          message: `${modelName} not found`,
        });
        return;
      }

      if (error.code === "P2002") {
        res.status(409).json({
          message: "A record with this value already exists",
        });
        return;
      }
    }

    if (error instanceof Error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
      });
      return;
    }

    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });

    return;
  };
}
