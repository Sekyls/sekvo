"use client";
import { FormProvider } from "react-hook-form";
import useInvoiceForm from "@/hooks/use-invoice-form";
import { InvoiceFormProviderProps } from "@/lib/miscellany/types";

export default function InvoiceFormProvider({
  children,
}: InvoiceFormProviderProps) {
  const methods = useInvoiceForm();

  return <FormProvider {...methods}>{children}</FormProvider>;
}
