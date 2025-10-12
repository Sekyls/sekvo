import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { CONTACT_PERSON_TITLES } from "@/lib/constants";
import { RecipientFieldGroupsProps } from "@/lib/types";
import { Controller } from "react-hook-form";

export default function ContactPerson({
  formControl, formState
}: RecipientFieldGroupsProps) {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Controller
          name="contactPerson.title"
          control={formControl}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>{"Title"}</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="font-mono">
                  {field.value}
                </SelectTrigger>
                <SelectContent className="min-w-24">
                  {CONTACT_PERSON_TITLES.map((title) => (
                    <SelectItem key={title.value} value={title.value}>
                      {title.value}{" "}
                      <span className="text-muted-foreground">
                        {title.value}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="contactPerson.name"
          control={formControl}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>{"Title"}</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder={"field placeholder"}
                autoComplete="on"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </ButtonGroup>
    </ButtonGroup>
  );
}
