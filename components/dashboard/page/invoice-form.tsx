"use client";
import * as React from "react";
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
import SimpleFormDetailsGroup from "../invoice-formlets/simple-form-group";
import AddCustomFields from "../invoice-formlets/add-custom-fields";
import InvoiceItems from "../invoice-formlets/aggregate-invoice-items";
import NotesAndTerms from "../invoice-formlets/notes-terms";
import CalculationSummary from "../invoice-formlets/calculations-summary";
import { useFormContext } from "react-hook-form";
import { InvoiceFormSchema } from "@/lib/miscellany/schema";
import z4 from "zod/v4";

export default function AggregatedInvoiceForm() {
  const { handleSubmit, formState } =
    useFormContext<z4.infer<typeof InvoiceFormSchema>>();
  function onSubmit(data: z4.infer<typeof InvoiceFormSchema>) {
    console.log(data);
  }

  return (
    <Card className="invoice-bg-light border-0 dark:border border-t-2">
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
          <SimpleFormDetailsGroup />
          <FieldGroup>
            <AddCustomFields />
          </FieldGroup>
          <FieldSet>
            <InvoiceItems />
          </FieldSet>
          <FieldGroup className="flex-row">
            <NotesAndTerms />
          </FieldGroup>
          <FieldSet>
            <CalculationSummary />
          </FieldSet>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="submit"
            form="form-invoice-aggregate"
            className="w-full max-w-3xs mx-auto mt-5 bg-green-800 font-bold tracking-wider text-md hover:scale-90 hover:bg-green-700"
            disabled={!formState.isValid || formState.isSubmitting}
          >
            Generate
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
