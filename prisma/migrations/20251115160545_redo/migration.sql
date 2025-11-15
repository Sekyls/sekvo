/*
  Warnings:

  - You are about to drop the `PaymentMethods` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `paymentMethods` to the `Invoices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."PaymentMethods" DROP CONSTRAINT "PaymentMethods_relatedInvoiceID_fkey";

-- AlterTable
ALTER TABLE "Invoices" ADD COLUMN     "paymentMethods" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "PendingUsers" ALTER COLUMN "expiresAt" SET DEFAULT (now()+ interval '2 minutes');

-- DropTable
DROP TABLE "public"."PaymentMethods";
