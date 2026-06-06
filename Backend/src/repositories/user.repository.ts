import { prisma } from "../lib/prisma.js";
import type { RegisterDto } from "../modules/auth/auth.dto.js";

export class UserRepository {

    findByEmail = async (email: string) => {
    try {
  
      const user = await prisma.user.findUnique({
        where: { email }
      });
  
      return user;
  
    } catch(error) {
      throw new Error("Error finding user by email: " + error);
    }
  }
  
    createUser = async (user: RegisterDto) => {
    try {
  
      const newUser = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password
        }
      })
      return newUser;
    } catch (error) {
      throw new Error("Error creating user: " + error);
    }
  }
}

