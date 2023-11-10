-- CreateTable
CREATE TABLE "menus" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "price" INTEGER NOT NULL,
    "image" VARCHAR(500) NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "availability" INTEGER NOT NULL,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);
