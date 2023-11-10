/*
  Warnings:

  - Made the column `menu_id` on table `cart_items` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_menu_id_fkey";

-- AlterTable
ALTER TABLE "cart_items" ALTER COLUMN "menu_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
