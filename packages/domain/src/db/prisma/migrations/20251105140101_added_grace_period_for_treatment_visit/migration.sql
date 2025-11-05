-- CreateEnum
CREATE TYPE "GracePeriodUnit" AS ENUM ('DAYS', 'WEEKS', 'MONTHS');

-- AlterTable
ALTER TABLE "TreatmentVisit" ADD COLUMN     "gracePeriod" INTEGER,
ADD COLUMN     "gracePeriodUnit" "GracePeriodUnit";
