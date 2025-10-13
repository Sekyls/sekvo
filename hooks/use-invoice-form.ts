"use client";

import { INVOICE_FORM_DEFAULTS } from "@/lib/constants";
import { InvoiceFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z4 from "zod/v4";

export default function useInvoiceForm() {
  const { handleSubmit, control, formState } = useForm<
    z4.infer<typeof InvoiceFormSchema>
  >({
    resolver: zodResolver(InvoiceFormSchema),
    mode: "onChange",
    defaultValues: INVOICE_FORM_DEFAULTS,
  });

  function onSubmit(data: z4.infer<typeof InvoiceFormSchema>) {}
  return { handleSubmit, control, formState, onSubmit };
}
