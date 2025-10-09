"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OTPFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod/v4";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { otpValidator } from "@/actions/otp-validator";
import { toastError, toastSuccess } from "@/lib/toast-config";
import { Spinner } from "@/components/ui/spinner";

export default function InputOTPForm() {
  const router = useRouter();
  const email = useSearchParams().get("email") + ".com";
  const otpForm = useForm<z.infer<typeof OTPFormSchema>>({
    resolver: zodResolver(OTPFormSchema),
    mode: "onBlur",
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof OTPFormSchema>) {
    try {
      await otpValidator(data, email);
      toastSuccess("Verfication succesful", undefined, {
        label: "Verified",
        onClick: () => {
          router.replace("/auth/login");
        },
      });
      otpForm.reset();
      router.replace("/auth/login");
    } catch (error) {
      if (error instanceof Error) {
        toastError(error.message, undefined, {
          label: "Inavlid",
          onClick() {
            otpForm.reset();
          },
        });
        otpForm.reset()
      }
    }
  }

  return (
    <Form {...otpForm}>
      <form
        onSubmit={otpForm.handleSubmit(onSubmit)}
        className="min-h-screen flex justify-center items-center overflow-hidden"
      >
        <Card className="w-full mx-2 sm:mx-auto max-w-xl border-accent">
          <CardHeader className="flex items-center justify-between gap-x-5">
            <CardTitle className="bg-amber-50">Email Verification</CardTitle>
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
          <CardContent>
            <FormField
              control={otpForm.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="text-sm! mt-2 sm:mt-0">
                    {`Please enter the OTP sent to ${email}`}
                  </FormDescription>
                  <FormMessage className="text-sm!" />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="primary-gradient w-full max-w-2xs text-white flex gap-4"
              disabled={
                !otpForm.formState.isValid || otpForm.formState.isSubmitting
              }
            >
              {otpForm.formState.isSubmitting && <Spinner />}
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
