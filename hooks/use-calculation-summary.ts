"use client";
import { InvoiceFormSchema } from "@/lib/miscellany/schema";
import { CalculationSummaryExtras, Switches } from "@/lib/miscellany/types";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import z4 from "zod/v4";

export default function useCalcSummary() {
  const [discountIsChecked, setDiscountIsChecked] = useState<boolean>(false);
  const [taxIsChecked, setTaxIsChecked] = useState<boolean>(false);
  const [shippingIsChecked, setShippingIsChecked] = useState<boolean>(false);
  const [utilisePercentDiscount, setUtilisePercentDiscount] =
    useState<boolean>(false);
  const [utilisePercentTax, setUtilisePercentTax] = useState<boolean>(false);
  const [grandTotal, setGrandTotal] = useState<number>();
  const { watch, control } =
    useFormContext<z4.infer<typeof InvoiceFormSchema>>();
  const invoiceItems = useWatch({ control, name: "invoiceItems" });
  const discount = watch("discount");
  const tax = watch("tax");
  const shipping = watch("shipping");

  useEffect(() => {
    let subTotalsAggregate: number = 0;
    invoiceItems.forEach((item) => {
      const subTotal = parseFloat(item.subTotal);
      subTotalsAggregate += subTotal;
    });
    if (
      discountIsChecked &&
      discount &&
      parseFloat(discount) > 0 &&
      utilisePercentDiscount &&
      subTotalsAggregate > 0
    ) {
      subTotalsAggregate += (parseFloat(discount) / 100) * subTotalsAggregate;
    }
    if (
      discountIsChecked &&
      discount &&
      parseFloat(discount) > 0 &&
      !utilisePercentDiscount &&
      subTotalsAggregate > 0
    ) {
      subTotalsAggregate += parseFloat(discount);
    }
    if (
      taxIsChecked &&
      tax &&
      parseFloat(tax) > 0 &&
      utilisePercentTax &&
      subTotalsAggregate > 0
    ) {
      subTotalsAggregate += (parseFloat(tax) / 100) * subTotalsAggregate;
    }
    if (
      taxIsChecked &&
      tax &&
      parseFloat(tax) > 0 &&
      !utilisePercentTax &&
      subTotalsAggregate > 0
    ) {
      subTotalsAggregate += parseFloat(tax);
    }
    if (
      shippingIsChecked &&
      shipping &&
      parseFloat(shipping) > 0 &&
      subTotalsAggregate > 0
    ) {
      subTotalsAggregate += parseFloat(shipping);
    }
    setGrandTotal(subTotalsAggregate);
  }, [
    invoiceItems,
    discount,
    tax,
    shipping,
    discountIsChecked,
    taxIsChecked,
    shippingIsChecked,
    utilisePercentDiscount,
    utilisePercentTax,
  ]);

  const CALCULATION_EXTRAS: CalculationSummaryExtras[] = [
    {
      id: "discount",
      label: "Discount",
      isChecked: discountIsChecked,
      hasToggle: true,
      utilisePercentage: utilisePercentDiscount,
      setUtilisePercentage: setUtilisePercentDiscount,
      placeholder: utilisePercentDiscount
        ? "percentage | e.g. 10%"
        : "fixed amount | e.g. $50",
    },
    {
      id: "tax",
      label: "Tax",
      isChecked: taxIsChecked,
      hasToggle: true,
      utilisePercentage: utilisePercentTax,
      setUtilisePercentage: setUtilisePercentTax,
      placeholder: utilisePercentTax
        ? "percentage | e.g. 10%"
        : "fixed amount | e.g. $50",
    },
    {
      id: "shipping",
      label: "Shipping",
      isChecked: shippingIsChecked,
      hasToggle: false,
      utilisePercentage: null,
      setUtilisePercentage: null,
      placeholder: "fixed amount | e.g. $200",
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
    grandTotal,
  };
}
