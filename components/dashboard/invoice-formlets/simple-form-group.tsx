"use client";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CLIENT_DETAILS_FIELDS } from "@/lib/miscellany/constants";
import { Controller, useFormContext } from "react-hook-form";
import { useInvoiceDateHook } from "@/hooks/use-invoice-date";
import { useDueDateHook } from "@/hooks/use-due-date";
import DatePicker from "./date-picker";
import { InvoiceFormSchema } from "@/lib/miscellany/schema";
import z4 from "zod/v4";
import RecipientContactPerson from "./contact-person";
import RecipientPhoneNumber from "./phone-number";
import IssuerBrandLogo from "./logo-input";

export default function SimpleFormDetailsGroup() {
  const { control } = useFormContext<z4.infer<typeof InvoiceFormSchema>>();
  const invoiceDateProps = useInvoiceDateHook();
  const dueDateProps = useDueDateHook();
  return (
    <FieldGroup className="grid grid-cols-2 justify-between">
      {CLIENT_DETAILS_FIELDS.map((item) => {
        return (
          <Controller
            key={item.fieldName}
            name={item.fieldName}
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="max-w-sm">
                <FieldLabel htmlFor={item.fieldName}>
                  {item.label}
                  {item.isRequired && (
                    <span className="text-imperial-red font-black">*</span>
                  )}
                </FieldLabel>
                <Input
                  ref={field.ref}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  value={(field.value as string) ?? ""}
                  id={item.fieldName}
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
      <RecipientContactPerson />
      <RecipientPhoneNumber />
      <IssuerBrandLogo />
      <DatePicker {...invoiceDateProps} />
      <DatePicker {...dueDateProps} />
    </FieldGroup>
  );
}
