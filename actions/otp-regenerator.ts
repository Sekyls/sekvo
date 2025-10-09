"use server";

import { prisma } from "@/lib/clients/prisma";
import otpGenerator from "./otp-generator";
import { sendOTP } from "./nodemailer";

export default async function resendOTP(email: string) {
  const { hashedOTP, otp } = await otpGenerator();
  await prisma.pendingUsers.update({
    where: { email },
    data: {
      hashedOTP,
    },
  });
  await sendOTP(email, otp);
}
