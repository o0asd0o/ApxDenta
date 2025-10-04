/*
  Warnings:

  - You are about to drop the column `visitTreatmentId` on the `TreatmentVisit` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TreatmentVisit" DROP CONSTRAINT "TreatmentVisit_visitTreatmentId_fkey";

-- AlterTable
ALTER TABLE "TreatmentVisit" DROP COLUMN "visitTreatmentId";

-- CreateIndex
CREATE INDEX "idx_rating_treatment_id" ON "Rating"("treatmentId");

-- CreateIndex
CREATE INDEX "idx_review_treatment_id" ON "Review"("treatmentId");

-- CreateIndex
CREATE INDEX "idx_treatment_name_category_visitType" ON "Treatment"("name", "category", "visitType");

-- CreateIndex
CREATE INDEX "idx_treatment_visit_treatment_id" ON "TreatmentVisit"("treatmentId");
