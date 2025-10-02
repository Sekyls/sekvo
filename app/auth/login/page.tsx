"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = { email, password };
    console.log(formData);
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 flex justify-center items-center h-screen"
    >
      <Card className="w-full max-w-md space-y-2">
        <CardHeader>
          <CardTitle>Log in to Sekvo</CardTitle>
          <CardDescription>
            Simply provide your details and set a password to start with Sekvo.
          </CardDescription>
          <CardAction>
            <Link href={"/"}>
              <Image
                src={"/logo.png"}
                alt="sekvo"
                width={70}
                height={70}
                className="mx-auto sm:mx-0 rounded-2x bg-white dark:rounded-none dark:bg-transparent"
              />
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 space-y-4">
          <div className="space-y-3">
            <Label>Email</Label>
            <Input
              className="focus-visible:border-0 focus-visible:ring-0 focus:right-0 focus:border-0"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              required
            />
          </div>

          <div className="space-y-3">
            <Label className="flex justify-between items-center">
              Password <Link href={"#"}>Forgot password?</Link>
            </Label>
            <Input
              className="focus-visible:border-0 focus-visible:ring-0 focus:right-0 focus:border-0"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-5"
          >
            Log in
            <LoaderCircle
              className={cn(isLoading ? "animate-spin" : "hidden")}
            />
          </Button>
          <p className="text-sm!">
            Do not have an account yet?{" "}
            <Link href={"/auth/signup"} className="underline">
              Sign up
            </Link>
          </p>

          {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
        </CardFooter>
      </Card>
    </form>
  );
}
