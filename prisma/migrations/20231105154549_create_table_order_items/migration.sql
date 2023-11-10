-- CreateTable
CREATE TABLE "order_items" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "price" INTEGER NOT NULL,
    "image" VARCHAR(500) NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "notes" VARCHAR(100),
    "created_at" DATE NOT NULL,
    "modified_at" DATE NOT NULL,
    "order_id" INTEGER NOT NULL,
    "menu_id" INTEGER NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
