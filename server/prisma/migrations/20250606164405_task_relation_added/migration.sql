/*
  Warnings:

  - Added the required column `columnId` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "task" ADD COLUMN     "columnId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "column"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
