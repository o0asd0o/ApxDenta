/*
  Warnings:

  - You are about to drop the column `imageId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PricePlan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Visit` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sku]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `MedicalComponent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `changeTootBrushFrequency` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dentalCareStart` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastDentalVisit` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oralHygieneDuration` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usingDentalFloss` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `washTeethFrequency` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNumber` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employmentType` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Treatment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerDuration` to the `Treatment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PeripheralCategory" AS ENUM ('MAIN_EQUIPMENT', 'SUPPORT_EQUIPMENT', 'DIAGNOSTIC_EQUIPMENT');

-- CreateEnum
CREATE TYPE "StockCategory" AS ENUM ('ANALGESIC', 'ANTIACID', 'ANTIANXIETY_DRUG', 'ANTIARRHYTHMICS', 'ANTISEPTIC', 'ANTIBACTERIAL', 'ANTIBIOTIC', 'ANTICOGAGULANT', 'THROMBOLYTICS', 'ANTICONVULSANTS', 'ANTIDEPRESANTS', 'ANTIDIARRHEAL', 'ANTIEMETICS', 'ANTIFUNGAL', 'ANTIHISTAMINE', 'ANTIHYPERTENSIVE', 'ANTI_INFLAMMATORY', 'ANTINEOPLASTIC', 'ANTIPSYCHOTIC', 'ANTIPYRETIC', 'ANTIVIRAL', 'BARBITURE', 'BETA_BLOCKER', 'BRONCHODILATOR', 'COLD_CURE', 'CORTISOSTEROID', 'STEROID', 'COUGH_SUPRESSANT', 'CYTOTOXIC', 'DECONGESTANT', 'EXPECTORANT', 'DIURETIC', 'HORMONES', 'HYPOGLYCEMIC', 'IMMUNOSUPPRESSIVE', 'LAXATIVE', 'MUSCLE_RELAXANT', 'SEDATIVE', 'SEX_HORMONE_FEMALE', 'SEX_HORMONE_MALE', 'SLEEPING_DRUG', 'TRANQUILIZER', 'VITAMIN');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('PART_TIME', 'FULL_TIME');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('DONE', 'CANCELLED', 'PENDING', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "MedicalServiceStatus" AS ENUM ('DONE', 'PENDING');

-- CreateEnum
CREATE TYPE "WorkingDay" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNEDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "TreatmentStatus" AS ENUM ('SAMPLE', 'FINALIZED');

-- CreateEnum
CREATE TYPE "OralHygienDuration" AS ENUM ('AROUND_1_MINUTE', 'ABOUNT_2_MINUTES', 'MORE_THAN_2_MINUTES', 'I_DONT_KNOW');

-- CreateEnum
CREATE TYPE "ChangeToothBrushFrequency" AS ENUM ('EVERY_3_MONTHS', 'EVERY_6_MONTHS', 'EVERY_YEAR', 'AS_OCCUR');

-- CreateEnum
CREATE TYPE "OralSide" AS ENUM ('NO', 'LEFT', 'RIGHT', 'BOTH');

-- CreateEnum
CREATE TYPE "TorusPalatinus" AS ENUM ('NO', 'SMALL', 'MEDIUM', 'LARGE', 'MULTIPLE');

-- CreateEnum
CREATE TYPE "Occlusi" AS ENUM ('NORMAL', 'CROSS', 'STEEP');

-- CreateEnum
CREATE TYPE "WashTeethFrequency" AS ENUM ('NEVER', 'ONCE', 'TWICE', 'THRICE', 'MORE_THAN_THRICE');

-- CreateEnum
CREATE TYPE "DentalCareStart" AS ENUM ('TEENAGER', 'ABOUT_20', 'ABOUT_30', 'AFTER_30');

-- CreateEnum
CREATE TYPE "LastDetalVisit" AS ENUM ('LESS_THAN_3_MONTHS', 'LESS_THAN_6_MONTHS', 'A_YEAR_AGO', 'DONT_REMEMBER');

-- CreateEnum
CREATE TYPE "MedicalCheckupStatus" AS ENUM ('ARCHIVED', 'LATEST');

-- CreateEnum
CREATE TYPE "StockStatus" AS ENUM ('LOW_STOCK', 'IN_STOCK', 'OUT_OF_STOCK');

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_treatmentId_fkey";

-- AlterTable
ALTER TABLE "MedicalComponent" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT now(),
ALTER COLUMN "updatedAt" SET DEFAULT now();

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "accountId" TEXT,
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "changeTootBrushFrequency" "ChangeToothBrushFrequency" NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
ADD COLUMN     "dentalCareStart" "DentalCareStart" NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "lastDentalVisit" "LastDetalVisit" NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "lat" DOUBLE PRECISION,
ADD COLUMN     "long" DOUBLE PRECISION,
ADD COLUMN     "oralHygieneDuration" "OralHygienDuration" NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
ADD COLUMN     "usingDentalFloss" BOOLEAN NOT NULL,
ADD COLUMN     "washTeethFrequency" "WashTeethFrequency" NOT NULL;

-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now();

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "imageId",
ALTER COLUMN "createdAt" SET DEFAULT now(),
ALTER COLUMN "updatedAt" SET DEFAULT now();

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "accountId" TEXT,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
ADD COLUMN     "employmentType" "EmploymentType" NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "lat" DOUBLE PRECISION,
ADD COLUMN     "long" DOUBLE PRECISION,
ADD COLUMN     "position" TEXT NOT NULL,
ADD COLUMN     "specialistsRecordId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT now();

-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "category" "StockCategory" NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
ADD COLUMN     "fileId" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "sku" TEXT NOT NULL,
ADD COLUMN     "status" "StockStatus" NOT NULL,
ADD COLUMN     "unit" TEXT,
ADD COLUMN     "unitPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT now();

-- AlterTable
ALTER TABLE "Treatment" ADD COLUMN     "duration" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pricePerDuration" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "staffId" TEXT,
ADD COLUMN     "status" "TreatmentStatus" NOT NULL DEFAULT 'FINALIZED',
ADD COLUMN     "unit" TEXT,
ALTER COLUMN "createdAt" SET DEFAULT now(),
ALTER COLUMN "updatedAt" SET DEFAULT now();

-- AlterTable
ALTER TABLE "TreatmentComponent" ADD COLUMN     "free" BOOLEAN,
ADD COLUMN     "freeUpTo" INTEGER,
ALTER COLUMN "createdAt" SET DEFAULT now(),
ALTER COLUMN "updatedAt" SET DEFAULT now();

-- AlterTable
ALTER TABLE "session" ADD COLUMN     "activeOrganizationId" TEXT;

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "PricePlan";

-- DropTable
DROP TABLE "Visit";

-- CreateTable
CREATE TABLE "invitation" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT,
    "status" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(6) NOT NULL,
    "inviterId" TEXT NOT NULL,

    CONSTRAINT "invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logo" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL,
    "metadata" TEXT,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DefaultDayOff" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "repeat" BOOLEAN,

    CONSTRAINT "DefaultDayOff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayOff" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3),
    "repeat" BOOLEAN,

    CONSTRAINT "DayOff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkSchedule" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "day" "WorkingDay" NOT NULL,
    "from" TIME(6) NOT NULL,
    "to" TIME(6) NOT NULL,
    "staffId" TEXT,

    CONSTRAINT "WorkSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkScheduleSlice" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "from" TIME(6) NOT NULL,
    "to" TIME(6) NOT NULL,
    "workScheduleId" TEXT,

    CONSTRAINT "WorkScheduleSlice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecialistsRecord" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "SpecialistsRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreatmentVisit" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "days" INTEGER NOT NULL,
    "treatmentId" TEXT,

    CONSTRAINT "TreatmentVisit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "description" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "imageId" TEXT,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "thumb" TEXT,
    "fallback" TEXT,
    "type" TEXT NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "reservationId" TEXT,
    "reviewId" TEXT,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "note" TEXT,
    "status" "ReservationStatus" NOT NULL,
    "staffId" TEXT NOT NULL,
    "treatmentId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalCheckup" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "status" "MedicalCheckupStatus" NOT NULL,
    "bloodPressureMm" INTEGER NOT NULL,
    "bloodPressureHg" INTEGER NOT NULL,
    "particularSickness" TEXT[],
    "allergies" TEXT[],
    "occlusi" "Occlusi" NOT NULL,
    "torusPalatinus" "TorusPalatinus" NOT NULL,
    "torusMandibularis" "OralSide" NOT NULL,
    "palatum" "OralSide" NOT NULL,
    "diastema" TEXT NOT NULL,
    "anomalous" TEXT NOT NULL,
    "othersNotListed" TEXT,
    "reservationId" TEXT,
    "patientRefId" TEXT,

    CONSTRAINT "MedicalCheckup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CosmeticService" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "condition" TEXT,
    "maxilla" BOOLEAN,
    "mandible" BOOLEAN,
    "treatmentId" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "unapprovedReason" TEXT,
    "medicalCheckupId" TEXT,

    CONSTRAINT "CosmeticService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalService" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "toothNumber" INTEGER,
    "note" TEXT,
    "status" "MedicalServiceStatus" NOT NULL,
    "approved" BOOLEAN NOT NULL,
    "unapprovedReason" TEXT,
    "medicalCheckupId" TEXT,
    "treatmentId" TEXT NOT NULL,
    "toothConditionId" TEXT NOT NULL,

    CONSTRAINT "MedicalService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToothCondition" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "ToothCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "lat" DOUBLE PRECISION,
    "long" DOUBLE PRECISION,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Peripheral" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT now(),
    "fileId" TEXT,
    "weight" DOUBLE PRECISION NOT NULL,
    "category" "PeripheralCategory" NOT NULL,
    "barcode" TEXT NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "vendorId" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Peripheral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_staffDayOff" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_VendorStock" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "organization_slug_key" ON "organization"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ToothCondition_code_key" ON "ToothCondition"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Peripheral_sku_key" ON "Peripheral"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "_staffDayOff_AB_unique" ON "_staffDayOff"("A", "B");

-- CreateIndex
CREATE INDEX "_staffDayOff_B_index" ON "_staffDayOff"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_VendorStock_AB_unique" ON "_VendorStock"("A", "B");

-- CreateIndex
CREATE INDEX "_VendorStock_B_index" ON "_VendorStock"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_sku_key" ON "Stock"("sku");

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_specialistsRecordId_fkey" FOREIGN KEY ("specialistsRecordId") REFERENCES "SpecialistsRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkSchedule" ADD CONSTRAINT "WorkSchedule_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkScheduleSlice" ADD CONSTRAINT "WorkScheduleSlice_workScheduleId_fkey" FOREIGN KEY ("workScheduleId") REFERENCES "WorkSchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatmentVisit" ADD CONSTRAINT "TreatmentVisit_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalCheckup" ADD CONSTRAINT "MedicalCheckup_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalCheckup" ADD CONSTRAINT "MedicalCheckup_patientRefId_fkey" FOREIGN KEY ("patientRefId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CosmeticService" ADD CONSTRAINT "CosmeticService_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CosmeticService" ADD CONSTRAINT "CosmeticService_medicalCheckupId_fkey" FOREIGN KEY ("medicalCheckupId") REFERENCES "MedicalCheckup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalService" ADD CONSTRAINT "MedicalService_toothConditionId_fkey" FOREIGN KEY ("toothConditionId") REFERENCES "ToothCondition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalService" ADD CONSTRAINT "MedicalService_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalService" ADD CONSTRAINT "MedicalService_medicalCheckupId_fkey" FOREIGN KEY ("medicalCheckupId") REFERENCES "MedicalCheckup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peripheral" ADD CONSTRAINT "Peripheral_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peripheral" ADD CONSTRAINT "Peripheral_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_staffDayOff" ADD CONSTRAINT "_staffDayOff_A_fkey" FOREIGN KEY ("A") REFERENCES "DayOff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_staffDayOff" ADD CONSTRAINT "_staffDayOff_B_fkey" FOREIGN KEY ("B") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VendorStock" ADD CONSTRAINT "_VendorStock_A_fkey" FOREIGN KEY ("A") REFERENCES "Stock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VendorStock" ADD CONSTRAINT "_VendorStock_B_fkey" FOREIGN KEY ("B") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
