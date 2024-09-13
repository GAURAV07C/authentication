-- CreateTable
CREATE TABLE "ClashItem" (
    "id" SERIAL NOT NULL,
    "clasH_id" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClashItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClashComments" (
    "id" SERIAL NOT NULL,
    "clasH_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClashComments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClashItem" ADD CONSTRAINT "ClashItem_clasH_id_fkey" FOREIGN KEY ("clasH_id") REFERENCES "Clash"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClashComments" ADD CONSTRAINT "ClashComments_clasH_id_fkey" FOREIGN KEY ("clasH_id") REFERENCES "Clash"("id") ON DELETE CASCADE ON UPDATE CASCADE;
