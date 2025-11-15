"use client";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SIGNATURE_BLOCK } from "@/lib/miscellany/constants";
import { InvoiceFormSchema } from "@/lib/miscellany/schema";
import { FieldNames } from "@/lib/miscellany/types";
import { Controller, useFormContext } from "react-hook-form";
import z4 from "zod/v4";

export default function SignatureBlock() {
  const { control } = useFormContext<z4.infer<typeof InvoiceFormSchema>>();

  return (
    <section>
      <FieldLegend>Signature Block</FieldLegend>
      <FieldGroup className="flex-row gap-x-5">
        {SIGNATURE_BLOCK.map((item, index) => {
          return (
            <Controller
              key={index}
              name={item.name as FieldNames}
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="max-w-sm">
                  <FieldLabel htmlFor={item.name}>
                    {item.label}
                    <span className="text-imperial-red font-black">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    value={(field.value as string) ?? ""}
                    id={item.name}
                    aria-invalid={fieldState.invalid}
                    placeholder={item.placeholder}
                    autoComplete="on"
                    type="text"
                    className="invoice-bg-light"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          );
        })}
        <Controller
          name="issuerSignature"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="max-w-sm">
              <FieldLabel htmlFor="signature">
                Issuer Signature
                <span className="text-imperial-red font-black">*</span>
              </FieldLabel>
              <Input
                id="signature"
                onChange={(e) => field.onChange(e.target.files?.[0])}
                onBlur={field.onBlur}
                ref={field.ref}
                aria-invalid={fieldState.invalid}
                autoComplete="on"
                type="file"
                accept="image/png, image/jpeg,image/svg+xml"
                className="invoice-bg-light"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </section>
  );
}
