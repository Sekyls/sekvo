import { Mail, MapPin, Phone } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import { Field, FieldLabel, FieldTitle } from "../ui/field";
import { getPDFPreview } from "@/lib/misc/preview";
import DownloadInvoice from "../misc/download-invoice";

export default async function TemplateI({
  id,
  agent,
}: {
  id: string;
  agent?: string;
}) {
  const preview = await getPDFPreview(id);
  if (!preview) {
    throw new Error("Invoice Preview failed");
  }
  const {
    customInvoiceFields,
    invoice,
    invoiceItems,
    issuerRelation,
    ownerRelation,
    paymentMethods,
    recipientContactPerson,
    signatureURL,
    issuerBrandLogoURL,
    ownerLogoURL,
  } = preview;

  const puppeteerData = {
    invoiceID: id,
    issuerBrandLogo: Boolean(invoice.issuerBrandLogo),
    ownerRelationLogo: Boolean(ownerRelation.logo),
    issuerBrandLogoURL,
    ownerLogoURL,
    ownerRelationaddress: ownerRelation.address,
    ownerRelationemail: ownerRelation.email,
    ownerRelationname: ownerRelation.name,
  };

  return (
    <>
      <div className="w-[790px] print:w-auto mx-auto px-5 py-1 invoice-pdf-font-fallback bg-white overflow-x-hidden dark:text-background">
        <header className="flex justify-between items-center gap-x-8  mb-12">
          <div className="text-invoice-templateI font-black text-3xl">
            {ownerRelation.name}
          </div>
          <div className="size-3 flex-1 bg-invoice-templateI [clip-path:polygon(12_0,100%_0,100%_100%,0_100%)]"></div>
        </header>

        <main className="text-baby-">
          {/* Sender's & Invoice data */}
          <section className="flex justify-between gap-x-16 mb-16">
            {/* Left Section */}
            <div className="space-y-3">
              <div className="flex gap-x-2.5 items-start">
                <MapPin
                  fill="#323232"
                  color="#ffff"
                  className="mt-0.5 shrink-0 -ml-1"
                  size={18}
                />
                <span className="text-sm leading-relaxed">
                  {ownerRelation.address}
                </span>
              </div>
              <div className="flex gap-x-2.5 items-center">
                <Phone
                  fill="#323232"
                  color="#ffff"
                  size={18}
                  className="shrink-0"
                />
                <span className="text-sm">{ownerRelation.phoneNumber}</span>
              </div>
              <div className="flex gap-x-2.5 items-center">
                <Mail size={18} className="shrink-0" />
                <span className="text-sm">{ownerRelation.email}</span>
              </div>
            </div>

            {/* Right section */}
            <div className="ml-auto text-right space-y-3">
              <span className="font-black text-3xl text-gray-800 block">
                Invoice |{" "}
                <span className="text-invoice-templateI">
                  {invoice.invoiceNumber}
                </span>
              </span>
              <span className="text-sm block">
                Invoice Date | {invoice.invoiceDate}
              </span>
              <span className="text-sm block">
                Due Date | {invoice.dueDate}
              </span>
              {invoice.purchaseOrder && (
                <span className="text-sm block">
                  P.O# | {invoice.purchaseOrder}
                </span>
              )}
              {customInvoiceFields && customInvoiceFields.length > 1 ? (
                <>
                  {customInvoiceFields.map((item, index) => {
                    return (
                      <span className="text-sm block" key={index}>
                        {item.label} | {item.content}
                      </span>
                    );
                  })}
                </>
              ) : null}
            </div>
          </section>

          {/* Recipient Info & Due Amount */}
          <section className="flex items-center justify-between mb-16">
            {/* Left section */}
            <div className="grid grid-cols-[3%_97%] items-center flex-1">
              <div className="h-full w-1 bg-invoice-templateI"></div>
              <div className="font-roboto">
                <p className="font-bold text-lg">{invoice.recipientName}</p>
                <span className="text-sm block leading-relaxed">
                  {invoice.recipientAddress}
                </span>
                {invoice.recipientEmail && (
                  <span className="text-sm block">
                    {invoice.recipientEmail}
                  </span>
                )}
                {recipientContactPerson && recipientContactPerson.name && (
                  <span className="text-sm block text-muted-foreground italic">
                    {recipientContactPerson.title} {recipientContactPerson.name}
                  </span>
                )}
                {invoice.recipientPhoneNumber && (
                  <span className="text-sm block text-muted-foreground italic">
                    {invoice.recipientPhoneNumber}
                  </span>
                )}
              </div>
            </div>
            {/* Right Section */}
            <div className="bg-invoice-templateI text-white flex justify-between items-center py-1 px-6 gap-x-10 [clip-path:polygon(20_0,100%_0,100%_100%,0_100%)]">
              <p className="text-sm font-medium">Total Due |</p>
              <p className="font-black text-xl">
                {invoice.currency} {invoice.grandTotal.toLocaleString()}
              </p>
            </div>
          </section>

          {/* Invoice items */}
          <section className="mb-12">
            <Table className="w-full table-fixed overflow-x-hidden border-collapse">
              <colgroup>
                <col style={{ width: "40%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>
              <TableHeader>
                <TableRow>
                  <TableHead className="flex items-center gap-x-2.5 font-bold text-invoice-templateI text-base pb-4">
                    <div className="w-3 h-3 bg-invoice-templateI -ml-2"></div>
                    <span>Item Description</span>
                  </TableHead>
                  <TableHead className="font-bold text-invoice-templateI text-base pb-4 text-center">
                    Unit Price
                  </TableHead>
                  <TableHead className="font-bold text-invoice-templateI text-base pb-4 text-center">
                    Quantity
                  </TableHead>
                  <TableHead className="font-bold text-invoice-templateI text-base pb-4 text-right">
                    Total
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="border border-t-2 border-invoice-templateI">
                {invoiceItems.map((item, index) => (
                  <TableRow key={index} className="break-inside-avoid">
                    <TableCell className="font-medium py-4 px-4">
                      <span className="text-sm block">{item.item}</span>
                      {item.description && (
                        <span className="text-muted-foreground font-normal text-xs mt-1 block leading-relaxed">
                          {item.description}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-center text-sm py-4">
                      {item.currency}{" "}
                      {parseFloat(item.unitPrice).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center text-sm py-4">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right px-4 text-sm py-4 font-medium">
                      {invoice.currency}{" "}
                      {parseFloat(item.subTotal).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>

          <div className="grid grid-cols-2 gap-x-12 mb-5">
            {/* Left section */}
            <section className="space-y-4">
              <span className="block bg-gray-300 font-bold text-sm rounded w-fit px-4 py-1.5">
                Payment Method
              </span>
              <div className="py-1 space-y-4">
                {/* Payment Options */}
                {paymentMethods.mtnMobileMoney && (
                  <Field className="gap-1.5 break-inside-avoid">
                    <FieldTitle className="text-sm font-semibold">
                      MTN Mobile Money{" "}
                      <Image
                        src="/payments/momo.png"
                        alt=""
                        width={18}
                        height={18}
                      />
                    </FieldTitle>
                    <FieldLabel className="text-sm">
                      {paymentMethods.mtnMobileMoney.accountName} |{" "}
                      {paymentMethods.mtnMobileMoney.accountNumber}
                    </FieldLabel>
                  </Field>
                )}

                {paymentMethods.telecelCash && (
                  <Field className="gap-1.5 break-inside-avoid">
                    <FieldTitle className="text-sm font-semibold">
                      Telecel Cash{" "}
                      <Image
                        src="/payments/tcash.png"
                        alt=""
                        width={24}
                        height={24}
                      />
                    </FieldTitle>
                    <FieldLabel className="text-sm">
                      {paymentMethods.telecelCash.accountName} |{" "}
                      {paymentMethods.telecelCash.accountNumber}
                    </FieldLabel>
                  </Field>
                )}
                {paymentMethods.atMoney && (
                  <Field className="gap-1.5 break-inside-avoid">
                    <FieldTitle className="text-sm font-semibold">
                      AirtelTigo Money{" "}
                      <Image
                        src="/payments/atmoney.png"
                        alt=""
                        width={18}
                        height={18}
                      />
                    </FieldTitle>
                    <FieldLabel className="text-sm">
                      {paymentMethods.atMoney.accountName} |{" "}
                      {paymentMethods.atMoney.accountNumber}
                    </FieldLabel>
                  </Field>
                )}
                {paymentMethods.bankTransfer && (
                  <Field className="gap-1.5 break-inside-avoid">
                    <FieldTitle className="text-sm font-semibold">
                      Bank Transfer{" "}
                      <Image
                        src="/payments/banks.png"
                        alt=""
                        width={24}
                        height={24}
                      />
                    </FieldTitle>
                    <FieldLabel className="text-sm">
                      {paymentMethods.bankTransfer.bankName} ,{" "}
                      {paymentMethods.bankTransfer.branch} |{" "}
                      {paymentMethods.bankTransfer.accountName}
                    </FieldLabel>
                    <FieldLabel className="text-sm">
                      Account No. | {paymentMethods.bankTransfer.accountNumber}
                    </FieldLabel>
                  </Field>
                )}
                {paymentMethods.paymentGateway && (
                  <Field className="gap-1.5 break-inside-avoid">
                    <FieldTitle className="text-sm font-semibold">
                      Payment Gateway{" "}
                      <Image
                        src="/payments/gateways.png"
                        alt=""
                        width={18}
                        height={18}
                      />
                    </FieldTitle>
                    <FieldLabel className="text-sm">
                      {paymentMethods.paymentGateway.link}
                    </FieldLabel>
                  </Field>
                )}
                {paymentMethods.others && (
                  <Field className="gap-1.5 break-inside-avoid">
                    <FieldTitle className="text-sm font-semibold">
                      Others{" "}
                      <Image
                        src="/payments/others.png"
                        alt=""
                        width={18}
                        height={18}
                      />
                    </FieldTitle>
                    <FieldLabel className="text-sm">
                      {paymentMethods.others.specifyOther}
                    </FieldLabel>
                  </Field>
                )}
                <div className="flex w-fit gap-x-6">
                  {paymentMethods.cash && (
                    <Field className="gap-1.5 break-inside-avoid">
                      <FieldTitle className="text-sm font-semibold">
                        Cash{" "}
                        <Image
                          src="/payments/cash.png"
                          alt=""
                          width={18}
                          height={18}
                        />
                      </FieldTitle>
                    </Field>
                  )}{" "}
                  {paymentMethods.cheque && (
                    <Field className="gap-1.5 break-inside-avoid">
                      <FieldTitle className="text-sm font-semibold">
                        Cheque
                        <Image
                          src="/payments/cheque.png"
                          alt=""
                          width={18}
                          height={18}
                          className="mt-0.5"
                        />
                      </FieldTitle>
                    </Field>
                  )}
                </div>
              </div>
            </section>
            {/* Right section */}
            <section className="ml-auto space-y-3 w-full pr-1 break-inside-avoid">
              <div className="flex items-center justify-between py-2 border-b border-dashed border-gray-300 break-inside-avoid">
                <span className="text-sm block font-medium">SUB TOTAL</span>
                <span className="text-sm block font-bold">
                  {invoice.currency} {""}
                  {invoice.aggregateSubTotals.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm block font-medium">
                  TAX{" "}
                  {invoice.utilisePercentTax && <span>({invoice.tax}%)</span>}
                </span>
                <span className="text-sm block font-bold">
                  {invoice.currency} {""}
                  {invoice.calculatedTax.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 break-inside-avoid">
                <span className="text-sm block font-medium">
                  DISCOUNT{" "}
                  {invoice.utilisePercentDiscount && (
                    <span>({invoice.discount}%)</span>
                  )}
                </span>
                <span className="text-sm block font-bold">
                  {invoice.currency} {""}
                  {invoice.calculatedDiscount.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-dashed border-gray-300 break-inside-avoid">
                <span className="text-sm block font-medium">
                  SHIPPING {invoice.utiliseTaxableShipping ? "| T" : "| NT"}
                </span>
                <span className="text-sm block font-bold">
                  {invoice.currency} {""}
                  {parseFloat(invoice.shipping ?? "0").toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 bg-gray-50 px-3 rounded break-inside-avoid">
                <span className="text-base block font-bold">TOTAL DUE</span>
                <span className="text-xl block font-black text-invoice-templateI">
                  {invoice.currency} {""}
                  {invoice.grandTotal.toLocaleString()}
                </span>
              </div>
            </section>
          </div>

          {/* Signature Section */}
          <section className="mb-12 print:mb-0 ml-2">
            <div className="space-y-3">
              <div className="text-sm text-gray-500">
                {issuerRelation?.role}
              </div>
              <Image
                src={signatureURL}
                alt=""
                width={80}
                height={80}
                className="-ml-1 break-inside-avoid"
              />
              <div className="font-semibold text-base text-gray-800">
                {issuerRelation?.name}
              </div>
              <div className="text-sm text-gray-600 italic mt-4">
                Thank you for doing business with us!
              </div>
            </div>
          </section>

          {/* Terms & Notes */}
          {(invoice.terms || invoice.notes) && (
            <section className="space-y-3 bg-gray-50 p-4 rounded break-inside-avoid">
              {invoice.terms && (
                <div className="text-xs leading-relaxed">
                  <span className="font-semibold text-gray-800">Terms: </span>
                  <span className="text-gray-600">{invoice.terms}</span>
                </div>
              )}
              {invoice.notes && (
                <div className="text-xs leading-relaxed">
                  <span className="font-semibold text-gray-800">Notes: </span>
                  <span className="text-gray-600">{invoice.notes}</span>
                </div>
              )}
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16 pt-6 border-t border-dashed border-gray-300 print:hidden">
          <section className="flex justify-between items-center">
            <div className="text-invoice-templateI flex gap-x-2 font-black text-2xl items-center">
              {ownerRelation.name}{" "}
              {(invoice.issuerBrandLogo || ownerRelation.logo) && (
                <Image
                  alt=""
                  width={50}
                  height={50}
                  src={issuerBrandLogoURL || ownerLogoURL}
                  className="-ml-1 max-w-sm"
                />
              )}
            </div>
            <div className="text-center text-xs text-gray-600 space-y-1">
              <div>{ownerRelation.address}</div>
              <div>{ownerRelation.email}</div>
            </div>
          </section>
        </footer>
      </div>
      <DownloadInvoice
        recipientName={invoice.recipientName}
        data={puppeteerData}
        agent={agent}
      />
    </>
  );
}
