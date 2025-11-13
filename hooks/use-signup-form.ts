"use client";
import { SignupFormSchema } from "@/lib/miscellany/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { useRouter } from "next/navigation";
import { toastError, toastSuccess } from "@/lib/miscellany/toast-config";

export default function useSignupForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    mode: "all",
    defaultValues: {
      name: "",
      address: "",
      email: "",
      phoneNumber: "",
      password: { password: "", confirmPassword: "" },
      logo: undefined,
    },
  });
  const onSubmit = async (values: z.infer<typeof SignupFormSchema>) => {
    if (!values) {
      return;
    }

    try {
      const { password, ...rest } = values;
      const formdata = new FormData();
      Object.entries(rest).forEach(([key, value]) => {
        if (typeof value === "undefined") {
          return;
        }
        formdata.append(key, value);
      });

      formdata.append("password", password.password);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: formdata,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error?.message);
      }

      localStorage.setItem("email", values.email);
      toastSuccess(`Check your email`, undefined, {
        label: "Success!",
        onClick: () => router.push("/auth/otp-verification"),
      });
      form.reset();
      router.push("/auth/otp-verification");
    } catch (error) {
      toastError("Failed to sign you up", undefined, {
        label: "Retry",
        onClick: () => form.reset(),
      });
    }
  };

  return { form, onSubmit };
}
