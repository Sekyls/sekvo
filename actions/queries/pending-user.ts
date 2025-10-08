"use server";
import { prisma } from "@/lib/clients/prisma";
import { SignupFormValues } from "@/lib/types";
import otpGenerator from "../otp-generator";
import saltGenerator from "../salt-generator";
import { passwordHasher } from "../password-hasher";
import sendOTPEmail from "../resend";

export default async function setPendingUser(data: SignupFormValues) {
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

  console.log("Unique Email");

  const salt = await saltGenerator();
  console.log("Salt created");
  const hashedPassword = await passwordHasher(data.password.password, salt);
  console.log("Password hashed");
  const { hashedOTP, otp } = await otpGenerator();
  console.log("otp created");

  if (data.logo) {
    console.log("Logo available");
    const logo = await convertToBuffer(data.logo);
    console.log("Logo Buffer created");
    const pendingUser = await prisma.pendingUsers.create({
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

    if (!pendingUser) {
      throw new Error("Could not set pending user");
    }
    console.log("Pending user created");
    sendOTPEmail(data.email, parseInt(otp));
    return data.email;
  } else {
    const pendingUser = await prisma.pendingUsers.create({
      data: {
        address: data.address,
        email: data.email,
        hashedOTP: hashedOTP,
        hashedPassword: hashedPassword,
        name: data.name,
        phoneNumber: data.phoneNumber,
      },
    });
    if (!pendingUser) {
      throw new Error("Could not set pending user");
    }
    console.log("Pending user created");
    sendOTPEmail(data.email, parseInt(otp));
    return data.email;
  }
}
