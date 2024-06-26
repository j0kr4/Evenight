-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_adressId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "adressId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "Adress"("id") ON DELETE SET NULL ON UPDATE CASCADE;
