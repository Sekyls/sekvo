"use client";

import { OTPFormSchema } from "@/lib/misc/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod/v4";
import { useRouter } from "next/navigation";
import { toastError, toastSuccess } from "@/lib/misc/toast-config";
import { resendOTP } from "@/actions/auth/otp";
import { useState } from "react";
import setVerifiedUser from "@/actions/db/set-verified-user";

export default function useOTPForm() {
  const router = useRouter();
  const [resendingOTP, setResendingOTP] = useState<boolean>(false);
  const otpForm = useForm<z.infer<typeof OTPFormSchema>>({
    resolver: zodResolver(OTPFormSchema),
    mode: "all",
    defaultValues: {
      pin: "",
    },
  });
  const email = localStorage.getItem("email");

  async function onSubmit(data: z.infer<typeof OTPFormSchema>) {
    try {
      if (email) {
        await setVerifiedUser(data, email);
        toastSuccess("Verfication succesful", undefined, {
          label: "Verified",
          onClick: () => {
            router.replace("/auth/login");
          },
        });
        localStorage.removeItem("email");
        otpForm.reset();
        router.replace("/auth/login");
      }
    } catch (error) {
      if (error instanceof Error) {
        toastError(error.message, undefined, {
          label: "Inavlid",
          onClick() {
            otpForm.reset();
          },
        });
        otpForm.reset();
      }
    }
  }

  async function handleOTPResend() {
    try {
      if (email) {
        await resendOTP(email);
        toastSuccess("OTP has been resent", undefined, {
          label: "Resent",
          onClick: () => {
            window.location.reload();
          },
        });
        window.location.reload();
      }
    } catch (error) {
      if (error instanceof Error) {
        toastError("Internal server error", undefined, {
          label: "Forbidden",
          onClick() {},
        });
      }
    }
  }

  return {
    otpForm,
    onSubmit,
    email,
    resendingOTP,
    setResendingOTP,
    handleOTPResend,
  };
}
