/*
  Warnings:

  - You are about to drop the column `clasH_id` on the `ClashComments` table. All the data in the column will be lost.
  - You are about to drop the column `clasH_id` on the `ClashItem` table. All the data in the column will be lost.
  - Added the required column `clash_id` to the `ClashComments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clash_id` to the `ClashItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClashComments" DROP CONSTRAINT "ClashComments_clasH_id_fkey";

-- DropForeignKey
ALTER TABLE "ClashItem" DROP CONSTRAINT "ClashItem_clasH_id_fkey";

-- AlterTable
ALTER TABLE "ClashComments" DROP COLUMN "clasH_id",
ADD COLUMN     "clash_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ClashItem" DROP COLUMN "clasH_id",
ADD COLUMN     "clash_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ClashItem" ADD CONSTRAINT "ClashItem_clash_id_fkey" FOREIGN KEY ("clash_id") REFERENCES "Clash"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClashComments" ADD CONSTRAINT "ClashComments_clash_id_fkey" FOREIGN KEY ("clash_id") REFERENCES "Clash"("id") ON DELETE CASCADE ON UPDATE CASCADE;
