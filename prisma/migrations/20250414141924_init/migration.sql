/*
  Warnings:

  - You are about to drop the column `Avarage_Rating` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `Total_Rating` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `Users_Rating` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "Avarage_Rating",
DROP COLUMN "Total_Rating",
DROP COLUMN "Users_Rating";

-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "ratingValue" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rating_roomId_userId_key" ON "Rating"("roomId", "userId");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
