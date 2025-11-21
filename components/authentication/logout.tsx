"use client";
import { cn } from "@/lib/misc/utils";
import { Button } from "../ui/button";
import { toastError } from "@/lib/misc/toast-config";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function LogoutUser({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) {
  const router = useRouter();

  async function handleSignOut() {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "GET",
        credentials: "same-origin",
      });
      if (!response.ok) {
        toastError("Sign-out failed", undefined, {
          label: "Failed!",
          onClick() {},
        });
      }
      router.replace("/");
    } catch (error) {
      if (error instanceof Error) {
        toastError("Sign-out failed", undefined, {
          label: "Failed!",
          onClick() {},
        });
      }
    }
  }
  return (
    <Button
      onClick={handleSignOut}
      variant="outline"
      size="sm"
      className={cn("material-btn", className)}
    >
      Logout <IconLogout className={cn("stroke-2", iconClassName)} />
    </Button>
  );
}
