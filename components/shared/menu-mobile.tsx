"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogIn, MousePointer2, Pencil, UserRoundPlus } from "lucide-react";
import { cn } from "@/lib/misc/utils";
import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";
import LogoutUser from "../authentication/logout";
import { useAuth } from "@/providers/authentication-provider";

export default function MobileMenu() {
  const { loggedIn, user } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full size-10 material-btn">
          <Avatar>
            {loggedIn && user?.logo && <AvatarImage src={user?.logo || ""} />}
            {!user?.logo && (
              <AvatarFallback className="primary-gradient text-white">
                {loggedIn ? (
                  user?.name.trim().charAt(0)
                ) : (
                  <UserRoundPlus className="stroke-3" />
                )}
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-50 max-w-sm"
        alignOffset={1}
        sideOffset={8}
        align="end"
      >
        <DropdownMenuLabel className="font-bold font-space-grotesk text-base flex  items-center justify-between py-0.5">
          {loggedIn ? user?.name : "Guest"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className={cn(loggedIn ? "" : "hidden")}>
          <DropdownMenuItem>{user?.email}</DropdownMenuItem>
          <DropdownMenuItem>{user?.phoneNumber}</DropdownMenuItem>
          <DropdownMenuItem>{user?.address}</DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuGroup>
        <DropdownMenuGroup className="space-y-2 pl-2 font-medium sm:hidden">
          <Link
            href={"/auth/signup"}
            className="hover:underline decoration-2 underline-offset-8 decoration-red-700/70 text-sm flex items-center gap-x-2"
          >
            Get started{" "}
            <MousePointer2
              size={16}
              className="rotate-90 -mt-0.5 text-amber-600"
            />
          </Link>
          <Link
            href={"/dashboard"}
            className="hover:underline decoration-2 underline-offset-8 decoration-amber-500 flex items-center gap-x-2 text-sm"
          >
            Create Invoice <Pencil size={16} className="-mt-1 text-amber-600" />
          </Link>
          <DropdownMenuSeparator />
        </DropdownMenuGroup>
        {loggedIn ? (
          <div className="flex justify-between items-center">
            <LogoutUser className="bg-transparent! text-red-500! shadow-none!" />
            <ModeToggle className="size-6! sm:hidden" />
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <Link
              href={"/auth/login"}
              className={
                "hover:underline decoration-2 underline-offset-8 decoration-amber-700 text-sm flex gap-x-2 items-center pl-2 font-medium"
              }
            >
              Login
              <LogIn size={16} className="text-green-600 stroke-2" />
            </Link>
            <ModeToggle className="size-6! sm:hidden" />
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
