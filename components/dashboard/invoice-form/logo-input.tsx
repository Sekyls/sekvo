import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RecipientFieldGroupsProps } from "@/lib/types";
import { Controller } from "react-hook-form";

export default function SenderLogo({ formControl }: RecipientFieldGroupsProps) {
  return (
    <Controller
      name="logo"
      control={formControl}
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
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
