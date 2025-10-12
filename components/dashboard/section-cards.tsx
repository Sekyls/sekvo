"use client";
import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  IconCoins,
  IconDeviceFloppy,
  IconDownload,
  IconFilePlus,
  IconFileSpreadsheet,
  IconFileTypePdf,
  IconFileWord,
  IconLanguage,
  IconUpload,
} from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";
import { useRef } from "react";

function ExportDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <IconDownload stroke={2} className="size-5" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit" align="center">
        <DropdownMenuLabel className="font-semibold">
          Export invoice
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="mx-0.5 my-0" />

        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-x-0.5">
            Pdf <IconFileTypePdf stroke={2} className="size-5" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-x-0.5">
            Word <IconFileWord stroke={2} />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-x-0.5">
            Spreadsheet <IconFileSpreadsheet stroke={2} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SelectCurrency() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-fit justify-between"
        >
          {value ? (
            frameworks.find((framework) => framework.value === value)?.label
          ) : (
            <div className="flex gap-x-1.5 items-center">
              <IconCoins stroke={2} /> Currency
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandList>
            <CommandEmpty>Not found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

function SelectLanguage() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-fit justify-between"
        >
          {value ? (
            frameworks.find((framework) => framework.value === value)?.label
          ) : (
            <div className="flex items-center gap-x-1.5">
              <IconLanguage stroke={2} />
              Language
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandList>
            <CommandEmpty>Not found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default function SectionCards() {
  const fileUploadRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex gap-x-2 justify-between max-w-4xl">
      <Button className="w-fit gap-1">
        <IconFilePlus stroke={2} className="size-5" />
        New invoice
      </Button>
      <Button className="w-fit gap-1">
        <IconDeviceFloppy stroke={2} className="size-5" />
        Save invoice
      </Button>
      <ExportDropdownMenu />
      <Button
        className="w-fit gap-1"
        onClick={() => {
          fileUploadRef.current?.click();
        }}
      >
        <IconUpload stroke={2} />
        Import
        <Input ref={fileUploadRef} type="file" className="hidden" />
      </Button>
      <SelectCurrency />
      <SelectLanguage />
    </div>
  );
}
