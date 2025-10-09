"use client";

import { OTPFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod/v4";
import { useRouter, useSearchParams } from "next/navigation";
import { toastError, toastSuccess } from "@/lib/toast-config";
import resendOTP from "@/actions/otp-regenerator";
import { useState } from "react";
import setVerifiedUser from "@/actions/set-verified-user";

export default function useOTPForm() {
  const router = useRouter();
  const [resendingOTP, setResendingOTP] = useState<boolean>(false);
  const email = useSearchParams().get("email") + ".com";
  const otpForm = useForm<z.infer<typeof OTPFormSchema>>({
    resolver: zodResolver(OTPFormSchema),
    mode: "onBlur",
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof OTPFormSchema>) {
    try {
      await setVerifiedUser(data, email);
      toastSuccess("Verfication succesful", undefined, {
        label: "Verified",
        onClick: () => {
          router.replace("/auth/login");
        },
      });
      otpForm.reset();
      router.replace("/auth/login");
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
      await resendOTP(email);
      toastSuccess("OTP has been resent", undefined, {
        label: "Resent",
        onClick: () => {
          window.location.reload();
        },
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      if (error instanceof Error) {
        toastError("Internal server error", undefined, {
          label: "Forbidden",
          onClick() {},
        });
        setTimeout(() => {
          window.location.reload();
        }, 5000);
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
