import jwt, { type SignOptions } from "jsonwebtoken";
import { z } from "zod";
import type { StringValue } from "ms";

const JWT_ACCESS_SECRET: string = process.env.JWT_ACCESS_SECRET!;
const JWT_REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET!;
const ACCESS_TOKEN_EXPIRES_IN = (process.env.ACCESS_TOKEN_EXPIRES_IN) as StringValue;

const REFRESH_TOKEN_EXPIRES_IN = (process.env.REFRESH_TOKEN_EXPIRES_IN) as StringValue;

export interface AccessTokenPayload {
  userId: string;
}

export interface RefreshTokenPayload {
  userId: string;
  sessionId: string;
}

export const AccessTokenPayloadSchema = z.object({
  userId: z.string(),
});

export const RefreshTokenPayloadSchema = z.object({
  userId: z.string(),
  sessionId: z.string(),
});

if (!JWT_ACCESS_SECRET) {
  throw new Error("JWT_ACCESS_SECRET is not defined");
}

if (!JWT_REFRESH_SECRET) {
  throw new Error("JWT_REFRESH_SECRET is not defined");
}

if (!ACCESS_TOKEN_EXPIRES_IN) {
  throw new Error("ACCESS_TOKEN_EXPIRES_IN is not defined");
}

if (!REFRESH_TOKEN_EXPIRES_IN) {
  throw new Error("REFRESH_TOKEN_EXPIRES_IN is not defined");
}

export class JwtUtils {
  private generate(
    payload: unknown,
    secret: string,
    expiresIn: StringValue,
  ): string {
    const validPayload = AccessTokenPayloadSchema.safeParse(payload);

    if (!validPayload.success) {
      throw new Error("Invalid token payload");
    }

    return jwt.sign(validPayload.data, secret, {
      expiresIn: expiresIn,
    });
  }

  private verify(token: string, secret: string): RefreshTokenPayload {
    const decoded = jwt.verify(token, secret);

    const payload = RefreshTokenPayloadSchema.safeParse(decoded);

    if (!payload.success) {
      throw new Error("Invalid token payload");
    }

    return payload.data;
  }

  generateAccessToken(payload: AccessTokenPayload): string {
    return this.generate(payload, JWT_ACCESS_SECRET, ACCESS_TOKEN_EXPIRES_IN);
  }

  generateRefreshToken(payload: RefreshTokenPayload): string {
    return this.generate(payload, JWT_REFRESH_SECRET, REFRESH_TOKEN_EXPIRES_IN);
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    return this.verify(token, JWT_ACCESS_SECRET);
  }

  verifyRefreshToken(token: string): RefreshTokenPayload {
    return this.verify(token, JWT_REFRESH_SECRET);
  }
}
