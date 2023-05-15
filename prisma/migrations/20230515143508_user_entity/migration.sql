/*
  Warnings:

  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_bookId_fkey";

-- DropTable
DROP TABLE "Book";

-- DropTable
DROP TABLE "Rating";

-- CreateTable
CREATE TABLE "book" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "pdf" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rating" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
