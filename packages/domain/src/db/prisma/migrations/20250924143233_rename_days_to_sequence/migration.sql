/*
  Warnings:

  - You are about to drop the column `days` on the `TreatmentVisit` table. All the data in the column will be lost.
  - Added the required column `sequence` to the `TreatmentVisit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TreatmentVisit" DROP COLUMN "days",
ADD COLUMN     "sequence" INTEGER NOT NULL;
