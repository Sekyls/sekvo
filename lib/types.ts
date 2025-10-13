import { Control, FormState } from "react-hook-form";
import z4 from "zod/v4";
import { InvoiceFormSchema } from "./schema";
import React, { SetStateAction } from "react";

export interface SekvoOTPEmailProps {
  otp: number;
}

export interface RecipientFieldGroupsProps {
  formControl: Control<z4.infer<typeof InvoiceFormSchema>>;
  formState: FormState<z4.infer<typeof InvoiceFormSchema>> | null;
}

export interface ClientDetails {
  fieldName:
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
    | "contactPerson.title"
    | "contactPerson.name"
    | `customInvoiceFields.${number}`
    | `customInvoiceFields.${number}.label`;
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
}

export type CurrencyOption = {
  value: string;
  label: string;
};
