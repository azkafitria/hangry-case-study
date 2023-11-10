-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "status" VARCHAR(100) NOT NULL,
    "total" INTEGER NOT NULL,
    "created_at" DATE NOT NULL,
    "modified_at" DATE NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);
