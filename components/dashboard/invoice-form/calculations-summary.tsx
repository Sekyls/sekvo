"use client";
import { ButtonGroup } from "@/components/ui/button-group";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CalculationSummaryExtras, Switches } from "@/lib/types";
import { IconCheck } from "@tabler/icons-react";
import { Repeat } from "lucide-react";
import { useState, Dispatch, SetStateAction } from "react";
import { string } from "zod";
import { id } from "zod/v4/locales";

export default function CalculationSummary() {
  const [discountIsChecked, setDiscountIsChecked] = useState<boolean>(false);
  const [taxIsChecked, setTaxIsChecked] = useState<boolean>(false);
  const [shippingIsChecked, setShippingIsChecked] = useState<boolean>(false);
  const [discountRatioTypeToggle, setDiscountRatioTypeToggle] =
    useState<boolean>(false);
  const [taxRatioTypeToggle, setTaxRatioTypeToggle] = useState<boolean>(false);
  const [discount, setDiscount] = useState<string>("");
  const [tax, setTax] = useState<string>("");
  const [shipping, setShipping] = useState<string>("");

  const CALCULATION_EXTRAS: CalculationSummaryExtras[] = [
    {
      id: "discount-on-total",
      label: "Discount",
      inputState: discount,
      setInputState: setDiscount,
      hasToggle: true,
      ratioToggleState: discountRatioTypeToggle,
      setRatioToggleState: setDiscountRatioTypeToggle,
      placeholder: "",
    },
    {
      id: "tax-on-total",
      label: "Tax",
      inputState: tax,
      setInputState: setTax,
      hasToggle: true,
      ratioToggleState: taxRatioTypeToggle,
      setRatioToggleState: setTaxRatioTypeToggle,
      placeholder: "",
    },
    {
      id: "shipping-on-total",
      label: "Shipping",
      inputState: shipping,
      setInputState: setShipping,
      hasToggle: false,
      ratioToggleState: null,
      setRatioToggleState: null,
      placeholder: "",
    },
  ];

  const SWITCH_ITEMS: Switches[] = [
    {
      id: "discount-switch",
      label: "Discount",
      state: discountIsChecked,
      setState: setDiscountIsChecked,
    },
    {
      id: "tax-switch",
      label: "Tax",
      state: taxIsChecked,
      setState: setTaxIsChecked,
    },
    {
      id: "shipping-switch",
      label: "Shipping",
      state: shippingIsChecked,
      setState: setShippingIsChecked,
    },
  ];

  return (
    <FieldGroup>
      <ButtonGroup className="flex flex-row gap-5 justify-between w-full max-w-sm">
        {SWITCH_ITEMS.map((item) => {
          return (
            <div className="flex items-center space-x-2" key={item.id}>
              <Switch
                id={item.id}
                onClick={() => {
                  item.setState(!item.state);
                }}
                className="shadow-md shadow-foreground/40"
              />
              <Label htmlFor={item.id} >{item.label}</Label>
            </div>
          );
        })}
      </ButtonGroup>
      <FieldGroup className="max-w-sm">
        {CALCULATION_EXTRAS.map((item) => {
          return (
            <div
              className="grid grid-cols-[0.5fr_2fr] justify-between gap-5"
              key={item.id}
            >
              <Label>{item.label}</Label>
              <InputGroup className="gap-2 invoice-bg-light">
                <Input
                  placeholder={item.placeholder}
                  className="border-0 border-l"
                />
                {item.hasToggle && (
                  <InputGroupAddon align="inline-start">
                    <Repeat className="text-amber-600 hover:cursor-default hover:scale-110 hover:text-green-800 hover:rotate-180 transition-all duration-300 ease-in-out" />
                  </InputGroupAddon>
                )}
              </InputGroup>
            </div>
          );
        })}
      </FieldGroup>
      <div className="flex justify-between gap-5 font-bold border-t border-b py-2">
        <p>Total Amount</p>
        <p className="text-imperial-red">EUR 10</p>
      </div>
    </FieldGroup>
  );
}
