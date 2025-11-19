"use client";
import { InvoiceFormSchema } from "@/lib/misc/schema";
import { useFieldArray, useFormContext } from "react-hook-form";
import z4 from "zod/v4";

export default function useInvoiceItems() {
  const { control, formState, watch } =
    useFormContext<z4.infer<typeof InvoiceFormSchema>>();

  const { fields, append, remove } = useFieldArray({
    name: "invoiceItems",
    control,
  });

  return {
    formState,
    watch,
    fields,
    append,
    remove,
  };
}
