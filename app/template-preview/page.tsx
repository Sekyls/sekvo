import InvoiceTemplateI from "@/components/invoice-templates/template-I";
import InvoiceTemplateII from "@/components/invoice-templates/template-II";
import InvoiceTemplateIII from "@/components/invoice-templates/template-III";
import InvoiceTemplateIV from "@/components/invoice-templates/template-IV";
import { Fragment } from "react";

export default function page() {
  return (
    <Fragment>
      <InvoiceTemplateI />
      <InvoiceTemplateII />
      <InvoiceTemplateIII />
      <InvoiceTemplateIV />
    </Fragment>
  );
}
