/*
  Warnings:

  - You are about to drop the column `changeTootBrushFrequency` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `treatmentId` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `changeToothBrushFrequency` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `Peripheral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staffId` to the `Peripheral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initialTreatmentId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BillType" AS ENUM ('RESERVATION_FEE', 'TREATMENT_FEE');

-- CreateEnum
CREATE TYPE "BillStatus" AS ENUM ('UNPAID', 'PAID');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('CASH', 'E_WALLET', 'BANK_TRANSFER');

-- CreateEnum
CREATE TYPE "BillHistoryType" AS ENUM ('COMMENT', 'PAYMENT');

-- AlterEnum
ALTER TYPE "ReservationStatus" ADD VALUE 'ENCOUNTER';

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_treatmentId_fkey";

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "changeTootBrushFrequency",
ADD COLUMN     "changeToothBrushFrequency" "ChangeToothBrushFrequency" NOT NULL;

-- AlterTable
ALTER TABLE "Peripheral" ADD COLUMN     "roomId" TEXT NOT NULL,
ADD COLUMN     "staffId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "treatmentId",
ADD COLUMN     "initialTreatmentId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillHistory" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "billId" INTEGER,
    "type" "BillHistoryType" NOT NULL,
    "description" TEXT,
    "staffId" TEXT,
    "patientId" TEXT,
    "reservationId" TEXT,

    CONSTRAINT "BillHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bill" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assetId" TEXT NOT NULL,
    "billType" "BillType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "BillStatus" NOT NULL,
    "paymentType" "PaymentType",
    "reservationId" TEXT NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssetTransfer" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DOUBLE PRECISION NOT NULL,
    "fromAssetId" TEXT NOT NULL,
    "toAssetId" TEXT NOT NULL,
    "note" TEXT,
    "staffId" TEXT NOT NULL,

    CONSTRAINT "AssetTransfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "color" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "currentAmount" DOUBLE PRECISION NOT NULL,
    "staffId" TEXT NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_initialTreatmentId_fkey" FOREIGN KEY ("initialTreatmentId") REFERENCES "Treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peripheral" ADD CONSTRAINT "Peripheral_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peripheral" ADD CONSTRAINT "Peripheral_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillHistory" ADD CONSTRAINT "BillHistory_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillHistory" ADD CONSTRAINT "BillHistory_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillHistory" ADD CONSTRAINT "BillHistory_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillHistory" ADD CONSTRAINT "BillHistory_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetTransfer" ADD CONSTRAINT "AssetTransfer_fromAssetId_fkey" FOREIGN KEY ("fromAssetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetTransfer" ADD CONSTRAINT "AssetTransfer_toAssetId_fkey" FOREIGN KEY ("toAssetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetTransfer" ADD CONSTRAINT "AssetTransfer_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
