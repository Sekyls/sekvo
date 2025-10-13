import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
            <Textarea
              {...field}
              id={"notes"}
              aria-invalid={fieldState.invalid}
              placeholder="Notes for client"
              autoComplete="on"
              className="invoice-bg-light"
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
            <Textarea
              {...field}
              id={"terms"}
              aria-invalid={fieldState.invalid}
              placeholder="Terms of service"
              autoComplete="on"
              className="invoice-bg-light"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  );
}
