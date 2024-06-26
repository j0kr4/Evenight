-- CreateEnum
CREATE TYPE "PartyType" AS ENUM ('LAN', 'PARTY', 'BOARD_GAME');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "adressId" TEXT NOT NULL,
    "passwordHash" TEXT,
    "passwordSalt" TEXT,
    "image" TEXT,
    "age" INTEGER,
    "interests" TEXT[],
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Party" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "PartyType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "adressId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "availableSeats" INTEGER NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "place" INTEGER NOT NULL,
    "price" DOUBLE PRECISION,
    "organizerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bringSnacks" BOOLEAN NOT NULL DEFAULT false,
    "bringDrinks" BOOLEAN NOT NULL DEFAULT false,
    "bringDrinksAlcool" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Party_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartyParticipant" (
    "partyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PartyParticipant_pkey" PRIMARY KEY ("partyId","userId")
);

-- CreateTable
CREATE TABLE "BoardGame" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "partyId" TEXT NOT NULL,

    CONSTRAINT "BoardGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoGame" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "partyId" TEXT NOT NULL,

    CONSTRAINT "VideoGame_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,
    "partyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");

-- CreateIndex
CREATE INDEX "Party_type_idx" ON "Party"("type");

-- CreateIndex
CREATE INDEX "Party_date_idx" ON "Party"("date");

-- CreateIndex
CREATE INDEX "Party_createdAt_idx" ON "Party"("createdAt");

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
CREATE INDEX "Comment_partyId_idx" ON "Comment"("partyId");

-- CreateIndex
CREATE INDEX "Comment_createdAt_idx" ON "Comment"("createdAt");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "VerificationToken_identifier_idx" ON "VerificationToken"("identifier");

-- CreateIndex
CREATE INDEX "VerificationToken_expires_idx" ON "VerificationToken"("expires");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "Adress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Party" ADD CONSTRAINT "Party_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Party" ADD CONSTRAINT "Party_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "Adress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartyParticipant" ADD CONSTRAINT "PartyParticipant_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartyParticipant" ADD CONSTRAINT "PartyParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardGame" ADD CONSTRAINT "BoardGame_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoGame" ADD CONSTRAINT "VideoGame_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
