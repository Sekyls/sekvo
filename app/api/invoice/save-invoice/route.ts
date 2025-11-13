import { prisma } from "@/lib/clients/prisma";
import { InvoiceFormDataSchema } from "@/lib/miscellany/schema";
import { getBuffer } from "@/lib/miscellany/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default async function POST(request: Request) {
  try {
    const data = await request.formData();
    const formData: { [key: string]: any } = {};

    for (const [key, value] of data.entries()) {
      if (value instanceof File) {
        formData[key] = value;
      } else {
        try {
          formData[key] = JSON.parse(value);
        } catch {
          formData[key] = value;
        }
      }
    }

    const formDataValidation = InvoiceFormDataSchema.safeParse(formData);
    if (!formDataValidation.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 400,
            message: "Invalid form data",
            details: formDataValidation.error.message,
          },
        },
        { status: 400 }
      );
    }

    const {
      aggregateSubTotals,
      calculatedDiscount,
      calculatedTax,
      currency,
      dueDate,
      grandTotal,
      invoiceDate,
      invoiceItems,
      invoiceNumber,
      issuer,
      paymentMethods,
      recipientAddress,
      recipientName,
      utilisePercentDiscount,
      utilisePercentTax,
      utiliseTaxableShipping,
      customInvoiceFields,
      discount,
      issuerBrandLogo,
      notes,
      purchaseOrder,
      recipientContactPerson,
      recipientEmail,
      recipientPhoneNumber,
      shipping,
      tax,
      terms,
    } = formDataValidation.data;

    const userEmail = (await cookies()).get("email")?.value;
    if (!userEmail) throw new Error("Authentication failed");

    const user = await prisma.verifiedUsers.findUnique({
      where: { email: userEmail },
      select: { id: true },
    });
    if (!user) throw new Error("Authentication failed");

    const issuerBrandLogoBuffer = issuerBrandLogo
      ? await getBuffer(issuerBrandLogo)
      : undefined;
    const issuerSignature = await getBuffer(issuer.signature);

    // Transaction begins
    const { id } = await prisma.$transaction(async (client) => {
      const invoice = await client.invoices.create({
        data: {
          aggregateSubTotals,
          calculatedDiscount,
          calculatedTax,
          currency,
          dueDate,
          grandTotal,
          invoiceDate,
          invoiceNumber,
          recipientAddress,
          recipientName,
          utilisePercentDiscount,
          utilisePercentTax,
          utiliseTaxableShipping,
          customInvoiceFields,
          discount,
          issuerBrandLogo: issuerBrandLogoBuffer,
          notes,
          ownerID: user.id,
          purchaseOrder,
          recipientContactPerson,
          recipientEmail,
          recipientPhoneNumber,
          shipping,
          tax,
          terms,
        },
        select: { id: true },
      });

      await client.issuers.create({
        data: {
          name: issuer.name,
          role: issuer.role,
          signature: issuerSignature,
          relatedInvoiceID: invoice.id,
        },
      });

      for (const item of invoiceItems) {
        await client.invoiceItems.create({
          data: {
            currency: item.unitPrice.currency,
            item: item.item,
            quantity: item.quantity,
            subTotal: item.subTotal,
            unitPrice: item.unitPrice.price,
            description: item.description || undefined,
            relatedInvoiceID: invoice.id,
          },
        });
      }

      await client.paymentMethods.create({
        data: {
          atMoney: paymentMethods.atMoney,
          bankTransfer: paymentMethods.bankTransfer,
          cash: paymentMethods.cash,
          cheque: paymentMethods.cheque,
          mtnMobileMoney: paymentMethods.mtnMobileMoney,
          others: paymentMethods.others,
          paymentGateway: paymentMethods.paymentGateway,
          telecelCash: paymentMethods.telecelCash,
          relatedInvoiceID: invoice.id,
        },
      });
      return invoice;
    });
    // Transaction ends
    return NextResponse.json(
      {
        success: true,
        message: "Invoice saved succesfully",
        data: id,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 500,
          message: "Server or database error",
          details: error instanceof Error ? error.message : "Unknown error",
        },
      },
      { status: 500 }
    );
  }
}
