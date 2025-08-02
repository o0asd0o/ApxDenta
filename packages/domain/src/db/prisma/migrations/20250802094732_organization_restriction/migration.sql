-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "AssetTransfer" ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "BillHistory" ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "Peripheral" ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "Treatment" ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "Vendor" ADD COLUMN     "organizationId" TEXT;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peripheral" ADD CONSTRAINT "Peripheral_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillHistory" ADD CONSTRAINT "BillHistory_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetTransfer" ADD CONSTRAINT "AssetTransfer_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
