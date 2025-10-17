"use client";
import { Button } from "@/components/ui/button";
import { FieldDescription, FieldError, FieldSet } from "@/components/ui/field";
import { InvoiceFormSchema } from "@/lib/miscellany/schema";
import { IconSquarePlus } from "@tabler/icons-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import z4 from "zod/v4";
import InvoiceFieldItem from "./invoice-field-item";

export default function InvoiceItems() {
  const { control, formState, watch } =
    useFormContext<z4.infer<typeof InvoiceFormSchema>>();

  const { fields, append, remove } = useFieldArray({
    name: "invoiceItems",
    control,
  });

  return (
    <FieldSet className="gap-4 ">
      <FieldDescription className="text-foreground">
        Add your items
      </FieldDescription>
      {fields.map((field, index) => {
        return (
          <InvoiceFieldItem
            field={field}
            fields={fields}
            index={index}
            remove={remove}
            key={field.id}
          />
        );
      })}

      {/* Append Button */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() =>
          append({
            description: "",
            item: "",
            quantity: "1",
            unitPrice: {
              currency: watch("invoiceItems.0.unitPrice.currency") || "₵",
              price: "0.00",
            },
            subTotal: "0.00",
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
