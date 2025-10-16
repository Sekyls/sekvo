"use client";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CURRENCIES } from "@/lib/miscellany/constants";
import { InvoiceFormSchema } from "@/lib/miscellany/schema";
import { IconSquarePlus } from "@tabler/icons-react";
import { SearchIcon, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import z4 from "zod/v4";

export default function InvoiceItems() {
  const { control, formState } =
    useFormContext<z4.infer<typeof InvoiceFormSchema>>();
  const [searchCurrency, setSearchCurrency] = useState<string>("");

  const filteredCurrencies = useMemo(() => {
    return CURRENCIES.filter(
      (c) =>
        c.label.toLowerCase().includes(searchCurrency.toLowerCase()) ||
        c.value.toLowerCase().includes(searchCurrency.toLowerCase())
    );
  }, [searchCurrency]);

  const { fields, append, remove } = useFieldArray({
    name: "invoiceItems",
    control,
  });

  return (
    <FieldSet className="gap-4 ">
      <FieldDescription className="text-foreground">
        Add your items
      </FieldDescription>
      {fields.map((field, index) => (
        <FieldGroup key={field.id} className="grid grid-cols-[95%_5%]">
          <div className="space-y-3">
            <div className="flex gap-x-2">
              {/* Item Name */}
              <Controller
                name={`invoiceItems.${index}.item`}
                control={control}
                render={({ field: controllerField, fieldState }) => (
                  <Field
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                    className="block space-y-2"
                  >
                    <FieldLabel htmlFor={`invoice-items-${index}-item`}>
                      Item
                    </FieldLabel>
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
              {/* Quantity */}
              <Controller
                name={`invoiceItems.${index}.quantity`}
                control={control}
                render={({ field: controllerField, fieldState }) => (
                  <Field
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                    className="block space-y-2 max-w-3xs"
                  >
                    <FieldLabel htmlFor={`invoice-items-${index}-quantity`}>
                      Quantity
                    </FieldLabel>
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

              {/* Unit Price */}
              <FieldSet
                id={`invoice-items-${index}-unit-price`}
                className="max-w-3xs w-full gap-0 space-y-2"
              >
                <FieldLabel htmlFor={`invoice-items-${index}-unit-price`}>
                  Unit Price
                </FieldLabel>
                <FieldGroup className="flex-row gap-0 gap-x-1">
                  {/* Currency */}
                  <Controller
                    name={`invoiceItems.${index}.unitPrice.currency`}
                    control={control}
                    render={({ field: controllerField, fieldState }) => (
                      <Field
                        orientation="vertical"
                        data-invalid={fieldState.invalid}
                        className="w-fit"
                      >
                        <FieldContent>
                          <Select
                            value={controllerField.value}
                            onValueChange={controllerField.onChange}
                            defaultValue="₵"
                          >
                            <SelectTrigger className="invoice-bg-light w-fit focus:border-0 focus:ring-0 focus-visible:border-0 focus-visible:ring-0">
                              {controllerField.value}
                            </SelectTrigger>
                            <SelectContent className="min-w-24 max-h-96">
                              <ButtonGroup
                                className="fixed w-[98%] top-0 z-10 invoice-bg-light bg-background rounded-md border-0 px-5 items-center"
                                orientation="horizontal"
                              >
                                <SearchIcon className="size-4 border-0 text-accent" />
                                <Input
                                  placeholder="Search currency..."
                                  value={searchCurrency}
                                  onChange={(e) =>
                                    setSearchCurrency(e.target.value)
                                  }
                                  className="border-0 shadow-none"
                                />
                              </ButtonGroup>

                              {filteredCurrencies.length > 0 ? (
                                filteredCurrencies.map((currency) => (
                                  <SelectItem
                                    key={`${currency.label}-${currency.value}`}
                                    value={currency.value}
                                  >
                                    {currency.value}{" "}
                                    <span className="text-muted-foreground">
                                      {currency.label}
                                    </span>
                                  </SelectItem>
                                ))
                              ) : (
                                <div className="p-2 text-sm text-muted-foreground">
                                  No currency found.
                                </div>
                              )}
                            </SelectContent>
                          </Select>
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
                  {/* Price */}
                  <Controller
                    name={`invoiceItems.${index}.unitPrice.price`}
                    control={control}
                    render={({ field: controllerField, fieldState }) => (
                      <Field
                        orientation="vertical"
                        data-invalid={fieldState.invalid}
                      >
                        <FieldContent>
                          <Input
                            {...controllerField}
                            id={`invoice-items-${index}-unit-price`}
                            aria-invalid={fieldState.invalid}
                            placeholder="e.g 0.00"
                            autoComplete="on"
                            className="invoice-bg-light w-full!"
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
                </FieldGroup>
              </FieldSet>

              {/* Sub-total */}
              <Field
                orientation="horizontal"
                className="max-w-3xs block space-y-2"
              >
                <FieldLabel>Sub-total</FieldLabel>
                <InputGroup className="invoice-bg-light">
                  <InputGroupAddon>
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                  <div className="w-full h-full flex items-center justify-center border-l border-r mx-2">
                    0.00
                  </div>
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>USD</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </div>

            {/* Item Description */}
            <Controller
              name={`invoiceItems.${index}.description`}
              control={control}
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
                      placeholder="e.g item description"
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

      {/* Append Button */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() =>
          append({
            description: "",
            item: "",
            quantity: "",
            unitPrice: { currency: "₵", price: "" },
          })
        }
        className="max-w-sm mx-auto border-0 bg-green-800! text-white font-bold hover:scale-95 transition-all duration-300 ease-in-out mt-5"
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
