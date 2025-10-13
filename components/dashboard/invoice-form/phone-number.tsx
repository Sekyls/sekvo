import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "@/styles/react-phone-input-2.css";
import useGeolocation from "@/hooks/use-geolocation";
import { RecipientFieldGroupsProps } from "@/lib/types";

export default function PhoneNumber({
  formControl,
}: RecipientFieldGroupsProps) {
  const country = useGeolocation();

  return (
    <Controller
      name="phoneNumber"
      control={formControl}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="max-w-sm">
          <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
          <PhoneInput
            value={field.value as string}
            onChange={(value) => field.onChange(value)}
            onBlur={field.onBlur}
            enableSearch={true}
            country={country?.toLocaleLowerCase()}
            countryCodeEditable={false}
            containerClass="dark:bg-input/30! bg-transparent!"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
