"use client";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InvoiceFormSchema } from "@/lib/miscellany/schema";
import { Controller, useFormContext } from "react-hook-form";
import z4 from "zod/v4";

export default function SenderLogo() {
  const { control } = useFormContext<z4.infer<typeof InvoiceFormSchema>>();

  return (
    <Controller
      name="logo"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="max-w-sm">
          <FieldLabel htmlFor="Sender Logo">Sender's Logo</FieldLabel>
          <Input
            id="Sender Logo"
            aria-invalid={fieldState.invalid}
            placeholder="Login button not working on mobile"
            autoComplete="off"
            type="file"
            ref={field.ref}
            onBlur={field.onBlur}
            disabled={field.disabled}
            onChange={(e) => field.onChange(e.target.files?.[0])}
            className="invoice-bg-light"
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
