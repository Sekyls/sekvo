"use server";
import { prisma } from "@/lib/clients/prisma";
import { OTPFormSchema } from "@/lib/schema";
import { createHash } from "crypto";
import z from "zod/v4";

export async function otpValidator(
  data: z.infer<typeof OTPFormSchema>,
  email: string
) {
  try {
    if (!data || !email) {
      throw new Error("Inavalid credentials");
    }
    const { pin } = await OTPFormSchema.parseAsync(data);
    const hashedPin = createHash("sha256").update(pin).digest("hex");
    const pendingUser = await prisma.pendingUsers.findUnique({
      where: { email: email },
      select: { hashedOTP: true, expiresAt: true, id: true },
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
  } catch (error) {
    throw error;
  }
}
