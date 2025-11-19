"use server";
import { prisma } from "@/lib/clients/prisma";
import {
  CustomInvoiceFieldsType,
  PaymentMethodsType,
  RecipientContactPersonType,
} from "@/lib/misc/types";

export async function getInvoiceFromDB(id: string) {
  const data = await prisma.invoices.findUnique({
    where: { id },
    include: {
      invoiceItems: { omit: { id: true, relatedInvoiceID: true } },
      issuerRelation: { select: { name: true, role: true, signature: true } },
      ownerRelation: {
        omit: {
          createdAt: true,
          hashedPassword: true,
          id: true,
          updatedAt: true,
        },
      },
    },
    omit: { id: true, ownerID: true },
  });
  if (!data) {
    throw new Error("Invoice not found");
  }
  const {
    ownerRelation,
    issuerRelation,
    customInvoiceFields: untypedCustomInvoiceFields,
    invoiceItems,
    paymentMethods: untypedPaymentMethods,
    recipientContactPerson: untypedRecipientContactPerson,
    ...invoice
  } = data;

  const customInvoiceFields =
    untypedCustomInvoiceFields as CustomInvoiceFieldsType;
  const paymentMethods = untypedPaymentMethods as PaymentMethodsType;
  const recipientContactPerson =
    untypedRecipientContactPerson as RecipientContactPersonType;
  return {
    invoice,
    recipientContactPerson,
    ownerRelation,
    issuerRelation,
    customInvoiceFields,
    invoiceItems,
    paymentMethods,
  };
}
