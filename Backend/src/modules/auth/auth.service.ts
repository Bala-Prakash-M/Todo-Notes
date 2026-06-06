import type { RegisterDto, LoginDto } from "./auth.dto.js";
import { UserRepository } from "../../repositories/user.repository.js";
import { comparePasswords, hashPassword } from "../../utils/password.js";

export class AuthService {

  constructor(private readonly UserRepository: UserRepository) {}

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

      return newUser;

    } catch(error: unknown) {
      throw new Error((error as Error).message);
    }
  }

  async login(credentials: LoginDto) {
    try {

      const user = await this.UserRepository.findByEmail(credentials.email);

      if (!user) {
        throw new Error("User not found");
      }

      const passwordMatch = await comparePasswords(credentials.password, user.password);

      if (!passwordMatch) {
        throw new Error("Invalid password");
      }

      return user;

    } catch(error: unknown) {
      throw new Error((error as Error).message);
    }
  }

}
