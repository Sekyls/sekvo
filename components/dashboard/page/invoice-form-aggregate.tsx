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
import { useFormContext } from "react-hook-form";
import {
  InvoiceFormDataSchema,
  InvoiceFormSchema,
} from "@/lib/miscellany/schema";
import useCalcSummary from "@/hooks/use-calculation-summary";
import z4 from "zod/v4";
import SimpleFormDetailsGroup from "../invoice-formlets/simple-form-group";
import AddCustomFields from "../invoice-formlets/add-custom-fields";
import InvoiceItems from "../invoice-formlets/aggregate-invoice-items";
import NotesAndTerms from "../invoice-formlets/notes-terms";
import CalculationSummary from "../invoice-formlets/calculations-summary";
import PaymentMethods from "../invoice-formlets/payment-methods";
import SignatureBlock from "../invoice-formlets/signature-block";
import { toastError, toastSuccess } from "@/lib/miscellany/toast-config";
import { HTTPResponseType } from "@/lib/miscellany/types";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/miscellany/utils";
import { useRouter } from "next/navigation";

export default function AggregatedInvoiceForm() {
  const router = useRouter();
  const { handleSubmit, formState, reset } =
    useFormContext<z4.infer<typeof InvoiceFormSchema>>();
  const {
    grandTotal,
    aggregateSubTotals,
    discount: calculatedDiscount,
    tax: calculatedTax,
    utilisePercentDiscount,
    utilisePercentTax,
    utiliseTaxableShipping,
    currency,
  } = useCalcSummary();

  async function onSubmit(values: z4.infer<typeof InvoiceFormSchema>) {
    try {
      const methodIsSelected = Object.values(values.paymentMethods).filter(
        (method) => method
      );
      if (methodIsSelected.length < 1) {
        throw new Error("Select at least one payment method");
      }

      const data: z4.infer<typeof InvoiceFormDataSchema> = {
        ...values,
        grandTotal,
        aggregateSubTotals,
        calculatedDiscount,
        calculatedTax,
        utilisePercentDiscount,
        utilisePercentTax,
        utiliseTaxableShipping,
        currency,
      };

      const invoiceFormData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === "object" && value instanceof File) {
          invoiceFormData.append(key, value);
        } else {
          invoiceFormData.append(key, JSON.stringify(value));
        }
      });

      const response = await fetch("/api/invoice/save-invoice", {
        method: "POST",
        body: invoiceFormData,
      });

      const parsedResponse: HTTPResponseType = await response.json();

      if (response.status === 401 || parsedResponse.error?.code === 401) {
        toastError(parsedResponse.error?.message || "", undefined, undefined);
        return router.replace("/auth/login");
      }

      if (!response.ok || !parsedResponse.success) {
        return toastError(
          parsedResponse.error?.message || "",
          undefined,
          undefined
        );
      }
      toastSuccess(parsedResponse.message || "", undefined, undefined);
      window.open(`/invoive-preview/${parsedResponse.data}`, "_blank");
    } catch (error) {
      if (error instanceof Error) {
        return toastError(error.message, undefined, undefined);
      }
    }
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
          <PaymentMethods />
          <SignatureBlock />
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
            Generate{" "}
            <Spinner
              className={cn(
                "hidden",
                formState.isLoading || formState.isSubmitting ? "block" : ""
              )}
            />
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
