"use client";
import { SignupFormSchema } from "@/lib/miscellany/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import setPendingUser from "@/actions/db/set-pending-user";
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
    },
  });
  const onSubmit = async (values: z.infer<typeof SignupFormSchema>) => {
    if (!values) {
      return;
    }
    try {
      await setPendingUser(values);
      toastSuccess(`Check your email`, undefined, {
        label: "Success!",
        onClick: () =>
          router.push(
            `/auth/otp-verification?email=${values.email.replace(".com", "")}`
          ),
      });
      form.reset();
      router.push(
        `/auth/otp-verification?email=${values.email.replace(".com", "")}`
      );
    } catch (error) {
      toastError("Failed to sign you up", undefined, {
        label: "Retry",
        onClick: () => form.reset(),
      });
    }
  };

  return { form, onSubmit };
}
