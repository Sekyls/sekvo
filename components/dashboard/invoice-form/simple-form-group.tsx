import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CLIENT_DETAILS_FIELDS } from "@/lib/constants";
import { RecipientFieldGroupsProps } from "@/lib/types";
import { Controller } from "react-hook-form";
import ContactPerson from "./contact-person";
import PhoneNumber from "./phone-number";
import { useCalendarHook } from "@/hooks/use-calendar";
import { useCalendarHook2 } from "@/hooks/use-calendar2";
import SenderLogo from "./logo-input";
import InvoiceDatePicker from "./invoice-date-picker";
import DueDatePicker from "./due-date-picker";

export default function SimpleFormDetailsGroup({
  formControl,
}: RecipientFieldGroupsProps) {
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
  const {
    calendarDate,
    calendarMonth,
    calendarValue,
    isopen,
    setCalendarDate,
    setCalendarMonth,
    setCalendarValue,
    setIsOpen,
  } = useCalendarHook2();
  return (
    <FieldGroup className="grid grid-cols-2 justify-between">
      {CLIENT_DETAILS_FIELDS.map((item) => {
        return (
          <Controller
            key={item.fieldName}
            name={item.fieldName}
            control={formControl}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="max-w-sm">
                <FieldLabel htmlFor={item.fieldName}>{item.label}</FieldLabel>
                <Input
                  {...field}
                  value={field.value as string}
                  id={item.fieldName}
                  aria-invalid={fieldState.invalid}
                  placeholder={item.placeholder}
                  autoComplete="on"
                  className="invoice-bg-light"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        );
      })}
      <ContactPerson formControl={formControl} formState={null} />
      <PhoneNumber formControl={formControl} formState={null} />
      <SenderLogo formControl={formControl} formState={null} />
      <InvoiceDatePicker
        date={date}
        isValidDate={isValidDate}
        month={month}
        open={open}
        setDate={setDate}
        setMonth={setMonth}
        setOpen={setOpen}
        setValue={setValue}
        value={value}
      />
      <DueDatePicker
        date={calendarDate}
        isValidDate={isValidDate}
        month={calendarMonth}
        open={isopen}
        setDate={setCalendarDate}
        setMonth={setCalendarMonth}
        setOpen={setIsOpen}
        setValue={setCalendarValue}
        value={calendarValue}
      />
    </FieldGroup>
  );
}
