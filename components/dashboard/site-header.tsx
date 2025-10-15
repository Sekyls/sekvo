"use client";
import { IconLogout } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { ModeToggle } from "../ui/mode-toggle";
import Link from "next/link";
import Image from "next/image";
import { toastError } from "@/lib/miscellany/toast-config";
import { useRouter } from "next/navigation";

export function SiteHeader() {
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
    <header
      className="flex h-(--header-height) shrink-0 items-center gap-2 justify-between border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) p-2
       sticky top-0 backdrop-blur-xl z-[100]"
    >
      <Link href={"/"} className="flex items-center gap-2">
        <h3 className="bg-clip-text text-5xl font-extrabold text-transparent bg-[linear-gradient(135deg,_#e91e63_0%,_#ff5722_50%,_#ff9800_100%)]">
          Dashboard{" "}
        </h3>
        <Image
          src={"/logo.png"}
          alt="Sekvo"
          width={40}
          height={40}
          className="hidden sm:block"
        />
      </Link>
      <div className="ml-auto flex gap-x-3 items-center">
        <div className="hidden sm:block">
          <ModeToggle />
        </div>
        <Button
          onClick={handleSignOut}
          variant="outline"
          size="sm"
          className="material-btn hidden sm:flex"
        >
          Logout <IconLogout stroke={2} />
        </Button>
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-5 primary-gradient w-0.5!"
        />
        <SidebarTrigger className="ml-auto rotate-180 primary-gradient shadow-[0_4px_6px_rgba(0,_0,_0,_0.17),_0_8px_12px_rgba(0,_0,_0,_0.17)] text-white hover:text-white" />
      </div>
    </header>
  );
}
