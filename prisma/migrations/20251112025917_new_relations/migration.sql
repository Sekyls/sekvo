-- AlterTable
ALTER TABLE "PendingUsers" ALTER COLUMN "expiresAt" SET DEFAULT (now()+ interval '2 minutes');

-- CreateTable
CREATE TABLE "Invoices" (
    "id" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "recipientAddress" TEXT NOT NULL,
    "recipientEmail" TEXT,
    "recipientContactPerson" JSONB,
    "recipientPhoneNumber" TEXT,
    "purchaseOrder" TEXT,
    "invoiceNumber" TEXT NOT NULL,
    "invoiceDate" TEXT NOT NULL,
    "dueDate" TEXT NOT NULL,
    "customInvoiceFields" JSONB,
    "notes" TEXT,
    "terms" TEXT,
    "issuerBrandLogo" BYTEA,
    "discount" TEXT,
    "tax" TEXT,
    "shipping" TEXT,
    "grandTotal" DECIMAL(10,2) NOT NULL,
    "aggregateSubTotals" DECIMAL(10,2) NOT NULL,
    "calculatedDiscount" DECIMAL(10,2) NOT NULL,
    "calculatedTax" DECIMAL(10,2) NOT NULL,
    "utilisePercentDiscount" BOOLEAN NOT NULL,
    "utilisePercentTax" BOOLEAN NOT NULL,
    "utiliseTaxableShipping" BOOLEAN NOT NULL,
    "currency" TEXT NOT NULL,
    "ownerID" TEXT NOT NULL,

    CONSTRAINT "Invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Issuers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "signature" BYTEA NOT NULL,
    "relatedInvoiceID" TEXT NOT NULL,

    CONSTRAINT "Issuers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceItems" (
    "id" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "unitPrice" TEXT NOT NULL,
    "subTotal" TEXT NOT NULL,
    "description" TEXT,
    "relatedInvoiceID" TEXT NOT NULL,

    CONSTRAINT "InvoiceItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethods" (
    "id" TEXT NOT NULL,
    "mtnMobileMoney" JSONB,
    "telecelCash" JSONB,
    "atMoney" JSONB,
    "bankTransfer" JSONB,
    "paymentGateway" JSONB,
    "others" JSONB,
    "cash" JSONB,
    "cheque" JSONB,
    "relatedInvoiceID" TEXT NOT NULL,

    CONSTRAINT "PaymentMethods_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Issuers_relatedInvoiceID_key" ON "Issuers"("relatedInvoiceID");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethods_relatedInvoiceID_key" ON "PaymentMethods"("relatedInvoiceID");

-- AddForeignKey
ALTER TABLE "Invoices" ADD CONSTRAINT "Invoices_ownerID_fkey" FOREIGN KEY ("ownerID") REFERENCES "VerifiedUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issuers" ADD CONSTRAINT "Issuers_relatedInvoiceID_fkey" FOREIGN KEY ("relatedInvoiceID") REFERENCES "Invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItems" ADD CONSTRAINT "InvoiceItems_relatedInvoiceID_fkey" FOREIGN KEY ("relatedInvoiceID") REFERENCES "Invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMethods" ADD CONSTRAINT "PaymentMethods_relatedInvoiceID_fkey" FOREIGN KEY ("relatedInvoiceID") REFERENCES "Invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
