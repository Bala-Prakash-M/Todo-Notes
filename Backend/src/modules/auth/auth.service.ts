import type { RegisterDto, LoginDto } from "./auth.dto.js";
import { UserRepository } from "../../shared/repositories/user.repository.js";
import { comparePasswords, hashPassword } from "../../shared/utils/password.js";
import { JwtUtils } from "../../shared/utils/jwt.js";
import { AppError } from "../../shared/errors/app-error.js";

export class AuthService {

  constructor(private readonly UserRepository: UserRepository, private readonly JwtUtils: JwtUtils) {}

  async register(user: RegisterDto) {
    try {

      // Check if user already exists
      const existingUser = await this.UserRepository.findByEmail(user.email);

      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      // Hash the password
      const hashedPassword = await hashPassword(user.password);

      // Update user object with hashed password
      user.password = hashedPassword;

      // Create new user
      const newUser = await this.UserRepository.createUser(user);

      // Generate JWT token
      const token = this.JwtUtils.generateToken({ userId: newUser.id });

      return {
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
      };

    } catch(error: unknown) {
      throw new AppError(400, (error as Error).message);
    }
  }

  async login(credentials: LoginDto) {
    try {

      const user = await this.UserRepository.findByEmail(credentials.email);

      if (!user) {
        throw new AppError(400, "User not found");
      }

      const passwordMatch = await comparePasswords(credentials.password, user.password);

      if (!passwordMatch) {
        throw new Error("Invalid password");
      }

      // Generate JWT token
      const token = this.JwtUtils.generateToken({ userId: user.id });

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      };

    } catch(error: unknown) {
      throw new AppError(400, (error as Error).message);
    }
  }

}