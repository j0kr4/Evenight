/*
  Warnings:

  - You are about to drop the column `userId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Party` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fromUserId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toUserId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adressId` to the `Party` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Party` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Party` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `adressId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PartyType" AS ENUM ('LAN', 'PARTY', 'BOARD_GAME');

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_partyId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userId_fkey";

-- DropIndex
DROP INDEX "Comment_userId_idx";

-- DropIndex
DROP INDEX "Party_city_idx";

-- DropIndex
DROP INDEX "User_city_idx";

-- DropIndex
DROP INDEX "User_region_idx";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "userId",
ADD COLUMN     "fromUserId" TEXT NOT NULL,
ADD COLUMN     "toUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Party" DROP COLUMN "city",
ADD COLUMN     "adressId" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "PartyType" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "city",
DROP COLUMN "region",
ADD COLUMN     "adressId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Message";

-- CreateTable
CREATE TABLE "Adress" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,

    CONSTRAINT "Adress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Adress_city_idx" ON "Adress"("city");

-- CreateIndex
CREATE INDEX "Adress_region_idx" ON "Adress"("region");

-- CreateIndex
CREATE INDEX "Adress_country_idx" ON "Adress"("country");

-- CreateIndex
CREATE INDEX "Adress_zipCode_idx" ON "Adress"("zipCode");

-- CreateIndex
CREATE INDEX "Comment_fromUserId_idx" ON "Comment"("fromUserId");

-- CreateIndex
CREATE INDEX "Comment_toUserId_idx" ON "Comment"("toUserId");

-- CreateIndex
CREATE INDEX "Party_type_idx" ON "Party"("type");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "Adress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Party" ADD CONSTRAINT "Party_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "Adress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
