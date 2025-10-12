import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import useGeolocation from "@/hooks/use-geolocation";
import { RecipientFieldGroupsProps } from "@/lib/types";

export default function PhoneNumber({
  formControl,
  formState,
}: RecipientFieldGroupsProps) {
  const country = useGeolocation();

  return (
    <Controller
      name="phoneNumber"
      control={formControl}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
          <PhoneInput
            value={field.value as string}
            onChange={(value) => field.onChange(value)}
            onBlur={field.onBlur}
            enableSearch={true}
            country={country?.toLocaleLowerCase()}
            containerClass="dark:bg-input/30 border-input w-full min-w-0 rounded-md border shadow-xs transition-[color,box-shadow] outline-none"
            inputClass="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-none w-full min-w-0 rounded-md bg-transparent text-base transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-0 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
            buttonClass="border-r border-input pr-0.5!"
            searchClass="z-50"
            countryCodeEditable={false}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
