-- AlterTable
ALTER TABLE "TreatmentVisit" ADD COLUMN     "visitTreatmentId" TEXT;

-- AddForeignKey
ALTER TABLE "TreatmentVisit" ADD CONSTRAINT "TreatmentVisit_visitTreatmentId_fkey" FOREIGN KEY ("visitTreatmentId") REFERENCES "Treatment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
