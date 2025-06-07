/*
  Warnings:

  - You are about to drop the `_staffDayOff` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_staffDayOff" DROP CONSTRAINT "_staffDayOff_A_fkey";

-- DropForeignKey
ALTER TABLE "_staffDayOff" DROP CONSTRAINT "_staffDayOff_B_fkey";

-- AlterTable
ALTER TABLE "DayOff" ADD COLUMN     "isDefault" BOOLEAN;

-- AlterTable
ALTER TABLE "_VendorStock" ADD CONSTRAINT "_VendorStock_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_VendorStock_AB_unique";

-- DropTable
DROP TABLE "_staffDayOff";

-- CreateTable
CREATE TABLE "_StaffDayOff" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_StaffDayOff_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_StaffDayOff_B_index" ON "_StaffDayOff"("B");

-- AddForeignKey
ALTER TABLE "_StaffDayOff" ADD CONSTRAINT "_StaffDayOff_A_fkey" FOREIGN KEY ("A") REFERENCES "DayOff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StaffDayOff" ADD CONSTRAINT "_StaffDayOff_B_fkey" FOREIGN KEY ("B") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;
