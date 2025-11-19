"use client";
import { useRouter } from "next/navigation";
import { toastError, toastSuccess } from "@/lib/misc/toast-config";
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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "same-origin",
      });
      const data: { success: boolean; status: number; error: string | null } =
        await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.error || "Internal server error");
      }
      toastSuccess("Login successful", undefined, {
        label: "Success!",
        onClick() {
          router.replace("/dashboard");
        },
      });
      setIsLoading(false);

      router.replace("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toastError(error.message, undefined, {
          label: "Failed!",
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
