import { prisma } from "../../lib/prisma.js";

export class RefreshTokenRepository {

  create = async (userId: string, tokenHash: string, expiresAt: Date) => {
    return prisma.refreshToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    });
  };
  findByTokenHash = async (tokenHash: string) => {
    return prisma.refreshToken.findUnique({
      where: {
        tokenHash,
      },
    });
  };

  delete = async (tokenHash: string) => {
    return prisma.refreshToken.delete({
      where: {
        tokenHash,
      },
    });
  };

  deleteAllByUser = async (userId: string) => {
    return prisma.refreshToken.deleteMany({
      where: {
        userId,
      },
    });
  };
}
