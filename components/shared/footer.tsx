import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FOOTER_LINKS } from "@/lib/misc/constants";

export default function Footer() {
  return (
    <footer className="px-5 grid md:grid-cols-[400px_1fr] gap-y-7 gap-x-5 lg:gap-x-20 xl:gap-x-36 justify-between sm:justify-items-center py-10 bg-accent dark:bg-transparent dark:shadow-sm dark:shadow-baby-powder/40 rounded-t-4xl text-white">
      {/* First Column */}
      <div className="space-y-4">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            alt="sekvo"
            width={70}
            height={70}
            className="mx-auto sm:mx-0 rounded-2x bg-white dark:rounded-none dark:bg-transparent"
          />
        </Link>
        <p className="text-base! mt-2">
          With Sekvo, creating and managing invoices is fast, professional, and
          stress-free.
        </p>
        <p className="text-base! hidden sm:block">
          Copyright &copy; {new Date().getFullYear()} - All rights reserved
        </p>
        <div className="hidden sm:flex gap-x-2.5 items-center">
          <Avatar className="border border-red-500 bg-white size-12 pt-0.5 pl-1">
            <AvatarImage src="/ceo.png" className="object-cover grayscale" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <p className="text-base!">
            Hey there! I&apos;m{" "}
            <a
              href="www.linkedin.com/in/sekyls

"
              target="_blank"
              rel="noreferrer noopener"
              className="font-bold underline underline-offset-2"
            >
              Sekyi
            </a>
            , the creator of Sekvo. You can follow my work on{" "}
            <a
              href="https://github.com/Sekyls"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline underline-offset-2"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
      {/* 2nd columns */}
      <div className="grid  grid-cols-2 gap-x-6 sm:gap-x-0 sm:grid-cols-4 gap-y-5 justify-between w-full">
        {FOOTER_LINKS.map((item, index) => {
          return (
            <div key={index} className="w-full space-y-1">
              <h6>{item.title}</h6>
              {item.links.map((link, i) => {
                return (
                  <Link key={i} href={link.url} className="block">
                    {link.title}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="sm:hidden space-y-4">
        <div className="flex gap-x-2.5 items-center">
          <Avatar className="border border-red-500 bg-white size-12 pt-0.5 pl-1">
            <AvatarImage src="/ceo.png" className="object-cover grayscale" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <p className="text-base!">
            Hey there! I&apos;m{" "}
            <a
              href="www.linkedin.com/in/sekyls"
              target="_blank"
              rel="noreferrer noopener"
              className="font-bold underline underline-offset-2"
            >
              Sekyi
            </a>
            , the creator of Sekvo. You can follow my work on{" "}
            <a
              href="https://github.com/Sekyls"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline underline-offset-2"
            >
              GitHub
            </a>
          </p>
        </div>
        <p className="text-base! text-center">
          Copyright &copy; {new Date().getFullYear()} - All rights reserved
        </p>
      </div>
    </footer>
  );
}
