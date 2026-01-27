/*
  Warnings:

  - The primary key for the `cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cart_totalprice` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `product_description` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `product_images` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `product_price` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `product_quantity` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `product_title` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `product_totalprice` on the `cart` table. All the data in the column will be lost.
  - Added the required column `productId` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Made the column `status` on table `cart` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "cart_product_title_key";

-- AlterTable
ALTER TABLE "cart" DROP CONSTRAINT "cart_pkey",
DROP COLUMN "cart_totalprice",
DROP COLUMN "product_description",
DROP COLUMN "product_id",
DROP COLUMN "product_images",
DROP COLUMN "product_price",
DROP COLUMN "product_quantity",
DROP COLUMN "product_title",
DROP COLUMN "product_totalprice",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "total" INTEGER NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT true,
ADD CONSTRAINT "cart_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "images" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "soldCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_title_key" ON "product"("title");

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
