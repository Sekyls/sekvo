import { Control, FormState } from "react-hook-form";
import z4 from "zod/v4";
import { InvoiceFormSchema } from "./schema";
import React, { Dispatch, SetStateAction } from "react";

export interface SekvoOTPEmailProps {
  otp: number;
}

export interface RecipientFieldGroupsProps {
  formControl: Control<z4.infer<typeof InvoiceFormSchema>>;
  formState: FormState<z4.infer<typeof InvoiceFormSchema>> | null;
  index?: number;
}

export type FieldNames =
  | "companyName"
  | "companyAddress"
  | "companyEmail"
  | "contactPerson"
  | "phoneNumber"
  | "purchaseOrder"
  | "invoiceNumber"
  | "invoiceDate"
  | "dueDate"
  | "customInvoiceFields"
  | "invoiceItems"
  | "notes"
  | "terms"
  | "logo"
  | "discount"
  | "tax"
  | "shipping"
  | `invoiceItems.${number}.unitPrice.price`
  | "contactPerson.title"
  | "contactPerson.name"
  | `customInvoiceFields.${number}`
  | `customInvoiceFields.${number}.label`
  | `customInvoiceFields.${number}.content`
  | `invoiceItems.${number}`
  | `invoiceItems.${number}.item`
  | `invoiceItems.${number}.quantity`
  | `invoiceItems.${number}.unitPrice`
  | `invoiceItems.${number}.description`
  | `invoiceItems.${number}.unitPrice.currency`;

export interface ClientDetails {
  fieldName: FieldNames;
  label: string;
  placeholder: string;
  isSimpleForm: boolean;
}

export interface CalendarProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  date: Date | undefined;
  setDate: React.Dispatch<SetStateAction<Date | undefined>>;
  month: Date | undefined;
  setMonth: React.Dispatch<SetStateAction<Date | undefined>>;
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
  isValidDate: (date: Date | undefined) => boolean;
  id: string;
  label: string;
}

export type CurrencyOption = {
  value: string;
  label: string;
};

export interface Switches {
  id: string;
  label: string;
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}

export interface CalculationSummaryExtras {
  id: string;
  label: string;
  hasToggle: boolean;
  isChecked: boolean;
  ratioToggleState: boolean | null;
  setRatioToggleState: Dispatch<SetStateAction<boolean>> | null;
  inputState: string;
  setInputState: Dispatch<SetStateAction<string>>;
  placeholder: string;
}
