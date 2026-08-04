import { randomUUID } from "node:crypto";
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

    // Create a new object instead of mutating the DTO
    const userToCreate: RegisterDto = {
      ...user,
      password: hashedPassword,
    };

    // Create user
    const newUser = await this.UserRepository.createUser(userToCreate);

    // Create a unique session for this login
    const sessionId = randomUUID();

    // Generate access token
    const accessToken = this.JwtUtils.generateAccessToken({
      userId: newUser.id,
    });

    // Generate refresh token (contains sessionId)
    const refreshToken = this.JwtUtils.generateRefreshToken({
      userId: newUser.id,
      sessionId,
    });

    // Hash refresh token before storing
    const hashedRefreshToken = await hashPassword(refreshToken);

    // Store refresh session
    await this.RefreshTokenRepository.create(
      newUser.id,
      sessionId,
      hashedRefreshToken,
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
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
    const user = await this.UserRepository.findByEmail(credentials.email);

    if (!user) {
      throw new AppError(401, "Invalid email or password");
    }

    const passwordMatch = await comparePasswords(
      credentials.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new AppError(401, "Invalid email or password");
    }

    // Create a new session for this login
    const sessionId = randomUUID();

    // Generate access token
    const accessToken = this.JwtUtils.generateAccessToken({
      userId: user.id,
    });

    // Generate refresh token
    const refreshToken = this.JwtUtils.generateRefreshToken({
      userId: user.id,
      sessionId,
    });

    // Hash refresh token before storing
    const hashedRefreshToken = await hashPassword(refreshToken);

    // Store refresh session
    await this.RefreshTokenRepository.create(
      user.id,
      sessionId,
      hashedRefreshToken,
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
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
  }

  async refresh(refreshToken: string) {
    // Verify the refresh token JWT
    const payload = this.JwtUtils.verifyRefreshToken(refreshToken);

    // Find the session in the database
    const storedToken = await this.RefreshTokenRepository.findBySessionId(
      payload.sessionId,
    );

    if (!storedToken) {
      throw new AppError(401, "Refresh token not found");
    }

    // Check expiration
    if (new Date() > storedToken.expiresAt) {
      await this.RefreshTokenRepository.delete(payload.sessionId);

      throw new AppError(401, "Refresh token expired");
    }

    // Compare the incoming refresh token against the stored hash
    const valid = await comparePasswords(refreshToken, storedToken.tokenHash);

    if (!valid) {
      throw new AppError(401, "Invalid refresh token");
    }

    // Generate a new access token
    const accessToken = this.JwtUtils.generateAccessToken({
      userId: payload.userId,
    });

    return {
      accessToken,
    };
  }

  async me(userId: string) {
    const user = await this.UserRepository.findById(userId);

    if (!user) {
      throw new AppError(404, "User not found");
    }

    return user;
  }

  async logout(refreshToken: string) {
    try {
      const payload = this.JwtUtils.verifyRefreshToken(refreshToken);
      await this.RefreshTokenRepository.delete(payload.sessionId);
    } catch {
      // Ignore token verification errors during logout
    }
  }

  async logoutAll(refreshToken: string) {
    try {
      const payload = this.JwtUtils.verifyRefreshToken(refreshToken);
      await this.RefreshTokenRepository.deleteAllByUser(payload.userId);
    } catch {
      // Ignore token verification errors during logout
    }
  }
}


