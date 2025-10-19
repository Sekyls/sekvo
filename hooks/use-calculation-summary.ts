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
  const currency = watch(`invoiceItems.0.unitPrice.currency`);
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
      utilisePercentage: utilisePercentDiscount,
      setUtilisePercentage: setUtilisePercentDiscount,
      placeholder: utilisePercentDiscount
        ? "percentage | e.g. 10%"
        : "fixed amount | e.g. $50",
      infoTitle: "Discount calculation",
      infoDescription: [
        " You can set a discount as either a percentage of the total item price or as a fixed amount.Toggle",
        " between percentage and fixed value using the toggle icon",
      ],
      setUtiliseTaxableShipping: null,
      utiliseTaxableShipping: null,
    },
    {
      id: "tax",
      label: "Tax",
      isChecked: taxIsChecked,
      utilisePercentage: utilisePercentTax,
      setUtilisePercentage: setUtilisePercentTax,
      placeholder: utilisePercentTax
        ? "percentage | e.g. 10%"
        : "fixed amount | e.g. $50",
      infoTitle: "Tax Calculation",
      infoDescription: [
        "Choose tax as a percentage or fixed amount via the toggle",
        ". Tax is applied to the total after discounts. By default shipping is taxable; toggle",
        "shipping in the shipping section to change this.",
      ],
      setUtiliseTaxableShipping: null,
      utiliseTaxableShipping: null,
    },
    {
      id: "shipping",
      label: "Shipping",
      isChecked: shippingIsChecked,
      utilisePercentage: null,
      setUtilisePercentage: null,
      placeholder: utiliseTaxableShipping
        ? "taxable | e.g. $200"
        : "non-taxable | e.g.$100",
      infoTitle: "Shipping calculation",
      infoDescription: [
        "Shipping is a fixed amount and by default it is taxable. Use the toggle",
        " to include or exclude it from taxation.",
      ],
      setUtiliseTaxableShipping: setUtiliseTaxableShipping,
      utiliseTaxableShipping: utiliseTaxableShipping,
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
    grandTotal,
    currency,
  };
}
