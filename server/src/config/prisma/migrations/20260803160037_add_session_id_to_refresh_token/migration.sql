/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `RefreshToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessionId]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessionId` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "RefreshToken_tokenHash_key";

-- DropIndex
DROP INDEX "RefreshToken_userId_idx";

-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "updatedAt",
ADD COLUMN     "sessionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_sessionId_key" ON "RefreshToken"("sessionId");
