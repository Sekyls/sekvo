import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormattedCountDown(milliseconds: number) {
  let totalSeconds = Math.floor(milliseconds / 1000);
  let totalMinutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  let minutes = totalMinutes % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function formatCalendarDate(date: Date | undefined) {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function getInvoiceNumber() {
  return Math.random()
    .toString(36)
    .substring(2, 2 + 6)
    .match(/.{1,2}/g)
    ?.join("-")
    .toLocaleUpperCase();
}
