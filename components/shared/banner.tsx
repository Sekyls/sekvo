import { SendHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="flex flex-col justify-center items-center mt-10 space-y-5 text-center overflow-x-hidden">
      <h1>Sekvo</h1>
      <h2>Smarter Invoicing, Simplified</h2>
      <p className="max-w-4xl">
        Sekvo is a modern invoicing app built for freelancers, startups, and
        small businesses who want to spend less time chasing payments and more
        time growing. With Sekvo, creating and managing invoices is fast,
        professional, and stress-free.
      </p>
      <Button className="font-bold primary-gradient max-w-full dark:text-white py-6">
        <Link
          href={"/auth/signup"}
          className="flex gap-x-3 items-center justify-center"
        >
          <SendHorizontal className="size-5" />
          <p> Start sending invoices now!</p>
        </Link>
      </Button>
      <Image
        src={"/animations/invoice-animate.svg"}
        alt="invoice-animate"
        width={600}
        height={600}
        className="ml-10 sm:ml-30 drop-shadow-md drop-shadow-foreground"
      />
    </div>
  );
}
