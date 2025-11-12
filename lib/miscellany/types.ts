import { Dispatch, ReactNode, SetStateAction } from "react";
import { FieldArrayWithId, Path, UseFieldArrayRemove } from "react-hook-form";
import z4 from "zod/v4";
import { InvoiceFormDataSchema, InvoiceFormSchema } from "./schema";

export interface SekvoOTPEmailProps {
  otp: number;
}

export type FieldNames = Path<z4.infer<typeof InvoiceFormSchema>>;

export interface RecipientDetails {
  fieldName: FieldNames;
  label: string;
  placeholder: string;
  isSimpleForm: boolean;
  isRequired: boolean;
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

export interface PaymentMethodDetailsProps {
  showAccountName?: boolean;
  showAccountNumber?: boolean;
  showBranch?: boolean;
  showGateway?: boolean;
  showOthers?: boolean;
}

type UserObject = {
  email: string;
  name: string;
  phoneNumber: string;
  logo: Uint8Array<ArrayBufferLike> | null;
  address: string;
} | null;

export type InvoiceTemplateData = z4.infer<typeof InvoiceFormDataSchema> &
  UserObject;
