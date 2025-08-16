-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "avatarId" TEXT;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
