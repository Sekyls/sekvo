import { otpGenerator } from "@/actions/auth/otp";
import { sendOTP } from "@/actions/email/nodemailer";
import { prisma } from "@/lib/clients/prisma";
import { SignupFormDataSchema } from "@/lib/miscellany/schema";
import { getBuffer } from "@/lib/miscellany/utils";
import argon2 from "argon2";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data: { [key: string]: string | File | undefined } = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    const cleanedData = SignupFormDataSchema.safeParse(data);
    if (!cleanedData.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 400,
            message: "Inavlid signup credentials",
            details: cleanedData.error.message,
          },
        },
        { status: 400 }
      );
    }

    const { address, email, name, password, phoneNumber, logo } =
      cleanedData.data;

    let processedLogo: Buffer | undefined;
    if (logo) {
      processedLogo = await getBuffer(logo);
    }

    const emailExist = await prisma.verifiedUsers.findUnique({
      where: { email: email },
      select: { email: true },
    });

    if (emailExist) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 400,
            message: "Email already exist",
            details: "Try using a different email address",
          },
        },
        { status: 400 }
      );
    }

    const hashedPassword = await argon2.hash(password);

    const { hashedOTP, otp } = await otpGenerator();

    await prisma.pendingUsers.create({
      data: {
        address,
        email,
        hashedOTP,
        hashedPassword,
        name,
        phoneNumber,
        logo: processedLogo,
      },
    });

    await sendOTP(email, otp);

    return NextResponse.json(
      {
        success: true,
        data: null,
        message: "OTP sent",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      NextResponse.json(
        {
          success: false,
          error: { code: 500, message: error.message, details: error.stack },
        },
        { status: 500 }
      );
    }
  }
}
