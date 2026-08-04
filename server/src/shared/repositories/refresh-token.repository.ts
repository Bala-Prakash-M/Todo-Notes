import { prisma } from "../../lib/prisma.js";

export class RefreshTokenRepository {

  create = async (
    userId: string,
    sessionId: string,
    tokenHash: string,
    expiresAt: Date
  ) => {
    return prisma.refreshToken.create({
      data: {
        userId,
        sessionId,
        tokenHash,
        expiresAt,
      },
    });
  };

  findBySessionId = async (
    sessionId: string
  ) => {
    return prisma.refreshToken.findUnique({
      where: {
        sessionId,
      },
    });
  };

  delete = async (
    sessionId: string
  ) => {
    return prisma.refreshToken.deleteMany({
      where: {
        sessionId,
      },
    });
  };

  deleteAllByUser = async (
    userId: string
  ) => {
    return prisma.refreshToken.deleteMany({
      where: {
        userId,
      },
    });
  };
}