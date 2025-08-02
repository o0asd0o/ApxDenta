/*
  Warnings:

  - Added the required column `slogan` to the `organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organization" ADD COLUMN     "address" TEXT,
ADD COLUMN     "lat" INTEGER,
ADD COLUMN     "long" INTEGER,
ADD COLUMN     "slogan" TEXT NOT NULL;
