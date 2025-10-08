"use server";
import nodemailer from "nodemailer";
import { getSekvoOtpEmailHtml } from "./email-template";

export async function sendOTP(email: string, otp: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Sekvo" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Sekvo Verification Code",
      html: getSekvoOtpEmailHtml(otp),
    });
  } catch (error) {
    throw error;
  }
}
