import { prisma } from "../../lib/prisma.js";
import type { RegisterDto } from "../../modules/auth/auth.dto.js";
import { AppError } from "../errors/app-error.js";

export class UserRepository {
  findByEmail = async (email: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      return user;
    } catch (error) {
      throw new AppError(400, "Error finding user by email: " + error);
    }
  };

  findById = async (id: string) => {
    return prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  };

  createUser = async (user: RegisterDto) => {
    try {
      const newUser = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      });
      return newUser;
    } catch (error) {
      throw new AppError(400, "Error creating user: " + error);
    }
  };
}
