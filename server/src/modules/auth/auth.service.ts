import type { RegisterDto, LoginDto } from "./auth.dto.js";
import { UserRepository } from "../../shared/repositories/user.repository.js";
import { RefreshTokenRepository } from "../../shared/repositories/refresh-token.repository.js";
import { comparePasswords, hashPassword } from "../../shared/utils/password.js";
import { JwtUtils } from "../../shared/utils/jwt.js";
import { AppError } from "../../shared/errors/app-error.js";

export class AuthService {
  constructor(
    private readonly UserRepository: UserRepository,
    private readonly JwtUtils: JwtUtils,
    private readonly RefreshTokenRepository: RefreshTokenRepository,
  ) {}

  async register(user: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.UserRepository.findByEmail(user.email);

    if (existingUser) {
      throw new AppError(409, "User with this email already exists");
    }

    // Hash password
    const hashedPassword = await hashPassword(user.password);

    // Don't mutate the incoming DTO
    const userToCreate: RegisterDto = {
      ...user,
      password: hashedPassword,
    };

    // Create user
    const newUser = await this.UserRepository.createUser(userToCreate);

    // Generate tokens
    const accessToken = this.JwtUtils.generateAccessToken({
      userId: newUser.id,
    });

    const refreshToken = this.JwtUtils.generateRefreshToken({
      userId: newUser.id,
    });

    // Hash refresh token before storing
    const hashedRefreshToken = await hashPassword(refreshToken);

    // Store refresh token hash
    await this.RefreshTokenRepository.create(
      newUser.id,
      hashedRefreshToken,
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    );

    return {
      accessToken,
      refreshToken,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    };
  }

  async login(credentials: LoginDto) {
    try {
      const user = await this.UserRepository.findByEmail(credentials.email);

      if (!user) {
        throw new AppError(401, "User not found");
      }

      const passwordMatch = await comparePasswords(
        credentials.password,
        user.password,
      );

      if (!passwordMatch) {
        throw new AppError(401, "Invalid password");
      }

      // Generate JWT token
      const accessToken = this.JwtUtils.generateAccessToken({ userId: user.id });

      // Generate refresh token
      const refreshToken = this.JwtUtils.generateRefreshToken({ userId: user.id });

      const hashedRefreshToken = await hashPassword(refreshToken);

      await this.RefreshTokenRepository.create(
        user.id,
        hashedRefreshToken,
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      );

      return {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      };
    } catch (error: unknown) {
      throw new AppError(401, (error as Error).message);
    }
  }

  async refresh(refreshToken: string) {
  // Verify the refresh token JWT
  const payload = this.JwtUtils.verifyRefreshToken(refreshToken);

  // Find the stored refresh token for this user
  const storedToken =
    await this.RefreshTokenRepository.findByUserId(
      payload.userId
    );

  if (!storedToken) {
    throw new AppError(401, "Refresh token not found");
  }

  // Check if the stored token has expired
  if (new Date() > storedToken.expiresAt) {
    await this.RefreshTokenRepository.delete(storedToken.id);

    throw new AppError(401, "Refresh token expired");
  }

  // Compare the incoming refresh token with the stored hash
  const valid = await comparePasswords(
    refreshToken,
    storedToken.tokenHash
  );

  if (!valid) {
    throw new AppError(401, "Invalid refresh token");
  }

  // Generate a new access token
  const accessToken =
    this.JwtUtils.generateAccessToken({
      userId: payload.userId,
    });

  return {
    accessToken,
  };
}
}
