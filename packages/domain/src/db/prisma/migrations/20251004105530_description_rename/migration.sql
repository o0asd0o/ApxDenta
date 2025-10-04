/*
  Warnings:

  - You are about to drop the column `descrpition` on the `Treatment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Treatment" DROP COLUMN "descrpition",
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';
