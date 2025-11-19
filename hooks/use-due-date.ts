"use client";
import { FieldNames } from "@/lib/misc/types";
import { useState } from "react";

export function useDueDateHook() {
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
    label: "Due Date",
    fieldName: "dueDate" as FieldNames,
  };
}
