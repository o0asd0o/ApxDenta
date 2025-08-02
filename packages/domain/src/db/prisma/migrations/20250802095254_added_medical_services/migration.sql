-- AlterTable
ALTER TABLE "CosmeticService" ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "MedicalService" ADD COLUMN     "organizationId" TEXT;

-- AddForeignKey
ALTER TABLE "CosmeticService" ADD CONSTRAINT "CosmeticService_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalService" ADD CONSTRAINT "MedicalService_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
