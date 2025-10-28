"use client";
import { Binary, Ellipsis, Link, ShieldUser, Split } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import z4 from "zod/v4";
import { InvoiceFormSchema } from "@/lib/miscellany/schema";

export default function usePaymentMethod() {
  const [mtnMomo, setMtnMomo] = useState<boolean>(false);
  const [tCash, setTCash] = useState<boolean>(false);
  const [atCash, setATCash] = useState<boolean>(false);
  const [bank, setBank] = useState<boolean>(false);
  const [paymentGateway, setPaymentGateway] = useState<boolean>(false);
  const [cheque, setCheque] = useState<boolean>(false);
  const [cash, setCash] = useState<boolean>(false);
  const [other, setOther] = useState<boolean>(false);
  const { control, setValue } =
    useFormContext<z4.infer<typeof InvoiceFormSchema>>();

  const PAYMENT_METHODS = [
    {
      showInput: true,
      inputFieldLabel: "MTN Mobile Money",
      inputFields: [
        {
          name: "paymentMethods.mtnMobileMoney.accountName",
          label: "Account Name",
          icon: <ShieldUser />,
          type: "text",
          placeholder: "e.g. Sekvo Ventures",
        },
        {
          name: "paymentMethods.mtnMobileMoney.accountNumber",
          label: "Account Number",
          icon: <Binary />,
          type: "number",
          placeholder: "e.g. 0547561490",
        },
      ],
      icon: "/payments/momo.png",
      state: mtnMomo,
      setState: setMtnMomo,
      checked: "paymentMethods.mtnMobileMoney.checked",
    },
    {
      showInput: true,
      inputFieldLabel: "Telecel Cash",
      inputFields: [
        {
          name: "paymentMethods.telecelCash.accountName",
          label: "Account Name",
          icon: <ShieldUser />,
          type: "text",
          placeholder: "e.g. Sekvo Ventures",
        },
        {
          name: "paymentMethods.telecelCash.accountNumber",
          label: "Account Number",
          icon: <Binary />,
          type: "number",
          placeholder: "e.g. 0547561490",
        },
      ],
      icon: "/payments/tcash.png",
      state: tCash,
      setState: setTCash,
      checked: "paymentMethods.telecelCash.checked",
    },
    {
      showInput: true,
      inputFieldLabel: "AirtelTigo Money",
      inputFields: [
        {
          name: "paymentMethods.atMoney.accountName",
          label: "Account Name",
          icon: <ShieldUser />,
          type: "text",
          placeholder: "e.g. Sekvo Ventures",
        },
        {
          name: "paymentMethods.atMoney.accountNumber",
          label: "Account Number",
          icon: <Binary />,
          type: "number",
          placeholder: "e.g. 0547561490",
        },
      ],
      icon: "/payments/atmoney.png",
      state: atCash,
      setState: setATCash,
      checked: "paymentMethods.atMoney.checked",
    },
    {
      showInput: true,
      inputFieldLabel: "Bank Transfer",
      inputFields: [
        {
          name: "paymentMethods.bankTransfer.accountName",
          label: "Account Name",
          icon: <ShieldUser />,
          type: "text",
          placeholder: "e.g. Sekvo Ventures",
        },
        {
          name: "paymentMethods.bankTransfer.accountNumber",
          label: "Account Number",
          icon: <Binary />,
          type: "text",
          placeholder: "e.g. 0547561490",
        },
        {
          name: "paymentMethods.bankTransfer.branch",
          label: "Branch",
          icon: <Split />,
          type: "text",
          placeholder: "enter your bank branch",
        },
      ],
      icon: "/payments/banks.png",
      state: bank,
      setState: setBank,
      checked: "paymentMethods.bankTransfer.checked",
    },
    {
      showInput: true,
      inputFieldLabel: "Payment Gateways",
      inputFields: [
        {
          name: "paymentMethods.paymentGateway.link",
          label: null,
          icon: <Link />,
          type: "url",
          placeholder: "enter link to payment gateway",
        },
      ],
      icon: "/payments/gateways.png",
      state: paymentGateway,
      setState: setPaymentGateway,
      checked: "paymentMethods.paymentGateway.checked",
    },
    {
      showInput: false,
      inputFieldLabel: "Cheque",
      inputFields: null,
      icon: "/payments/cheque.png",
      state: cheque,
      setState: setCheque,
      checked: "paymentMethods.cheque.checked",
    },
    {
      showInput: false,
      inputFieldLabel: "Cash",
      inputFields: null,
      icon: "/payments/cash.png",
      state: cash,
      setState: setCash,
      checked: "paymentMethods.cash.checked",
    },
    {
      showInput: true,
      inputFieldLabel: "Others",
      inputFields: [
        {
          name: "paymentMethods.others.specifyOther",
          label: null,
          icon: <Ellipsis />,
          type: "text",
          placeholder: "specify others...",
        },
      ],
      icon: "/payments/others.png",
      state: other,
      setState: setOther,
      checked: "paymentMethods.others.checked",
    },
  ];
  return { PAYMENT_METHODS, setValue, control };
}
