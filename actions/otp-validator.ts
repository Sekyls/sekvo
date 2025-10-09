"use server";
import { prisma } from "@/lib/clients/prisma";
import { createHash } from "crypto";

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
      await prisma.pendingUsers.delete({ where: { id: pendingUser.id } });
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
