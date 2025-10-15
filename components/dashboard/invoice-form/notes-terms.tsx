import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { NOTES_TERMS } from "@/lib/miscellany/constants";
import { FieldNames, RecipientFieldGroupsProps } from "@/lib/miscellany/types";
import { Controller } from "react-hook-form";

export default function NotesAndTerms({
  formControl,
}: RecipientFieldGroupsProps) {
  return (
    <>
      {NOTES_TERMS.map((item) => {
        return (
          <Controller
            key={item.name}
            name={item.name as FieldNames}
            control={formControl}
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
