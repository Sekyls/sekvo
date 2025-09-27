import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { ModeToggle } from "../ui/mode-toggle";
import MobileMenu from "./menu-mobile";

export default function NavigationMenu() {
  return (
    <nav className="flex justify-between items-center flex-nowrap px-5 py-2 backdrop-blur-sm dark:shadow-baby-powder/30 shadow-lg w-full fixed top-0 z-50">
      <div className="flex gap-x-5 items-center">
        <Link href={"/"}>
          <Image src={"/logo.png"} alt="Sekvo" width={70} height={70} />
        </Link>
        <Link href={"/blog"} className="hidden md:block">
          Blog
        </Link>
        <Link href={"/pricing"} className="hidden md:block">
          Pricing
        </Link>
      </div>
      <div className="flex gap-x-5 items-center">
        <Link href={"/auth/login"} className="hidden md:block">
          Login
        </Link>
        <Button className="material-btn hidden md:flex">
          <Link href={"/auth/signup"} className="text-base">
            Get started
          </Link>
        </Button>
        <ModeToggle />
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
