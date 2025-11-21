"use client";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCalcSummary from "@/hooks/use-calculation-summary";
import { InvoiceFormSchema } from "@/lib/misc/schema";
import { FieldNames } from "@/lib/misc/types";
import {
  BadgeTurkishLira,
  BadgeX,
  DecimalsArrowLeft,
  Percent,
  Repeat,
} from "lucide-react";
import { Fragment } from "react";
import { Controller, useFormContext } from "react-hook-form";
import z4 from "zod/v4";
import InfoPopover from "./info";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function CalculationSummary() {
  const { control, watch } =
    useFormContext<z4.infer<typeof InvoiceFormSchema>>();
  const percentDiscount = watch("discount");
  const percentTax = watch("tax");
  const {
    CALCULATION_EXTRAS,
    SWITCH_ITEMS,
    grandTotal,
    discount,
    shipping,
    tax,
    currency,
    aggregateSubTotals,
    utilisePercentDiscount,
    utilisePercentTax,
    utiliseTaxableShipping,
  } = useCalcSummary();

  return (
    <FieldGroup>
      <ButtonGroup className="flex-row max-[355px]:flex-col gap-5 justify-between w-full max-w-sm">
        {SWITCH_ITEMS.map((item) => {
          return (
            <div className="flex items-center space-x-2" key={item.id}>
              <Switch
                id={item.id}
                onClick={() => {
                  item.setState(!item.state);
                }}
                className="shadow-md shadow-foreground/40"
              />
              <Label htmlFor={item.id} className="mt-0.5">
                {item.label}
              </Label>
            </div>
          );
        })}
      </ButtonGroup>
      <FieldGroup className="max-w-sm">
        {CALCULATION_EXTRAS.map((item) => {
          return (
            <Fragment key={item.id}>
              {item.isChecked && (
                <div className="grid sm:grid-cols-[0.5fr_2fr] justify-between gap-x-5 gap-y-2">
                  <div className="flex items-center gap-x-1">
                    <Label>{item.label}</Label>
                    <InfoPopover
                      title={item.infoTitle}
                      description={item.infoDescription}
                      id={item.id}
                    />
                  </div>
                  <InputGroup className="gap-2 invoice-bg-light">
                    <InputGroupAddon align="inline-start">
                      <Repeat
                        onClick={() => {
                          if (
                            item.utilisePercentage !== null &&
                            item.setUtilisePercentage !== null
                          ) {
                            item.setUtilisePercentage(!item.utilisePercentage);
                          }
                          if (
                            item.utiliseTaxableShipping !== null &&
                            item.setUtiliseTaxableShipping !== null
                          ) {
                            item.setUtiliseTaxableShipping(
                              !item.utiliseTaxableShipping
                            );
                          }
                        }}
                        className="text-amber-600 hover:cursor-default hover:scale-110 hover:text-green-800 hover:rotate-180 transition-all duration-300 ease-in-out size-4"
                      />
                    </InputGroupAddon>
                    <Controller
                      key={item.id}
                      name={item.id as FieldNames}
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="max-w-sm"
                        >
                          <Input
                            {...field}
                            value={(field.value as string) ?? ""}
                            id={item.id}
                            aria-invalid={fieldState.invalid}
                            placeholder={item.placeholder}
                            autoComplete="on"
                            type="number"
                            step="0.01"
                            className="rounded-none"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    {item.utilisePercentage === true && (
                      <InputGroupAddon align="inline-end">
                        <Popover>
                          <PopoverTrigger>
                            <Percent className="text-amber-600 size-5" />
                          </PopoverTrigger>
                          <PopoverContent className="w-fit text-xs p-2">
                            Percentage | Rate{" "}
                          </PopoverContent>
                        </Popover>
                      </InputGroupAddon>
                    )}
                    {item.utilisePercentage === false && (
                      <InputGroupAddon align="inline-end">
                        <Popover>
                          <PopoverTrigger>
                            <DecimalsArrowLeft className="text-amber-600 size-5" />
                          </PopoverTrigger>
                          <PopoverContent className="w-fit text-xs p-2">
                            Fixed amount
                          </PopoverContent>
                        </Popover>
                      </InputGroupAddon>
                    )}
                    {item.utiliseTaxableShipping === true && (
                      <InputGroupAddon align="inline-end">
                        <Popover>
                          <PopoverTrigger>
                            <BadgeTurkishLira className="text-amber-600 size-5" />
                          </PopoverTrigger>
                          <PopoverContent className="w-fit text-xs p-2">
                            Taxable shipping{" "}
                          </PopoverContent>
                        </Popover>
                      </InputGroupAddon>
                    )}
                    {item.utiliseTaxableShipping === false && (
                      <InputGroupAddon align="inline-end">
                        <Popover>
                          <PopoverTrigger>
                            <BadgeX className="text-amber-600 size-5" />
                          </PopoverTrigger>
                          <PopoverContent className="w-fit text-xs p-2">
                            Non-Taxable shipping{" "}
                          </PopoverContent>
                        </Popover>
                      </InputGroupAddon>
                    )}
                  </InputGroup>
                </div>
              )}
            </Fragment>
          );
        })}
      </FieldGroup>
      <Table>
        <TableCaption>Invoice summary</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Invoice</TableHead>
            <TableHead className="text-right font-bold">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableHead>Sub-totals</TableHead>
            <TableCell className="text-right">
              {currency}
              {aggregateSubTotals.toLocaleString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead>
              {utilisePercentDiscount
                ? "Discount " + `${percentDiscount}` + "%"
                : "Discount"}
            </TableHead>
            <TableCell className="text-right">
              {currency}
              {discount.toLocaleString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead>
              {utilisePercentTax ? "Tax " + `${percentTax}` + "%" : "Tax"}
            </TableHead>
            <TableCell className="text-right">
              {currency}
              {tax.toLocaleString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead>
              {utiliseTaxableShipping
                ? "Shipping (Taxable)"
                : "Shipping (Non-taxable)"}
            </TableHead>
            <TableCell className="text-right">
              {currency}
              {shipping.toLocaleString()}
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableHead>Total</TableHead>
            <TableCell className="text-right">
              {currency}
              {grandTotal.toLocaleString()}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </FieldGroup>
  );
}
