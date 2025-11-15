"use client";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { CONTACT_PERSON_TITLES } from "@/lib/miscellany/constants";
import { InvoiceFormSchema } from "@/lib/miscellany/schema";
import { Controller, useFormContext } from "react-hook-form";
import z4 from "zod/v4";

export default function RecipientContactPerson() {
  const { control } = useFormContext<z4.infer<typeof InvoiceFormSchema>>();

  return (
    <ButtonGroup className="w-full max-w-sm gap-x-2">
      <Controller
        name="recipientContactPerson.title"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="w-fit">
            <FieldLabel htmlFor={field.name}>Title</FieldLabel>
            <Select value={field.value ?? ""} onValueChange={field.onChange}>
              <SelectTrigger className="invoice-bg-light">
                {field.value || "Select a title"}
              </SelectTrigger>
              <SelectContent className="min-w-24">
                {CONTACT_PERSON_TITLES.map((title) => (
                  <SelectItem key={title.value} value={title.value ?? ""}>
                    {title.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="recipientContactPerson.name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Contact Person</FieldLabel>
            <Input
              {...field}
              value={field.value ?? ""}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="e.g. Dennis Sekyi Opoku"
              autoComplete="on"
              className="invoice-bg-light"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </ButtonGroup>
  );
}
