/*
  Warnings:

  - You are about to drop the column `shouting` on the `players` table. All the data in the column will be lost.
  - Added the required column `shooting` to the `players` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAT` to the `players` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `players` DROP COLUMN `shouting`,
    ADD COLUMN `shooting` INTEGER NOT NULL,
    ADD COLUMN `updateAT` DATETIME(3) NOT NULL;
