"use client";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "../ui/mode-toggle";
import MobileMenu from "./menu-mobile";
import { useAuth } from "@/providers/authentication-provider";

export default function NavigationMenu() {
  const { loggedIn, user } = useAuth();
  return (
    <nav className="flex justify-between items-center flex-nowrap px-5 py-2 backdrop-blur-sm dark:shadow-baby-powder/10 shadow-sm w-full fixed top-0 z-50 rounded-b-xl">
      <div className="flex gap-x-5 items-center">
        <Link href={"/"}>
          <Image src={"/logo.png"} alt="Sekvo" width={70} height={70} />
        </Link>
      </div>
      <div className="hidden sm:flex gap-x-10 font-bold primary-gradient-text">
        <Link
          href={"/auth/signup"}
          className="hover:underline decoration-2 underline-offset-8 decoration-red-700/70"
        >
          Get started
        </Link>
        <Link
          href={"/dashboard"}
          className="hover:underline decoration-2 underline-offset-8 decoration-amber-500"
        >
          Create Invoice
        </Link>
      </div>
      <div className="flex gap-x-5 items-center">
        <div className="hidden sm:block">
          <ModeToggle />
        </div>
        <MobileMenu />
      </div>
    </nav>
  );
}
