"use client";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "@/styles/react-phone-input-2.css";
import useGeolocation from "@/hooks/use-geolocation";
import z4 from "zod/v4";
import { InvoiceFormSchema } from "@/lib/misc/schema";

export default function RecipientPhoneNumber() {
  const { control } = useFormContext<z4.infer<typeof InvoiceFormSchema>>();

  const country = useGeolocation();

  return (
    <Controller
      name="recipientPhoneNumber"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="max-w-sm">
          <FieldLabel htmlFor="phoneNumber">Recipient Telephone</FieldLabel>
          <PhoneInput
            value={(field.value as string) ?? ""}
            onChange={(value) => field.onChange(value)}
            onBlur={field.onBlur}
            enableSearch={true}
            country={country?.toLocaleLowerCase()}
            countryCodeEditable={false}
            containerClass="dark:bg-input/30! bg-transparent!"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
