"use client";
import { logUserIn } from "@/actions/login-auth";
import { useRouter } from "next/navigation";
import { toastError, toastSuccess } from "@/lib/toast-config";
import { useState, FormEvent } from "react";

export default function useLoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = { email, password };
      console.log(formData);
      await logUserIn(formData);
      setIsLoading(false);
      toastSuccess("Login successful", undefined, {
        label: "Success",
        onClick() {
          router.replace("/create-invoice");
        },
      });
      router.replace("/create-invoice");
    } catch (error) {
      if (error instanceof Error) {
        toastError(error.message, undefined, {
          label: "Failed",
          onClick() {
            window.location.reload();
          },
        });
      }
    }
  };
  return {
    setIsLoading,
    handleSubmit,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
  };
}
