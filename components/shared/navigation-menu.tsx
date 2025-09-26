"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ModeToggle } from "../ui/mode-toggle";
import MobileMenu from "./menu-mobile";

export default function NavigationMenu() {
  const router = useRouter();
  return (
    <nav className="flex justify-between items-center flex-nowrap px-5 py-2 backdrop-blur-3xl dark:shadow-baby-powder/30 shadow-lg">
      <div className="flex gap-x-5 items-center">
        <Link href={"/"}>
          <Image src={"/logo.png"} alt="Sekvo" width={70} height={70} />
        </Link>
        <Link href={"/blog"}>Blog</Link>
        <Link href={"/pricing"}>Pricing</Link>
      </div>
      <div className="flex gap-x-5 items-center">
        <ModeToggle />
        <Link href={"/auth/login"}>Login</Link>
        <Button
          onClick={() => {
            router.push("/auth/signup");
          }}
          className="material-btn"
        >
          Get started
        </Button>
        <MobileMenu />
      </div>
    </nav>
  );
}
