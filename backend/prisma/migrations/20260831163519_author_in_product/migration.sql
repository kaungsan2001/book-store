/*
  Warnings:

  - Added the required column `author` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "author" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "ProductImage" ADD COLUMN     "imageId" TEXT NOT NULL;
