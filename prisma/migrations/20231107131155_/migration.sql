-- AlterTable
ALTER TABLE "carts" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP,
ALTER COLUMN "modified_at" SET DATA TYPE TIMESTAMP;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP,
ALTER COLUMN "modified_at" SET DATA TYPE TIMESTAMP;