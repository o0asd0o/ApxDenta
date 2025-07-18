-- CreateEnum
CREATE TYPE "StaffStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'EXPIRED', 'TERMINATED', 'RESIGNED', 'SUSPENDED');

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "status" "StaffStatus" DEFAULT 'ACTIVE';
