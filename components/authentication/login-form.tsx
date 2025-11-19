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
import { cn } from "@/lib/misc/utils";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PasswordToggle from "../shared/password-toggle";
import useLoginUser from "@/hooks/use-login-user";

export default function LoginForm() {
  const {
    email,
    handleSubmit,
    isLoading,
    password,
    setEmail,
    setIsLoading,
    setPassword,
    setShowPassword,
    showPassword,
  } = useLoginUser();

  return (
    <form
      onSubmit={(e) => {
        setIsLoading(true);
        handleSubmit(e);
      }}
      className="space-y-8 w-full flex items-center"
    >
      <Card className="w-full max-w-lg mx-2 sm:mx-auto  space-y-2">
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
                className="mx-auto sm:mx-0 rounded-2x bg-white dark:rounded-none dark:bg-transparent scale-75 sm:scale-100"
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
              Password{" "}
              <Link href={"#"} className="hidden sm:block">
                Forgot password?
              </Link>
            </Label>
            <div className="relative">
              <Input
                className="focus-visible:border-0 focus-visible:ring-0 focus:right-0 focus:border-0"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type={showPassword ? "text" : "password"}
                required
              />
              <PasswordToggle
                className="absolute inset-y-[20%] max-[360px]:inset-x-[85%] inset-x-11/12 sm:inset-x-[93%] z-50"
                setShowPassword={setShowPassword}
                showPassword={showPassword}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-5 primary-gradient text-white"
          >
            Log in
            <LoaderCircle
              className={cn(isLoading ? "animate-spin text-white" : "hidden")}
            />
          </Button>
          <p className="text-sm! text-center mx-auto">
            Do not have an account yet?{" "}
            <Link href={"/auth/signup"} className="underline">
              Sign up
            </Link>
          </p>
          <Link href={"#"} className="sm:hidden text-sm underline">
            Forgot password?
          </Link>
        </CardFooter>
      </Card>
    </form>
  );
}
