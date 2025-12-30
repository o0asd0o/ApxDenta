/*
  Warnings:

  - Added the required column `duration` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "usingMouthWash" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "usingDentalFloss" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "emergencyContactName" TEXT,
ADD COLUMN     "emergencyContactNumber" TEXT,
ADD COLUMN     "emergencyContactRelation" TEXT;

-- CreateIndex
CREATE INDEX "idx_reservation_time" ON "Reservation"("startTime", "endTime");

-- CreateIndex
CREATE INDEX "idx_reservation_staff_time" ON "Reservation"("staffId", "startTime");
