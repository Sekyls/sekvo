"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/misc/utils";

export function ModeToggle({ className }: { className?: string }) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "primary-gradient focus-visible:ring-0 border-0 size-8 sm:size-9",
            className
          )}
        >
          <Sun className="size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 icon text-white stroke-3" />
          <Moon className="absolute size-[1.2rem] stroke-3 text-white scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 icon" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" sideOffset={5}>
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="hover:bg-[linear-gradient(135deg,#e91e63_0%,#ff5722_50%,#ff9800_100%)] hover:text-white!"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="hover:bg-[linear-gradient(135deg,#e91e63_0%,#ff5722_50%,#ff9800_100%)] hover:text-white!"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="hover:bg-[linear-gradient(135deg,#e91e63_0%,#ff5722_50%,#ff9800_100%)] hover:text-white!"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
