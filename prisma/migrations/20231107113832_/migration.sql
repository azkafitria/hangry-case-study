/*
  Warnings:

  - You are about to drop the column `created_at` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `modified_at` on the `order_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modified_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "total" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "created_at",
DROP COLUMN "modified_at";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'WAITING_CONFIRMATION',
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;
