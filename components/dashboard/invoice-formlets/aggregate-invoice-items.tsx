"use client";
import { Button } from "@/components/ui/button";
import { FieldDescription, FieldError, FieldSet } from "@/components/ui/field";
import { IconSquarePlus } from "@tabler/icons-react";
import InvoiceFieldItem from "./invoice-field-item";
import useInvoiceItems from "@/hooks/use-invoice-items";

export default function InvoiceItems() {
  const { append, fields, formState, remove, watch } = useInvoiceItems();
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
