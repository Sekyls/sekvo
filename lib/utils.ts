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
