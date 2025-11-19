import { prisma } from "@/lib/clients/prisma";
import { InvoiceFormDataSchema } from "@/lib/misc/schema";
import { getBuffer, sanitiseJSON } from "@/lib/misc/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const rawFormData = await request.formData();
    const formData: { [key: string]: any } = {};

    for (const [key, value] of rawFormData.entries()) {
      if (value instanceof File) {
        if (value.size > 0) {
          formData[key] = value;
        }
        continue;
      }

      if (
        value === "" ||
        value === "undefined" ||
        value === "null" ||
        value === "{}" ||
        value === "[null]" ||
        value === '""'
      ) {
        continue;
      }

      try {
        formData[key] = JSON.parse(value);
      } catch {
        formData[key] = value;
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
      issuerSignature,
    } = formDataValidation.data;

    const userEmail = (await cookies()).get("email")?.value;
    if (!userEmail) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 401,
            message: "Authentication required or failed.",
            details: "Please log in",
          },
        },
        { status: 401 }
      );
    }
    const user = await prisma.verifiedUsers.findUnique({
      where: { email: userEmail },
      select: { id: true },
    });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 401,
            message: "Authentication required or failed.",
            details: "Please log in",
          },
        },
        { status: 401 }
      );
    }

    const issuerBrandLogoBuffer = issuerBrandLogo
      ? await getBuffer(issuerBrandLogo)
      : undefined;
    const issuerSignatureBuffer = await getBuffer(issuerSignature);

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
          paymentMethods: sanitiseJSON(paymentMethods),
        },
        select: { id: true },
      });

      await client.issuers.create({
        data: {
          name: issuer.name,
          role: issuer.role,
          signature: issuerSignatureBuffer,
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

      return invoice;
    });
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
