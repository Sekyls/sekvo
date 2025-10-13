"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod/v4";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldSet } from "@/components/ui/field";
import { InvoiceFormSchema } from "@/lib/schema";
import SimpleFormDetailsGroup from "./invoice-form/simple-form-group";
import AddCustomFields from "./invoice-form/add-custom-fields";
import InvoiceItems from "./invoice-form/add-invoice-items";
import NotesAndTerms from "./invoice-form/notes-terms";

export default function AggregatedInvoiceForm() {
  const { handleSubmit, control, formState } = useForm<
    z.infer<typeof InvoiceFormSchema>
  >({
    resolver: zodResolver(InvoiceFormSchema),
    mode: "onChange",
    defaultValues: {
      companyAddress: "",
      companyEmail: "",
      companyName: "",
      invoiceItems: [
        { description: "", item: "", quantity: "", unitPrice: "0.00" },
      ],
      contactPerson: { name: "", title: "" },
      dueDate: "",
      invoiceDate: "",
      notes: "",
      invoiceNumber: "",
      phoneNumber: "",
      purchaseOrder: "",
      terms: "",
    },
  });

  function onSubmit(data: z.infer<typeof InvoiceFormSchema>) {}

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Start a New Invoice</CardTitle>
        <CardDescription>Add Client & Payment Details </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-invoice-aggregate"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <SimpleFormDetailsGroup formControl={control} formState={formState} />
          <FieldGroup>
            <AddCustomFields formControl={control} formState={formState} />
          </FieldGroup>
          <FieldSet>
            <InvoiceItems formControl={control} formState={formState} />
          </FieldSet>
          <FieldGroup className="flex-row">
            <NotesAndTerms formControl={control} formState={formState} />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="submit"
            form="form-invoice-aggregate"
            className="w-full max-w-3xs mx-auto"
          >
            Generate
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
