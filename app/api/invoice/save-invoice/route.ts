import { InvoiceFormDataSchema } from "@/lib/miscellany/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const invoice = InvoiceFormDataSchema.safeParse(request.json());
  if (!invoice.success) {
    return NextResponse.json({});
    }
    
}
