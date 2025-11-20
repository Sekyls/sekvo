-- DropForeignKey
ALTER TABLE "public"."Invoices" DROP CONSTRAINT "Invoices_ownerID_fkey";

-- AlterTable
ALTER TABLE "PendingUsers" ALTER COLUMN "expiresAt" SET DEFAULT (now()+ interval '2 minutes');

-- AddForeignKey
ALTER TABLE "Invoices" ADD CONSTRAINT "Invoices_ownerID_fkey" FOREIGN KEY ("ownerID") REFERENCES "VerifiedUsers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
