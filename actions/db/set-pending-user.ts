"use server";
import { prisma } from "@/lib/clients/prisma";
import { otpGenerator } from "@/actions/auth/otp";
import argon2 from "argon2";
import { sendOTP } from "@/actions/email/nodemailer";
import { SignupFormSchema } from "@/lib/miscellany/schema";
import z4 from "zod/v4";

export default async function setPendingUser(
  data: z4.infer<typeof SignupFormSchema>
) {
  try {
    console.log("running");

    const { address, email, name, password, phoneNumber, logo } =
      await SignupFormSchema.parseAsync(data);
    async function convertToBuffer(file: File) {
      const arrayBuffer = await file.arrayBuffer();
      return Buffer.from(arrayBuffer);
    }

    const emailExist = await prisma.verifiedUsers.findUnique({
      where: { email: email },
    });
    if (emailExist) {
      throw new Error("Email already exist");
    }

    const hashedPassword = await argon2.hash(password.password);
    const { hashedOTP, otp } = await otpGenerator();

    if (logo) {
      const logoBuffer = await convertToBuffer(logo);
      await prisma.pendingUsers.create({
        data: {
          address,
          email,
          hashedOTP,
          hashedPassword,
          name,
          phoneNumber,
          logo: logoBuffer,
        },
      });

      await sendOTP(email, otp);
    } else {
      await prisma.pendingUsers.create({
        data: {
          address,
          email,
          hashedOTP,
          hashedPassword,
          name,
          phoneNumber,
        },
      });

      await sendOTP(email, otp);
    }
  } catch (error) {
    throw error;
  }
}
