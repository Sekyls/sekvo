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
import SimpleFormDetailsGroup from "./invoice-form/simple-form-group";
import AddCustomFields from "./invoice-form/add-custom-fields";
import InvoiceItems from "./invoice-form/add-invoice-items";
import NotesAndTerms from "./invoice-form/notes-terms";
import useInvoiceForm from "@/hooks/use-invoice-form";
import CalculationSummary from "./invoice-form/calculations-summary";
import { RecipientFieldGroupsProps } from "@/lib/miscellany/types";

export default function AggregatedInvoiceForm({
  ...data
}: RecipientFieldGroupsProps) {
  const { handleSubmit, onSubmit } = useInvoiceForm();

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
          <SimpleFormDetailsGroup {...data} />
          <FieldGroup>
            <AddCustomFields {...data} />
          </FieldGroup>
          <FieldSet>
            <InvoiceItems {...data} />
          </FieldSet>
          <FieldGroup className="flex-row">
            <NotesAndTerms {...data} />
          </FieldGroup>
          <FieldSet>
            <CalculationSummary {...data} />
          </FieldSet>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="submit"
            form="form-invoice-aggregate"
            className="w-full max-w-3xs mx-auto mt-5"
            disabled={!data.formState?.isValid || data.formState?.isSubmitting}
          >
            Generate
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
