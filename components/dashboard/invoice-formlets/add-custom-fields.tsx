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
import useAddCustomFields from "@/hooks/use-custom-fields";
import { InvoiceFormSchema } from "@/lib/miscellany/schema";
import { IconSquarePlus } from "@tabler/icons-react";
import { Trash2 } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import z4 from "zod/v4";

export default function AddCustomFields() {
  const { control, formState } =
    useFormContext<z4.infer<typeof InvoiceFormSchema>>();
  const { append, fields, remove, showCustomFieldsLabel } =
    useAddCustomFields(control);
  return (
    <FieldSet className="gap-4">
      {showCustomFieldsLabel && (
        <FieldLegend variant="label">
          Custom Fields <span className="text-imperial-red font-black">*</span>
        </FieldLegend>
      )}
      <div className="grid grid-cols-2 gap-5 justify-between">
        {fields.map((field, index) => (
          <FieldGroup className="flex-row gap-x-2 max-w-sm" key={field.id}>
            <Controller
              name={`customInvoiceFields.${index}.label`}
              control={control}
              render={({ field: controllerField, fieldState }) => (
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                  className="max-w-20 block space-y-2"
                >
                  <FieldContent>
                    <Input
                      {...controllerField}
                      value={controllerField.value ?? ""}
                      id={`custom-field-label-${field.id}`}
                      aria-invalid={fieldState.invalid}
                      placeholder="label"
                      type="text"
                      autoComplete="on"
                      className="invoice-bg-light"
                    />
                  </FieldContent>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name={`customInvoiceFields.${index}.content`}
              control={control}
              render={({ field: controllerField, fieldState }) => (
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                  className="w-full block space-y-2"
                >
                  <FieldContent>
                    <Input
                      {...controllerField}
                      value={controllerField.value ?? ""}
                      id={`custom-field-content-${field.id}`}
                      aria-invalid={fieldState.invalid}
                      placeholder="enter your info"
                      type="text"
                      autoComplete="on"
                      className="invoice-bg-light"
                    />
                  </FieldContent>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {fields.length >= 1 && (
              <InputGroupAddon align="inline-end" className="self-start">
                <InputGroupButton
                  type="button"
                  variant="destructive"
                  size="icon-xs"
                  onClick={() => remove(index)}
                  aria-label={`Remove email ${index + 1}`}
                  className="hover:scale-95 invoice-bg-light"
                >
                  <Trash2 />
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </FieldGroup>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ label: "", content: "" })}
        disabled={fields.length >= 4}
        className="max-w-sm mx-auto mt-5 bg-green-800! text-white border-0 hover:scale-95 font-bold transition-all duration-300 ease-in-out"
      >
        <IconSquarePlus stroke={2} />
        Add a custom field
      </Button>
      {formState.errors.customInvoiceFields?.root && (
        <FieldError errors={[formState.errors.customInvoiceFields.root]} />
      )}
    </FieldSet>
  );
}
