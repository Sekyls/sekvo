"use client";
import { FieldNames } from "@/lib/miscellany/types";
import { useState } from "react";

export function useInvoiceDateHook() {
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date | undefined>(date);

  function isValidDate(date: Date | undefined) {
    if (!date) {
      return false;
    }
    return !isNaN(date.getTime());
  }
  return {
    open,
    setOpen,
    date,
    setDate,
    month,
    setMonth,
    isValidDate,
    label: "Invoice Date",
    fieldName: "invoiceDate" as FieldNames,
  };
}
