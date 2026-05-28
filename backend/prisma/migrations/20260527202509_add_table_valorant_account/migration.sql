/*
  Warnings:

  - You are about to drop the column `level` on the `ValorantStats` table. All the data in the column will be lost.
  - You are about to drop the column `losses` on the `ValorantStats` table. All the data in the column will be lost.
  - You are about to drop the column `peakRank` on the `ValorantStats` table. All the data in the column will be lost.
  - You are about to drop the column `rank` on the `ValorantStats` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ValorantStats` table. All the data in the column will be lost.
  - You are about to drop the column `wins` on the `ValorantStats` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[valorantAccountId]` on the table `ValorantStats` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `valorantAccountId` to the `ValorantStats` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ValorantStats" DROP CONSTRAINT "ValorantStats_userId_fkey";

-- DropIndex
DROP INDEX "ValorantStats_userId_key";

-- AlterTable
ALTER TABLE "ValorantStats" DROP COLUMN "level",
DROP COLUMN "losses",
DROP COLUMN "peakRank",
DROP COLUMN "rank",
DROP COLUMN "userId",
DROP COLUMN "wins",
ADD COLUMN     "headshotPercent" DOUBLE PRECISION,
ADD COLUMN     "kdRatio" DOUBLE PRECISION,
ADD COLUMN     "totalAssists" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalDeaths" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalKills" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "valorantAccountId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ValorantAccount" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "rank" TEXT,
    "peakRank" TEXT,
    "level" INTEGER,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ValorantAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ValorantAccount_username_tag_key" ON "ValorantAccount"("username", "tag");

-- CreateIndex
CREATE UNIQUE INDEX "ValorantStats_valorantAccountId_key" ON "ValorantStats"("valorantAccountId");

-- AddForeignKey
ALTER TABLE "ValorantAccount" ADD CONSTRAINT "ValorantAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValorantStats" ADD CONSTRAINT "ValorantStats_valorantAccountId_fkey" FOREIGN KEY ("valorantAccountId") REFERENCES "ValorantAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
