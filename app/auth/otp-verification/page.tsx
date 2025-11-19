"use client";
import dynamic from "next/dynamic";
const InputOTPForm = dynamic(
  () => import("@/components/authentication/otp-input-form"),
  { ssr: false }
);

export default function page() {
  return <InputOTPForm />;
}
