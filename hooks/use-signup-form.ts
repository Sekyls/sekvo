"use client";
import { signupFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function useSignupForm() {
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
    console.log(values);
    console.log("Logo:", values.logo);
    console.log("Logo instanceof File:", values.logo instanceof File);
    console.log("Logo name:", values.logo?.name);
    console.log("Logo size:", values.logo?.size);
    form.reset();
  };

  return { form, onSubmit };
}
