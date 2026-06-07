import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  try {

    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);

  } catch (error) {
    throw new Error("Error hashing password: " + error);
  }
};

export const comparePasswords = async (
  password: string, 
  hashedPassword: string
): Promise<boolean> => {
  try {

    if (!hashedPassword || typeof hashedPassword !== "string") {
      throw new Error("Invalid hashed password");
    }
    
    return await bcrypt.compare(password, hashedPassword);

  } catch (error) {
    throw new Error("Error comparing passwords: " + error);
  }
}