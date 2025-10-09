"use client";
import { signupFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import setPendingUser from "@/actions/set-pending-user";
import { toastError, toastSuccess } from "@/lib/toast-config";

export default function useSignupForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    mode: "all",
    defaultValues: {
      name: "",
      address: "",
      email: "",
      phoneNumber: "",
      password: { password: "", confirmPassword: "" },
    },
  });
  const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
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
