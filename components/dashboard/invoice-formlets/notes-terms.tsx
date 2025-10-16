"use client";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { NOTES_TERMS } from "@/lib/miscellany/constants";
import { InvoiceFormSchema } from "@/lib/miscellany/schema";
import { FieldNames } from "@/lib/miscellany/types";
import { Controller, useFormContext } from "react-hook-form";
import z4 from "zod/v4";

export default function NotesAndTerms() {
  const { control } = useFormContext<z4.infer<typeof InvoiceFormSchema>>();

  return (
    <>
      {NOTES_TERMS.map((item) => {
        return (
          <Controller
            key={item.name}
            name={item.name as FieldNames}
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={item.name}>{item.label}</FieldLabel>
                <Textarea
                  {...field}
                  value={field.value as string}
                  id={"notes"}
                  aria-invalid={fieldState.invalid}
                  placeholder={item.placeholder}
                  autoComplete="on"
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
    </>
  );
}
