"use server";
import { prisma } from "@/lib/clients/prisma";
import otpGenerator from "./otp-generator";
import saltGenerator from "./salt-generator";
import { passwordHasher } from "./password-hasher";
import { sendOTP } from "./nodemailer";
import { signupFormSchema } from "@/lib/schema";
import z4 from "zod/v4";

export default async function setPendingUser(
  data: z4.infer<typeof signupFormSchema>
) {
  try {
    const pendingUser = await signupFormSchema.parseAsync(data);
    async function convertToBuffer(file: File) {
      const arrayBuffer = await file.arrayBuffer();
      return Buffer.from(arrayBuffer);
    }

    const emailExist = await prisma.verifiedUsers.findUnique({
      where: { email: pendingUser.email },
    });
    if (emailExist) {
      throw new Error("Email already exist");
    }

    const salt = await saltGenerator();
    const { hashedPassword, passwordSalt } = await passwordHasher(
      pendingUser.password.password,
      salt
    );
    const { hashedOTP, otp } = await otpGenerator();

    if (pendingUser.logo) {
      const logo = await convertToBuffer(pendingUser.logo);
      await prisma.pendingUsers.create({
        data: {
          address: pendingUser.address,
          email: pendingUser.email,
          hashedOTP,
          hashedPassword,
          passwordSalt,
          name: pendingUser.name,
          phoneNumber: pendingUser.phoneNumber,
          logo,
        },
      });

      await sendOTP(pendingUser.email, otp);
    } else {
      await prisma.pendingUsers.create({
        data: {
          address: pendingUser.address,
          email: pendingUser.email,
          hashedOTP,
          hashedPassword,
          passwordSalt,
          name: pendingUser.name,
          phoneNumber: pendingUser.phoneNumber,
        },
      });

      await sendOTP(data.email, otp);
    }
  } catch (error) {
    throw error;
  }
}
