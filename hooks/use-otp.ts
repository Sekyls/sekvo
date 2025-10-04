"use client";

import { OTPFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const otpForm = useForm<z.infer<typeof OTPFormSchema>>({
  resolver: zodResolver(OTPFormSchema),
  defaultValues: {
    pin: "",
    },
  
});
