"use client";
import { CalculationSummaryExtras, Switches } from "@/lib/miscellany/types";
import { useState } from "react";

export default function useCalcSummary() {
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
      id: "discount",
      label: "Discount",
      isChecked: discountIsChecked,
      inputState: discount,
      setInputState: setDiscount,
      hasToggle: true,
      ratioToggleState: discountRatioTypeToggle,
      setRatioToggleState: setDiscountRatioTypeToggle,
      placeholder: "e.g. 10% | $50",
    },
    {
      id: "tax",
      label: "Tax",
      isChecked: taxIsChecked,
      inputState: tax,
      setInputState: setTax,
      hasToggle: true,
      ratioToggleState: taxRatioTypeToggle,
      setRatioToggleState: setTaxRatioTypeToggle,
      placeholder: "e.g. $100",
    },
    {
      id: "shipping",
      label: "Shipping",
      isChecked: shippingIsChecked,
      inputState: shipping,
      setInputState: setShipping,
      hasToggle: false,
      ratioToggleState: null,
      setRatioToggleState: null,
      placeholder: "e.g. $200",
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

  return {
    CALCULATION_EXTRAS,
    SWITCH_ITEMS,
  };
}
