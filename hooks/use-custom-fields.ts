"use client";

import { InvoiceFormSchema } from "@/lib/schema";
import { useEffect, useState } from "react";
import { Control, useFieldArray } from "react-hook-form";
import z4 from "zod/v4";

export default function useAddCustomFields(
  formControl: Control<z4.infer<typeof InvoiceFormSchema>>
) {
  const [showCustomFieldsLabel, setShowCustomFieldsLabel] =
    useState<boolean>(false);
  const { fields, append, remove } = useFieldArray({
    control: formControl,
    name: "customInvoiceFields",
  });
  useEffect(() => {
    if (fields.length < 1) {
      setShowCustomFieldsLabel(false);
    } else {
      setShowCustomFieldsLabel(true);
    }
  }, [fields]);
  return {
    showCustomFieldsLabel,
    setShowCustomFieldsLabel,
    fields,
    append,
    remove,
  };
}
