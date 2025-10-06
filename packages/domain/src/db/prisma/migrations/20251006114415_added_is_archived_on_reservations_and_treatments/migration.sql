-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Treatment" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;
