import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroupAddon, InputGroupButton } from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CURRENCIES } from "@/lib/constants";
import { RecipientFieldGroupsProps } from "@/lib/types";
import { IconSquarePlus } from "@tabler/icons-react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";

export default function InvoiceItems({
  formControl,
  formState,
}: RecipientFieldGroupsProps) {
  const [currency, setCurrency] = useState("$");

  const { fields, append, remove } = useFieldArray({
    control: formControl,
    name: "invoiceItems",
  });

  return (
    <FieldSet className="gap-4 ">
      <FieldLegend variant="label">Items</FieldLegend>
      <FieldDescription>Add your items</FieldDescription>
      {fields.map((field, index) => (
        <FieldGroup key={field.id} className="grid grid-cols-[95%_5%]">
          <div className="space-y-3">
            <div className="flex gap-x-2">
              <Controller
                name={`invoiceItems.${index}.item`}
                control={formControl}
                render={({ field: controllerField, fieldState }) => (
                  <Field
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                    className="block space-y-2"
                  >
                    <FieldContent>
                      <Input
                        {...controllerField}
                        id={`invoice-items-${index}-item`}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. Azaar paint"
                        type="text"
                        autoComplete="on"
                        className="invoice-bg-light"
                      />
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-center"
                      />
                    )}
                  </Field>
                )}
              />
              <Controller
                name={`invoiceItems.${index}.quantity`}
                control={formControl}
                render={({ field: controllerField, fieldState }) => (
                  <Field
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                    className="block space-y-2 max-w-3xs"
                  >
                    <FieldContent>
                      <Input
                        {...controllerField}
                        id={`invoice-items-${index}-quantity`}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. 10 units"
                        type="text"
                        autoComplete="on"
                        className="invoice-bg-light"
                      />
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-center"
                      />
                    )}
                  </Field>
                )}
              />
              <Controller
                name={`invoiceItems.${index}.unitPrice`}
                control={formControl}
                render={({ field: controllerField, fieldState }) => (
                  <Field
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                    className="max-w-3xs block space-y-2"
                  >
                    <FieldContent>
                      <ButtonGroup>
                        <Select value={currency} onValueChange={setCurrency}>
                          <SelectTrigger className="invoice-bg-light">
                            {currency}
                          </SelectTrigger>
                          <SelectContent className="min-w-24">
                            {CURRENCIES.map((currency, index) => (
                              <SelectItem
                                key={`${currency.label}-${currency.value}`}
                                value={currency.value}
                              >
                                {currency.value}{" "}
                                <span className="text-muted-foreground">
                                  {currency.label}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          {...controllerField}
                          id={`invoice-items-${index}-unit-price`}
                          aria-invalid={fieldState.invalid}
                          autoComplete="on"
                          className="invoice-bg-light"
                        />
                      </ButtonGroup>
                    </FieldContent>
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-center"
                      />
                    )}
                  </Field>
                )}
              />
            </div>
            <Controller
              name={`invoiceItems.${index}.description`}
              control={formControl}
              render={({ field: controllerField, fieldState }) => (
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                  className="block space-y-2"
                >
                  <FieldContent>
                    <Textarea
                      {...controllerField}
                      id={`invoice-items-${index}-description`}
                      aria-invalid={fieldState.invalid}
                      placeholder="Item description"
                      autoComplete="on"
                      className="invoice-bg-light"
                    />
                  </FieldContent>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-center"
                    />
                  )}
                </Field>
              )}
            />
          </div>
          {fields.length > 1 && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                type="button"
                variant="destructive"
                size="icon-xs"
                onClick={() => remove(index)}
                aria-label={`Remove email ${index + 1}`}
                className="hover:scale-110 transition-all duration-500 ease-in-out invoice-bg-light"
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
        onClick={() =>
          append({ description: "", item: "", quantity: "", unitPrice: "0.00" })
        }
        // disabled={fields.length >= 5}
        className="max-w-sm mx-auto bg-green-800! text-white font-bold hover:scale-95 transition-all duration-300 ease-in-out mt-5"
      >
        <IconSquarePlus stroke={2} />
        Add more items
      </Button>
      {formState?.errors.invoiceItems?.root && (
        <FieldError errors={[formState.errors.invoiceItems.root]} />
      )}
    </FieldSet>
  );
}
