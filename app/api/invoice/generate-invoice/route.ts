import getVerifiedUser from "@/actions/db/get-verified-user";
import { InvoiceFormDataSchema } from "@/lib/miscellany/schema";

export async function POST(req: Request) {
  try {
    const parsedInvoiceFormData = await InvoiceFormDataSchema.parseAsync(
      req.body
    );
    const user = await getVerifiedUser();
    const invoiceTemplateData = { ...parsedInvoiceFormData, ...user };
  } catch (error) {}
}
