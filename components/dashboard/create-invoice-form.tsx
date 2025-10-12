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
import { useCalendarHook } from "@/hooks/use-calendar";
import ContactPerson from "./invoice-form/contact-person";
import PhoneNumber from "./invoice-form/phone-number";
import SimpleFormDetailsGroup from "./invoice-form/simple-form-group";
import CalendarDatePicker from "./invoice-form/date-picker";
import AddCustomFields from "./invoice-form/add-custom-fields";
import InvoiceItems from "./invoice-form/add-invoice-items";
import NotesAndTerms from "./invoice-form/notes-terms";

export default function AggregatedInvoiceForm() {
  const { handleSubmit, control, formState } = useForm<
    z.infer<typeof InvoiceFormSchema>
  >({
    resolver: zodResolver(InvoiceFormSchema),
    mode: "all",
    defaultValues: {
      companyAddress: "",
      companyEmail: "",
      companyName: "",
      invoiceItems: [{ description: "", item: "", quantity: "", unitPrice: 0 }],
    },
  });
  const {
    date,
    isValidDate,
    month,
    open,
    setDate,
    setMonth,
    setOpen,
    setValue,
    value,
  } = useCalendarHook();
  function onSubmit(data: z.infer<typeof InvoiceFormSchema>) {}

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create your invoice</CardTitle>
        <CardDescription>Fill in your invoice details </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-invoice-aggregate" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <SimpleFormDetailsGroup
              formControl={control}
              formState={formState}
            />
            <ContactPerson formControl={control} formState={formState} />
            <PhoneNumber formControl={control} formState={formState} />
            {["Invoice Date", "Due Date"].map((label, index) => {
              return (
                <CalendarDatePicker
                  date={date}
                  isValidDate={isValidDate}
                  label={label}
                  month={month}
                  open={open}
                  setDate={setDate}
                  setMonth={setMonth}
                  setOpen={setOpen}
                  setValue={setValue}
                  value={value}
                  key={index}
                />
              );
            })}
          </FieldGroup>
          <FieldGroup>
            <AddCustomFields formControl={control} formState={formState} />
          </FieldGroup>
          <FieldSet>
            <InvoiceItems formControl={control} formState={formState} />
          </FieldSet>
          <FieldGroup>
            <NotesAndTerms formControl={control} formState={formState} />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" form="form-invoice-aggregate">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
