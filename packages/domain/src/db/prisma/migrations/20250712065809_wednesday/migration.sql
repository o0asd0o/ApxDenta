/*
  Warnings:

  - The values [WEDNEDAY] on the enum `WorkingDay` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `DefaultDayOff` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `from` on the `WorkSchedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `to` on the `WorkSchedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `from` on the `WorkScheduleSlice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `to` on the `WorkScheduleSlice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "WorkingDay_new" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');
ALTER TABLE "WorkSchedule" ALTER COLUMN "day" TYPE "WorkingDay_new" USING ("day"::text::"WorkingDay_new");
ALTER TYPE "WorkingDay" RENAME TO "WorkingDay_old";
ALTER TYPE "WorkingDay_new" RENAME TO "WorkingDay";
DROP TYPE "WorkingDay_old";
COMMIT;

-- AlterTable
ALTER TABLE "WorkSchedule" DROP COLUMN "from",
ADD COLUMN     "from" TIME(0) NOT NULL,
DROP COLUMN "to",
ADD COLUMN     "to" TIME(0) NOT NULL;

-- AlterTable
ALTER TABLE "WorkScheduleSlice" DROP COLUMN "from",
ADD COLUMN     "from" TIME(0) NOT NULL,
DROP COLUMN "to",
ADD COLUMN     "to" TIME(0) NOT NULL;

-- AlterTable
ALTER TABLE "account" ALTER COLUMN "accessTokenExpiresAt" SET DATA TYPE TIMESTAMP(0),
ALTER COLUMN "refreshTokenExpiresAt" SET DATA TYPE TIMESTAMP(0),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(0),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(0);

-- AlterTable
ALTER TABLE "invitation" ALTER COLUMN "expiresAt" SET DATA TYPE TIMESTAMP(0);

-- AlterTable
ALTER TABLE "member" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(0);

-- AlterTable
ALTER TABLE "organization" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(0);

-- AlterTable
ALTER TABLE "session" ALTER COLUMN "expiresAt" SET DATA TYPE TIMESTAMP(0),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(0),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(0);

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(0),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(0);

-- AlterTable
ALTER TABLE "verification" ALTER COLUMN "expiresAt" SET DATA TYPE TIMESTAMP(0),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(0),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(0);

-- DropTable
DROP TABLE "DefaultDayOff";
