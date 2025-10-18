"use client";
import { InvoiceFormSchema } from "@/lib/miscellany/schema";
import { CalculationSummaryExtras, Switches } from "@/lib/miscellany/types";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import z4 from "zod/v4";
import useInvoiceItems from "./use-invoice-items";

export default function useCalcSummary() {
  const [discountIsChecked, setDiscountIsChecked] = useState<boolean>(false);
  const [taxIsChecked, setTaxIsChecked] = useState<boolean>(false);
  const [shippingIsChecked, setShippingIsChecked] = useState<boolean>(false);
  const [utilisePercentDiscount, setUtilisePercentDiscount] =
    useState<boolean>(false);
  const [utilisePercentTax, setUtilisePercentTax] = useState<boolean>(false);
  const [utiliseTaxableShipping, setUtiliseTaxableShipping] =
    useState<boolean>(true);
  const { watch } = useFormContext<z4.infer<typeof InvoiceFormSchema>>();
  const { fields } = useInvoiceItems();
  const receivedDiscount = watch("discount");
  const receivedTax = watch("tax");
  const receivedShipping = watch("shipping");
  const [aggregateSubTotals, setAggregateSubTotals] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const invoiceItemsSubTotals = fields.map((_, index) => {
    return watch(`invoiceItems.${index}.subTotal`);
  });

  // calculate raw items total price aggregate
  useEffect(() => {
    let subTotalsAggregate: number = 0;
    invoiceItemsSubTotals.forEach((item) => {
      subTotalsAggregate += parseFloat(item);
    });
    setAggregateSubTotals(subTotalsAggregate);
  }, [invoiceItemsSubTotals]);

  // calculate discount amount
  useEffect(() => {
    if (
      receivedDiscount &&
      parseFloat(receivedDiscount) > 0 &&
      utilisePercentDiscount &&
      aggregateSubTotals > 0
    ) {
      setDiscount((parseFloat(receivedDiscount) / 100) * aggregateSubTotals);
    }
    if (
      receivedDiscount &&
      parseFloat(receivedDiscount) > 0 &&
      !utilisePercentDiscount &&
      aggregateSubTotals > 0
    ) {
      setDiscount(parseFloat(receivedDiscount));
    }
  }, [receivedDiscount, utilisePercentDiscount, aggregateSubTotals]);

  // calculate tax amount
  useEffect(() => {
    // calculate tax amount with Taxable Shipping
    if (
      receivedTax &&
      parseFloat(receivedTax) > 0 &&
      aggregateSubTotals > 0 &&
      discount > 0 &&
      utilisePercentTax &&
      utiliseTaxableShipping
    ) {
      setTax(
        (parseFloat(receivedTax) / 100) *
          (aggregateSubTotals - discount + shipping)
      );
    }

    // calculate tax amount without Taxable Shipping
    if (
      receivedTax &&
      parseFloat(receivedTax) > 0 &&
      aggregateSubTotals > 0 &&
      discount > 0 &&
      utilisePercentTax &&
      !utiliseTaxableShipping
    ) {
      setTax((parseFloat(receivedTax) / 100) * (aggregateSubTotals - discount));
    }
    if (
      receivedTax &&
      parseFloat(receivedTax) > 0 &&
      aggregateSubTotals > 0 &&
      discount > 0 &&
      !utilisePercentTax
    ) {
      setTax(parseFloat(receivedTax));
    }
  }, [
    receivedTax,
    aggregateSubTotals,
    discount,
    utilisePercentTax,
    utiliseTaxableShipping,
    shipping,
  ]);

  // calculate shipping
  useEffect(() => {
    if (receivedShipping && parseFloat(receivedShipping) > 0) {
      setShipping(parseFloat(receivedShipping));
    }
  }, [receivedShipping]);

  useEffect(() => {
    setGrandTotal(aggregateSubTotals - discount + tax + shipping);
  }, [aggregateSubTotals, discount, tax, shipping]);

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
    tax,
    discount,
    shipping,
    utiliseTaxableShipping,
    grandTotal,
  };
}
