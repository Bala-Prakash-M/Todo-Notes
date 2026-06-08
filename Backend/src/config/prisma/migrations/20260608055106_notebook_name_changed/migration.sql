/*
  Warnings:

  - You are about to drop the column `noteBookId` on the `Note` table. All the data in the column will be lost.
  - Added the required column `notebookId` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_noteBookId_fkey";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "noteBookId",
ADD COLUMN     "notebookId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_notebookId_fkey" FOREIGN KEY ("notebookId") REFERENCES "Notebook"("id") ON DELETE CASCADE ON UPDATE CASCADE;
