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
import Link from "next/link";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";
import Timer from "@/components/authentication/timer";
import useOTPForm from "@/hooks/use-otp-form";

export default function InputOTPForm() {
  const {
    email,
    handleOTPResend,
    onSubmit,
    otpForm,
    resendingOTP,
    setResendingOTP,
  } = useOTPForm();
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
                  <Timer
                    duration={2 * 60 * 1000}
                    disabled={resendingOTP}
                    onclick={() => {
                      setResendingOTP(true);
                      handleOTPResend();
                    }}
                  />
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
