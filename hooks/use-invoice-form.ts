"use client";

import { INVOICE_FORM_DEFAULTS } from "@/lib/misc/constants";
import { InvoiceFormSchema } from "@/lib/misc/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z4 from "zod/v4";

export default function useInvoiceForm() {
  const methods = useForm<z4.infer<typeof InvoiceFormSchema>>({
    resolver: zodResolver(InvoiceFormSchema),
    mode: "all",
    defaultValues: INVOICE_FORM_DEFAULTS,
  });
  return { ...methods };
}
