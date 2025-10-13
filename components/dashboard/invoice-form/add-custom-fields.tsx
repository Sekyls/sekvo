"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroupAddon, InputGroupButton } from "@/components/ui/input-group";
import { RecipientFieldGroupsProps } from "@/lib/types";
import { IconSquarePlus } from "@tabler/icons-react";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";

export default function AddCustomFields({
  formControl,
  formState,
}: RecipientFieldGroupsProps) {
  const [showCustomFieldsLabel, setShowCustomFieldsLabel] =
    useState<boolean>(false);
  const { fields, append, remove } = useFieldArray({
    control: formControl,
    name: "customInvoiceFields",
  });
  useEffect(() => {
    if (fields.length < 1) {
      setShowCustomFieldsLabel(false);
    } else {
      setShowCustomFieldsLabel(true);
    }
  }, [fields]);
  return (
    <FieldSet className="gap-4">
      {showCustomFieldsLabel && (
        <FieldLegend variant="label">Custom Fields</FieldLegend>
      )}
      <FieldGroup className="gap-4">
        {fields.map((field, index) => (
          <FieldGroup className="flex-row gap-x-2! max-w-sm" key={field.id}>
            <Controller
              name={`customInvoiceFields.${index}.label`}
              control={formControl}
              render={({ field: controllerField, fieldState }) => (
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                  className="max-w-20"
                >
                  <FieldContent>
                    <Input
                      {...controllerField}
                      id={`custom-field-label-${field.id}`}
                      aria-invalid={fieldState.invalid}
                      placeholder="label"
                      type="text"
                      autoComplete="on"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
            <Controller
              name={`customInvoiceFields.${index}.content`}
              control={formControl}
              render={({ field: controllerField, fieldState }) => (
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                  className="w-full"
                >
                  <FieldContent>
                    <Input
                      {...controllerField}
                      id={`custom-field-content-${field.id}`}
                      aria-invalid={fieldState.invalid}
                      placeholder="enter your info"
                      type="text"
                      autoComplete="on"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
            {fields.length >= 1 && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => remove(index)}
                  aria-label={`Remove email ${index + 1}`}
                >
                  <Trash2 />
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </FieldGroup>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ label: "", content: "" })}
          disabled={fields.length >= 5}
          className="max-w-sm mx-auto mt-5"
        >
          <IconSquarePlus stroke={2} />
          Add a custom field
        </Button>
      </FieldGroup>
      {formState?.errors.customInvoiceFields?.root && (
        <FieldError errors={[formState?.errors.customInvoiceFields.root]} />
      )}
    </FieldSet>
  );
}
