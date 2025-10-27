"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import PaymentMethodDetails from "./payment-method-details";

export default function PaymentMethods() {
  const [mtnMomo, setMtnMomo] = useState<boolean>(false);
  const [tCash, setTCash] = useState<boolean>(false);
  const [atCash, setATCash] = useState<boolean>(false);
  const [bank, setBank] = useState<boolean>(false);
  const [paymentGateway, setPaymentGateway] = useState<boolean>(false);
  const [cheque, setCheque] = useState<boolean>(false);
  const [cash, setCash] = useState<boolean>(false);
  const [other, setOther] = useState<boolean>(false);

  const PAYMENT_METHOD_CHECKLIST = [
    {
      label: "MTN MoMo",
      icon: "/payments/momo.png",
      state: mtnMomo,
      setState: setMtnMomo,
    },
    {
      label: "Telecel Cash",
      icon: "/payments/tcash.png",
      state: tCash,
      setState: setTCash,
    },
    {
      label: "AirtelTigo Money",
      icon: "/payments/atmoney.png",
      state: atCash,
      setState: setATCash,
    },
    {
      label: "Bank Transfer",
      icon: "/payments/banks.png",
      state: bank,
      setState: setBank,
    },
    {
      label: "Payment Gateway",
      icon: "/payments/gateways.png",
      state: paymentGateway,
      setState: setPaymentGateway,
    },
    {
      label: "Cheque",
      icon: "/payments/cheque.png",
      state: cheque,
      setState: setCheque,
    },
    {
      label: "Cash",
      icon: "/payments/cash.png",
      state: cash,
      setState: setCash,
    },
    {
      label: "Other",
      icon: "/payments/others.png",
      state: other,
      setState: setOther,
    },
  ];

  return (
    <FieldSet className="gap-0 space-y-5">
      <Popover>
        <Label className="max-w-sm mb-2">Payment Method</Label>
        <PopoverTrigger
          asChild
          className="max-w-sm flex bg-transparent items-center gap-x-1 text-foreground invoice-bg-light hover:bg-transparent justify-between"
        >
          <Button>
            <span className="block">Select</span> <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="space-y-2">
          {PAYMENT_METHOD_CHECKLIST.map((item, index) => {
            return (
              <Field orientation="horizontal" key={index}>
                <Checkbox
                  checked={item.state}
                  onCheckedChange={() => {
                    item.setState(!item.state);
                  }}
                />
                <FieldLabel
                  htmlFor={item.label}
                  className="font-normal flex items-center"
                >
                  {item.label}
                </FieldLabel>
              </Field>
            );
          })}
        </PopoverContent>
      </Popover>
      {mtnMomo && (
        <div className="mt-2">
          <Label className="mb-5 text-lg flex items-center">
            <span className="block">MTN Mobile Money</span>
            <Image
              src="/payments/momo.png"
              alt="MoMo"
              width={24}
              height={24}
              className="invoice-bg-light"
            />
          </Label>
          <PaymentMethodDetails
            showAccountName={true}
            showAccountNumber={true}
          />
        </div>
      )}
      {tCash && (
        <div className="mt-2">
          <Label className="mb-5 text-lg flex items-center">
            <span className="block">Telcel Cash</span>
            <Image
              src="/payments/tcash.png"
              alt="TCash"
              width={24}
              height={24}
              className="invoice-bg-light"
            />
          </Label>
          <PaymentMethodDetails
            showAccountName={true}
            showAccountNumber={true}
          />
        </div>
      )}
      {atCash && (
        <div className="mt-2">
          <Label className="mb-5 text-lg flex items-center">
            <span className="block">AirtelTigo Money</span>
            <Image
              src="/payments/atmoney.png"
              alt="ATMoney"
              width={24}
              height={24}
            />
          </Label>
          <PaymentMethodDetails
            showAccountName={true}
            showAccountNumber={true}
          />
        </div>
      )}
      {bank && (
        <div className="mt-2">
          <Label className="mb-5 text-lg flex items-center">
            <span className="block">Bank Transfer</span>
            <Image
              src="/payments/banks.png"
              alt="bank"
              width={24}
              height={24}
            />
          </Label>
          <PaymentMethodDetails
            showAccountName={true}
            showAccountNumber={true}
            showBranch={true}
          />
        </div>
      )}
      {paymentGateway && (
        <div className="mt-2">
          <Label className="mb-5 text-lg flex items-center">
            <span className="block">Payment Gateways</span>
            <Image
              src="/payments/gateways.png"
              alt="payment-gateways"
              width={24}
              height={24}
            />
          </Label>
          <PaymentMethodDetails showGateway={true} />
        </div>
      )}
      {other && (
        <div className="mt-2">
          <Label className="mb-5 text-lg flex items-center">
            <span className="block">Others</span>
            <Image
              src="/payments/others.png"
              alt="others"
              width={24}
              height={24}
            />
          </Label>
          <PaymentMethodDetails showOthers={true} />
        </div>
      )}
    </FieldSet>
  );
}
