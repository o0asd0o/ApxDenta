/*
  Warnings:

  - You are about to drop the column `staffId` on the `Treatment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Treatment" DROP CONSTRAINT "Treatment_staffId_fkey";

-- AlterTable
ALTER TABLE "Treatment" DROP COLUMN "staffId";

-- CreateTable
CREATE TABLE "_StaffAssignedTreatment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_StaffAssignedTreatment_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_StaffAssignedTreatment_B_index" ON "_StaffAssignedTreatment"("B");

-- AddForeignKey
ALTER TABLE "_StaffAssignedTreatment" ADD CONSTRAINT "_StaffAssignedTreatment_A_fkey" FOREIGN KEY ("A") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StaffAssignedTreatment" ADD CONSTRAINT "_StaffAssignedTreatment_B_fkey" FOREIGN KEY ("B") REFERENCES "Treatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
