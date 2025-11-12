"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InvoiceFormSchema } from "@/lib/miscellany/schema";
import { CalendarProps } from "@/lib/miscellany/types";
import { formatCalendarDate } from "@/lib/miscellany/utils";
import { CalendarIcon } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import z4 from "zod/v4";

export default function DatePicker({
  date,
  isValidDate,
  month,
  open,
  setDate,
  setMonth,
  setOpen,
  label,
  fieldName,
}: CalendarProps) {
  const { control } = useFormContext<z4.infer<typeof InvoiceFormSchema>>();
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field: controllerField, fieldState }) => (
        <Field
          orientation="horizontal"
          data-invalid={fieldState.invalid}
          className="block space-y-2"
        >
          <FieldLabel htmlFor={fieldName}>
            {label}
            <span className="text-imperial-red font-black">*</span>
          </FieldLabel>
          <FieldContent className="max-w-sm space-y-2">
            <FieldGroup className="relative">
              <Input
                id={fieldName}
                value={controllerField.value as string}
                placeholder={formatCalendarDate(new Date())}
                className="bg-background pr-10 invoice-bg-light"
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  if (isValidDate(date)) {
                    setDate(date);
                    setMonth(date);
                    controllerField.onChange(formatCalendarDate(date));
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setOpen(true);
                  }
                }}
              />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="date-picker"
                    variant="ghost"
                    className="absolute top-1/2 right-2 size-6 -translate-y-1/2 hover:bg-transparent! group"
                  >
                    <CalendarIcon className="size-5 hover:bg-transparent! group-hover:text-accent" />
                    <span className="sr-only">Select date</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="end"
                  alignOffset={-8}
                  sideOffset={10}
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    month={month}
                    onMonthChange={setMonth}
                    onSelect={(date) => {
                      setDate(date);
                      controllerField.onChange(formatCalendarDate(date));
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </FieldGroup>
          </FieldContent>
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className="text-center" />
          )}
        </Field>
      )}
    />
  );
}
