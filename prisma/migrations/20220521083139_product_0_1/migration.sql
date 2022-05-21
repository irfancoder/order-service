/*
  Warnings:

  - You are about to drop the column `productId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `price_myr` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_productId_fkey`;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `productId`;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `price_myr` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `_OrderToProduct` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_OrderToProduct_AB_unique`(`A`, `B`),
    INDEX `_OrderToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_OrderToProduct` ADD CONSTRAINT `_OrderToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToProduct` ADD CONSTRAINT `_OrderToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
