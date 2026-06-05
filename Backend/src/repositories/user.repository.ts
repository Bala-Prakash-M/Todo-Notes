import { prisma } from "../lib/prisma";

export const findByEmail = async (email: string) => {
  try {

    const user = await prisma.user.findUnique({
      where: { email }
    })

    return user;

  } catch(error) {
    throw new Error("Error finding user by email: " + error);
  }
}

export const createUser = async (
  name: string, 
  email: string, 
  password: string
) => {

}