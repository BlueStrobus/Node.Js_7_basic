/*
  Warnings:

  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `player` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_userId_fkey`;

-- DropTable
DROP TABLE `order`;

-- DropTable
DROP TABLE `player`;

-- CreateTable
CREATE TABLE `players` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `speed` INTEGER NOT NULL,
    `shouting` INTEGER NOT NULL,
    `grade` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `players_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
