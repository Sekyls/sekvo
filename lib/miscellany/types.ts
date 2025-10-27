import { Dispatch, ReactNode, SetStateAction } from "react";
import { FieldArrayWithId, UseFieldArrayRemove } from "react-hook-form";
import z4 from "zod/v4";
import { InvoiceFormSchema } from "./schema";

export interface SekvoOTPEmailProps {
  otp: number;
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
  setOpen: Dispatch<SetStateAction<boolean>>;
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  month: Date | undefined;
  setMonth: Dispatch<SetStateAction<Date | undefined>>;
  isValidDate: (date: Date | undefined) => boolean;
  label: string;
  fieldName: FieldNames;
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
  isChecked: boolean;
  utilisePercentage: boolean | null;
  setUtilisePercentage: Dispatch<SetStateAction<boolean>> | null;
  placeholder: string;
  infoTitle: string;
  infoDescription: string[];
  utiliseTaxableShipping: boolean | null;
  setUtiliseTaxableShipping: Dispatch<SetStateAction<boolean>> | null;
}

export interface InvoiceFormProviderProps {
  children: ReactNode;
}

export interface InvoiceFieldItemsProps {
  index: number;
  field: FieldArrayWithId<z4.infer<typeof InvoiceFormSchema>>;
  fields: FieldArrayWithId<z4.infer<typeof InvoiceFormSchema>>[];
  remove: UseFieldArrayRemove;
}


