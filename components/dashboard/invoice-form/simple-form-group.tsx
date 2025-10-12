import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CLIENT_DETAILS_FIELDS } from "@/lib/constants";
import { RecipientFieldGroupsProps } from "@/lib/types";
import { Controller } from "react-hook-form";

export default function SimpleFormDetailsGroup({
  formControl,
}: RecipientFieldGroupsProps) {
  return (
    <FieldGroup>
      {CLIENT_DETAILS_FIELDS.map((item) => {
        return (
          <Controller
            key={item.fieldName}
            name={item.fieldName}
            control={formControl}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={item.fieldName}>{item.label}</FieldLabel>
                <Input
                  {...field}
                  value={field.value as string}
                  id={item.fieldName}
                  aria-invalid={fieldState.invalid}
                  placeholder={"field placeholder"}
                  autoComplete="on"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        );
      })}
    </FieldGroup>
  );
}
