/*
  Warnings:

  - The primary key for the `Contact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Contact` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `name` on the `Contact` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(120)`.
  - You are about to alter the column `email` on the `Contact` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `phone` on the `Contact` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.
  - A unique constraint covering the columns `[email]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `Contact` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Contact` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(120),
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(25),
ADD CONSTRAINT "Contact_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_email_key" ON "Contact"("email");
