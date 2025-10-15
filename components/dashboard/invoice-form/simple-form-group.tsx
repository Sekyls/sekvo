import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CLIENT_DETAILS_FIELDS } from "@/lib/miscellany/constants";
import { RecipientFieldGroupsProps } from "@/lib/miscellany/types";
import { Controller } from "react-hook-form";
import ContactPerson from "./contact-person";
import PhoneNumber from "./phone-number";
import { useInvoiceDateHook } from "@/hooks/use-invoice-date";
import { useDueDateHook } from "@/hooks/use-due-date";
import SenderLogo from "./logo-input";
import DatePicker from "./date-picker";

export default function SimpleFormDetailsGroup({
  formControl,
}: RecipientFieldGroupsProps) {
  const invoiceDateProps = useInvoiceDateHook();
  const dueDateProps = useDueDateHook();
  return (
    <FieldGroup className="grid grid-cols-2 justify-between">
      {CLIENT_DETAILS_FIELDS.map((item) => {
        return (
          <Controller
            key={item.fieldName}
            name={item.fieldName}
            control={formControl}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="max-w-sm">
                <FieldLabel htmlFor={item.fieldName}>{item.label}</FieldLabel>
                <Input
                  {...field}
                  value={field.value as string}
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
      <ContactPerson formControl={formControl} formState={null} />
      <PhoneNumber formControl={formControl} formState={null} />
      <SenderLogo formControl={formControl} formState={null} />
      <DatePicker {...invoiceDateProps} />
      <DatePicker {...dueDateProps} />
    </FieldGroup>
  );
}
