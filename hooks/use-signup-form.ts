"use client";
import { signupFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import setPendingUser from "@/actions/queries/pending-user";

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
  const onSubmit = (values: z.infer<typeof signupFormSchema>) => {
    if (!values) {
      return;
    }
    setPendingUser(values)
      .then(() => {
        toast.success(`OTP code sent to ${values.email}`);
        router.push(
          `/auth/otp-verification?email=${values.email.replace(".com", "")}`
        );
        form.reset();
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  return { form, onSubmit };
}
