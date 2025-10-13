import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarProps } from "@/lib/types";
import { formatCalendarDate } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

export default function InvoiceDatePicker({
  date,
  isValidDate,
  month,
  open,
  setDate,
  setMonth,
  setOpen,
  setValue,
  value,
}: CalendarProps) {
  return (
    <div className="max-w-sm space-y-2">
      <FieldLabel htmlFor="invoiceDate">Invoice Date</FieldLabel>
      <FieldGroup className="relative">
        <Input
          id="invoiceDate"
          value={value}
          placeholder={new Date().toISOString().slice(0, 10)}
          className="bg-background pr-10"
          onChange={(e) => {
            const date = new Date(e.target.value);
            setValue(e.target.value);
            if (isValidDate(date)) {
              setDate(date);
              setMonth(date);
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
              <CalendarIcon className="size-5 group-hover:text-accent hover:bg-transparent!" />
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
                setValue(formatCalendarDate(date));
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </FieldGroup>
    </div>
  );
}
