/*
  Warnings:

  - Made the column `note` on table `EmotionTracker` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EmotionTracker" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "note" SET NOT NULL,
ALTER COLUMN "note" SET DEFAULT '';
