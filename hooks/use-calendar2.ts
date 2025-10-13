"use client";

import { formatCalendarDate } from "@/lib/utils";
import { useState } from "react";

export function useCalendarHook2() {
  const [isopen, setIsOpen] = useState<boolean>(false);
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(
    new Date()
  );
  const [calendarMonth, setCalendarMonth] = useState<Date | undefined>(
    calendarDate
  );
  const [calendarValue, setCalendarValue] = useState<string>(
    formatCalendarDate(calendarDate)
  );

  function isValidDate(date: Date | undefined) {
    if (!date) {
      return false;
    }
    return !isNaN(date.getTime());
  }
  return {
    isopen,
    setIsOpen,
    calendarDate,
    setCalendarDate,
    calendarMonth,
    setCalendarMonth,
    calendarValue,
    setCalendarValue,
    isValidDate,
  };
}
