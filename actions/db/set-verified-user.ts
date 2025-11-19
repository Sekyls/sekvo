"use server";

import z4 from "zod/v4";
import { otpValidator } from "@/actions/auth/otp";
import { OTPFormSchema } from "@/lib/misc/schema";
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
    const { address, hashedPassword, logo, id, name, phoneNumber, email } =
      await otpValidator(pin, formEmail);
    await prisma.verifiedUsers.create({
      data: {
        address,
        email,
        hashedPassword,
        name,
        phoneNumber,
        logo,
      },
    });
    await prisma.pendingUsers.delete({ where: { id } });
  } catch (error) {
    throw error;
  }
}
