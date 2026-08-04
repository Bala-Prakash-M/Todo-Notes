import jwt from "jsonwebtoken";
import { z } from "zod";
import type { StringValue } from "ms";

const JWT_ACCESS_SECRET: string = process.env.JWT_ACCESS_SECRET!;
const JWT_REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET!;
const ACCESS_TOKEN_EXPIRES_IN = process.env
  .ACCESS_TOKEN_EXPIRES_IN as StringValue;

const REFRESH_TOKEN_EXPIRES_IN = process.env
  .REFRESH_TOKEN_EXPIRES_IN as StringValue;

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
  private generate<T extends object>(
    payload: T,
    secret: string,
    expiresIn: StringValue,
    schema: z.ZodType<T>,
  ): string {
    const validPayload = schema.safeParse(payload);

    if (!validPayload.success) {
      throw new Error("Invalid token payload");
    }

    return jwt.sign(validPayload.data, secret, {
      expiresIn,
    });
  }

  private verify<T extends object>(
    token: string,
    secret: string,
    schema: z.ZodType<T>,
    ignoreExpiration = false,
  ): T {
    const decoded = jwt.verify(token, secret, { ignoreExpiration });

    const payload = schema.safeParse(decoded);

    if (!payload.success) {
      throw new Error("Invalid token payload");
    }

    return payload.data;
  }

  generateAccessToken(payload: AccessTokenPayload): string {
    return this.generate(
      payload,
      JWT_ACCESS_SECRET,
      ACCESS_TOKEN_EXPIRES_IN,
      AccessTokenPayloadSchema,
    );
  }

  generateRefreshToken(payload: RefreshTokenPayload): string {
    return this.generate(
      payload,
      JWT_REFRESH_SECRET,
      REFRESH_TOKEN_EXPIRES_IN,
      RefreshTokenPayloadSchema,
    );
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    return this.verify(token, JWT_ACCESS_SECRET, AccessTokenPayloadSchema);
  }

  verifyRefreshToken(
    token: string,
    ignoreExpiration = false,
  ): RefreshTokenPayload {
    return this.verify(
      token,
      JWT_REFRESH_SECRET,
      RefreshTokenPayloadSchema,
      ignoreExpiration,
    );
  }
}
