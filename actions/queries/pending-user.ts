"use server";
import { prisma } from "@/lib/clients/prisma";
import { SignupFormValues } from "@/lib/types";
import otpGenerator from "../otp-generator";
import saltGenerator from "../salt-generator";
import { passwordHasher } from "../password-hasher";
import { sendOTP } from "../nodemailer";

export default async function setPendingUser(data: SignupFormValues) {
  try {
    async function convertToBuffer(file: File) {
      const arrayBuffer = await file.arrayBuffer();
      return Buffer.from(arrayBuffer);
    }

    const emailExist = await prisma.verifiedUsers.findUnique({
      where: { email: data.email },
    });
    if (emailExist) {
      throw new Error("Email already exist");
    }

    const salt = await saltGenerator();
    const hashedPassword = await passwordHasher(data.password.password, salt);
    const { hashedOTP, otp } = await otpGenerator();

    if (data.logo) {
      const logo = await convertToBuffer(data.logo);
      await prisma.pendingUsers.create({
        data: {
          address: data.address,
          email: data.email,
          hashedOTP: hashedOTP,
          hashedPassword: hashedPassword,
          name: data.name,
          phoneNumber: data.phoneNumber,
          logo: logo,
        },
      });

      await sendOTP(data.email, otp);
    } else {
      await prisma.pendingUsers.create({
        data: {
          address: data.address,
          email: data.email,
          hashedOTP: hashedOTP,
          hashedPassword: hashedPassword,
          name: data.name,
          phoneNumber: data.phoneNumber,
        },
      });

      await sendOTP(data.email, otp);
    }
  } catch (error) {
    throw error;
  }
}
