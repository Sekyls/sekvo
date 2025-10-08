"use server";
import { Resend } from "resend";
import SekvoOTPEmail from "@/components/emails/sekvo-otp-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendOTPEmail(recipient: string, otp: number) {
  try {
    console.log("Sending Email...");
    const { data, error } = await resend.emails.send({
      from: "Sekvo <onboarding@resend.dev>",
      to: [recipient],
      subject: "Sekvo",
      react: SekvoOTPEmail({ otp: otp }),
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error("Error sending email");
    }
    console.log("Email sent");
    return data;
  } catch (error) {
    throw error;
  }
}
