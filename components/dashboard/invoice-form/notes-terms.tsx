import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RecipientFieldGroupsProps } from "@/lib/types";
import { Controller } from "react-hook-form";

export default function NotesAndTerms({
  formControl,
}: RecipientFieldGroupsProps) {
  return (
    <>
      <Controller
        name="notes"
        control={formControl}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={"notes"}>Notes</FieldLabel>
            <Input
              {...field}
              id={"notes"}
              aria-invalid={fieldState.invalid}
              placeholder="Notes for client"
              autoComplete="on"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="terms"
        control={formControl}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={"terms"}>Terms</FieldLabel>
            <Input
              {...field}
              id={"terms"}
              aria-invalid={fieldState.invalid}
              placeholder="Terms of service"
              autoComplete="on"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  );
}
