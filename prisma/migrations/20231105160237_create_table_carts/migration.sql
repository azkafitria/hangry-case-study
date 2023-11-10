-- CreateTable
CREATE TABLE "carts" (
    "id" SERIAL NOT NULL,
    "status" VARCHAR(100) NOT NULL,

    CONSTRAINT "carts_pkey" PRIMARY KEY ("id")
);
