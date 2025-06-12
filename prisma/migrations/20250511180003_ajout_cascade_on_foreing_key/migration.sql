-- DropForeignKey
ALTER TABLE "InformationCategory" DROP CONSTRAINT "InformationCategory_informationId_fkey";

-- AddForeignKey
ALTER TABLE "InformationCategory" ADD CONSTRAINT "InformationCategory_informationId_fkey" FOREIGN KEY ("informationId") REFERENCES "Information"("id") ON DELETE CASCADE ON UPDATE CASCADE;
