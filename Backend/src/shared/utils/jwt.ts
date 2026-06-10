import jwt from "jsonwebtoken";
import { z } from "zod";

const JWT_SECRET: string = process.env.JWT_SECRET!;

export interface AuthPayload {
  userId: string;
}

export const AuthPayLoadSchema = z.object({
  userId: z.string(),
});

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export class JwtUtils {
  generateToken = (payload: unknown): string => {
    const validPayload = AuthPayLoadSchema.safeParse(payload);

    if (!validPayload.success) {
      throw new Error("Invalid token payload");
    }

    return jwt.sign(validPayload.data, JWT_SECRET, {
      expiresIn: "7d",
    });
  };

  verifyToken = (token: string): AuthPayload => {
    const decoded = jwt.verify(token, JWT_SECRET);

    const payload = AuthPayLoadSchema.safeParse(decoded);

    if (!payload.success) {
      throw new Error(payload.error.message);
    }

    return payload.data;
  };
}
