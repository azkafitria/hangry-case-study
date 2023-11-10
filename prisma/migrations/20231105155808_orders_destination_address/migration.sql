/*
  Warnings:

  - Added the required column `destination_address` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "destination_address" VARCHAR(500) NOT NULL;
