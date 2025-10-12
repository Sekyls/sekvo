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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
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
    <FieldSet className="gap-4">
      <FieldLegend variant="label">Items</FieldLegend>
      <FieldDescription>Add your items</FieldDescription>
      {fields.map((field, index) => (
        <FieldGroup className="gap-4" key={field.id}>
          <Controller
            name={`invoiceItems.${index}.item`}
            control={formControl}
            render={({ field: controllerField, fieldState }) => (
              <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                <FieldContent>
                  <InputGroup>
                    <InputGroupInput
                      {...controllerField}
                      id={`invoice-items-${index}`}
                      aria-invalid={fieldState.invalid}
                      placeholder="Azaar paint"
                      type="text"
                      autoComplete="on"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </InputGroup>
                </FieldContent>
              </Field>
            )}
          />
          <Controller
            name={`invoiceItems.${index}.quantity`}
            control={formControl}
            render={({ field: controllerField, fieldState }) => (
              <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                <FieldContent>
                  <InputGroup>
                    <InputGroupInput
                      {...controllerField}
                      id={`invoice-items-${index}`}
                      aria-invalid={fieldState.invalid}
                      placeholder="10 units"
                      type="text"
                      autoComplete="on"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </InputGroup>
                </FieldContent>
              </Field>
            )}
          />
          <Controller
            name={`invoiceItems.${index}.unitPrice`}
            control={formControl}
            render={({ field: controllerField, fieldState }) => (
              <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                <FieldContent>
                  <InputGroup>
                    <ButtonGroup>
                      <ButtonGroup>
                        <Select value={currency} onValueChange={setCurrency}>
                          <SelectTrigger className="font-mono">
                            {currency}
                          </SelectTrigger>
                          <SelectContent className="min-w-24">
                            {CURRENCIES.map((currency, index) => (
                              <SelectItem key={index} value={currency.value}>
                                {currency.value}{" "}
                                <span className="text-muted-foreground">
                                  {currency.label}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <InputGroupInput
                          {...controllerField}
                          id={`invoice-items-${index}`}
                          aria-invalid={fieldState.invalid}
                          placeholder="10.00"
                          pattern="[0-9]*"
                          type="number"
                          step="any"
                          autoComplete="on"
                        />
                      </ButtonGroup>
                    </ButtonGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </InputGroup>
                </FieldContent>
              </Field>
            )}
          />
          <Controller
            name={`invoiceItems.${index}.description`}
            control={formControl}
            render={({ field: controllerField, fieldState }) => (
              <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                <FieldContent>
                  <InputGroup>
                    <InputGroupTextarea
                      {...controllerField}
                      id={`invoice-items-${index}`}
                      aria-invalid={fieldState.invalid}
                      placeholder="Item description"
                      autoComplete="on"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </InputGroup>
                </FieldContent>
              </Field>
            )}
          />
          {fields.length > 1 && (
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
        onClick={() =>
          append({ description: "", item: "", quantity: "", unitPrice: 0 })
        }
        disabled={fields.length >= 5}
      >
        <IconSquarePlus stroke={2} />
        Add more items
      </Button>
      {formState.errors.invoiceItems?.root && (
        <FieldError errors={[formState.errors.invoiceItems.root]} />
      )}
    </FieldSet>
  );
}
