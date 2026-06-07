import { Response, Request } from 'express';
import { ZodError } from 'zod';

export class ErrorHandler {

  static handleError = (res: Response, error: unknown) => {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: error.issues,
      });
  
      return;
    }
  
    if (error instanceof Error) {
      res.status(500).json({
        message: "Internal server error",
      });
      return;
    }
  
    res.status(500).json({
      message: "Internal server error",
    });

    return;
  }
}
