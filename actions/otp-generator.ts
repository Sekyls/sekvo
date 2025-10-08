"use server";
import { randomInt, createHash } from "crypto";
export default async function otpGenerator() {
  const otp = randomInt(100000, 999999).toString();
  const hashedOTP = createHash("sha256").update(otp).digest("hex");
  return { otp, hashedOTP };
}
