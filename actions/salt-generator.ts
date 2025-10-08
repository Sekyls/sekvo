"use server";
import { randomBytes } from "crypto";
export default async function saltGenerator() {
  return randomBytes(16).toString("hex").normalize();
}
