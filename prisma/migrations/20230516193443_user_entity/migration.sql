/*
  Warnings:

  - You are about to drop the column `category` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `rating` table. All the data in the column will be lost.
  - You are about to drop the `book` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `author` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pdf` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `rating` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "rating" DROP CONSTRAINT "rating_bookId_fkey";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "category",
DROP COLUMN "content",
DROP COLUMN "image",
DROP COLUMN "published",
ADD COLUMN     "author" VARCHAR(255) NOT NULL,
ADD COLUMN     "pdf" TEXT NOT NULL,
ADD COLUMN     "thumbnail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "rating" DROP COLUMN "bookId",
ADD COLUMN     "postId" TEXT NOT NULL;

-- DropTable
DROP TABLE "book";

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
