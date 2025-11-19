import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormattedCountDown(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const minutes = totalMinutes % 60;
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

export async function getBuffer(file: File) {
  const bytes = await file.arrayBuffer();
  return Buffer.from(bytes);
}

export function sanitiseJSON(obj: unknown) {
  return JSON.parse(JSON.stringify(obj));
}

export function uint8ArrayToDataURL(
  uint8: Uint8Array<ArrayBufferLike>,
  mime = "image/png"
) {
  const buffer = Buffer.from(uint8);
  const base64 = buffer.toString("base64");
  return `data:${mime};base64,${base64}`;
}
