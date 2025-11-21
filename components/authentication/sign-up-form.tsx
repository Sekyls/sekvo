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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useSignupForm from "@/hooks/use-signup-form";
import { SIGNUP_FORM_FIELDS } from "@/lib/misc/constants";
import Image from "next/image";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "@/styles/react-phone-input-2.css";
import useGeolocation from "@/hooks/use-geolocation";
import PasswordToggle from "../shared/password-toggle";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

export default function SignUpForm() {
  const { form, onSubmit } = useSignupForm();
  const country = useGeolocation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full flex items-center"
      >
        <Card className="w-full max-w-lg mx-auto rounded-none sm:rounded-xl h-full sm:h-fit">
          <CardHeader>
            <CardTitle>Sign up for Sekvo</CardTitle>
            <CardDescription>
              Simply provide your details and set a password to start with
              Sekvo.
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
          <CardContent className="flex flex-col gap-6">
            {SIGNUP_FORM_FIELDS.map((f, i) => {
              return (
                <FormField
                  key={i}
                  control={form.control}
                  name={f.fieldName}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {f.label}
                        <span className="text-imperial-red font-black -ml-1">
                          *
                        </span>
                      </FormLabel>
                      <FormControl>
                        {f.phone ? (
                          <PhoneInput
                            placeholder={f.placeholder}
                            value={field.value as string}
                            onChange={(value) => field.onChange(value)}
                            onBlur={field.onBlur}
                            enableSearch={true}
                            country={country?.toLocaleLowerCase()}
                            containerClass="dark:bg-input/30! bg-transparent! shadow-none!"
                            countryCodeEditable={false}
                          />
                        ) : (
                          <div className="relative">
                            <Input
                              className="focus-visible:border-0 focus-visible:ring-0 focus:right-0 focus:border-0"
                              {...field}
                              placeholder={f.placeholder}
                              value={field.value as string}
                              required
                              type={
                                (f.fieldName === "password.confirmPassword" &&
                                  showPassword === false) ||
                                (f.fieldName === "password.password" &&
                                  showPassword === false)
                                  ? "password"
                                  : f.type
                              }
                            />
                            {f.fieldName === "password.confirmPassword" ||
                            f.fieldName === "password.password" ? (
                              <PasswordToggle
                                className="absolute inset-y-[20%] max-[360px]:inset-x-[85%] inset-x-11/12 sm:inset-x-[93%] z-50"
                                setShowPassword={setShowPassword}
                                showPassword={showPassword}
                              />
                            ) : null}
                          </div>
                        )}
                      </FormControl>
                      <FormMessage className="text-sm!" />
                    </FormItem>
                  )}
                />
              );
            })}
            <FormField
              control={form.control}
              name={"logo"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Logo</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:border-0 focus-visible:ring-0 focus:right-0 focus:border-0"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      name={field.name}
                      disabled={field.disabled}
                      placeholder="upload your logo"
                      type="file"
                    />
                  </FormControl>
                  <FormMessage className="text-sm!" />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full flex items-center gap-4 primary-gradient dark:primary-gradient text-white"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Spinner className="text-white" />
              )}
              Signup
            </Button>
            <p className="text-sm! text-center mx-auto">
              Already have an account?{" "}
              <Link href={"/auth/login"} className="underline">
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
