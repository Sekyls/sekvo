"use server";
import { randomInt, createHash } from "crypto";
import { prisma } from "@/lib/clients/prisma";
import { sendOTP } from "../email/nodemailer";

export async function otpGenerator() {
  const otp = randomInt(100000, 999999).toString();
  const hashedOTP = createHash("sha256").update(otp).digest("hex");
  return { otp, hashedOTP };
}

export  async function resendOTP(email: string) {
  const { hashedOTP, otp } = await otpGenerator();
  await prisma.pendingUsers.update({
    where: { email },
    data: {
      hashedOTP,
      expiresAt: new Date(Date.now() + 1000 * 60 * 2).toISOString(),
    },
  });
  await sendOTP(email, otp);
}

export async function otpValidator(pin: string, email: string) {
  try {
    const hashedPin = createHash("sha256").update(pin).digest("hex");
    const pendingUser = await prisma.pendingUsers.findUnique({
      where: { email: email },
    });
    if (!pendingUser) {
      throw new Error("User not found");
    }
    if (pendingUser.expiresAt.getTime() < Date.now()) {
      throw new Error("OTP expired");
    }
    if (hashedPin !== pendingUser.hashedOTP) {
      throw new Error("Invalid OTP");
    }
    return pendingUser;
  } catch (error) {
    throw error;
  }
}
