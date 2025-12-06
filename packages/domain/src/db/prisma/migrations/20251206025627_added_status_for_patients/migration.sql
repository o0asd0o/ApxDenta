-- CreateEnum
CREATE TYPE "PatientStatus" AS ENUM ('NEW', 'ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "status" "PatientStatus" NOT NULL DEFAULT 'NEW';
