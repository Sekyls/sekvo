"use client";

import { formatCalendarDate } from "@/lib/miscellany/utils";
import { useState } from "react";

export function useInvoiceDateHook() {
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date | undefined>(date);
  const [value, setValue] = useState<string>(formatCalendarDate(date));

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
    value,
    setValue,
    isValidDate,
    label: "Invoice Date",
    id: "invoiceDate",
  };
}
