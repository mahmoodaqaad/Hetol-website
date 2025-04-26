-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('Single', 'Double', 'Deluxe', 'Other');

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "roomType" "RoomType" NOT NULL DEFAULT 'Single';
