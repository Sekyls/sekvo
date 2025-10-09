"use server";

import z4 from "zod/v4";
import { otpValidator } from "./otp-validator";
import { OTPFormSchema } from "@/lib/schema";
import { prisma } from "@/lib/clients/prisma";

export default async function setVerifiedUser(
  data: z4.infer<typeof OTPFormSchema>,
  formEmail: string
) {
  try {
    if (!data || !formEmail) {
      throw new Error("Inavalid credentials");
    }
    const { pin } = await OTPFormSchema.parseAsync(data);
    const {
      address,
      hashedPassword,
      logo,
      id,
      name,
      phoneNumber,
      email,
      passwordSalt,
    } = await otpValidator(pin, formEmail);
    await prisma.verifiedUsers.create({
      data: {
        address,
        email,
        hashedPassword,
        name,
        passwordSalt,
        phoneNumber,
        logo,
      },
    });
    await prisma.pendingUsers.delete({ where: { id } });
  } catch (error) {
    throw error;
  }
}
