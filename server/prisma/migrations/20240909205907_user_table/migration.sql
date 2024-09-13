/*
  Warnings:

  - Changed the type of `expire_at` on the `Clash` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Clash" DROP COLUMN "expire_at",
ADD COLUMN     "expire_at" TIMESTAMP(3) NOT NULL;
