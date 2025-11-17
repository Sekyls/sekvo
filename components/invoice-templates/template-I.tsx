import { Avatar, AvatarImage } from "../ui/avatar";
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
import { getInvoiceFromDB } from "@/actions/db/get-invoice";

export default async function TemplateI({ id }: { id: string }) {
  const {
    invoice,
    recipientContactPerson,
    customInvoiceFields,
    invoiceItems,
    issuerRelation,
    ownerRelation,
    paymentMethods,
  } = await getInvoiceFromDB(id);

  return (
    <div className="w-[794px] print:w-auto min-h-[1123px] print:h-auto mx-auto print:m-auto p-12 print:p-0 font-roboto text-32 border print:border-0 text-base overflow-x-hidden">
      <header className="flex justify-between font-roboto gap-x-20 print:hidden">
        <div className="text-invoice-templateI font-black font-roboto text-2xl">
          {ownerRelation.name}
        </div>
        <div className="size-3 grow bg-invoice-templateI [clip-path:polygon(12_0,100%_0,100%_100%,0_100%)]"></div>
      </header>
      <main>
        {/* Sender's & Invoice data */}
        <section className="flex justify-between gap-x-15 mt-5">
          {/* Left Section */}
          <div className="text-32 font-roboto space-y-2">
            <div className="flex gap-x-2 items-center">
              <MapPin fill="#323232" color="#ffff" className="-ml-1" />
              <span className="text-base">{ownerRelation.address}</span>
            </div>
            <div className="flex gap-x-2 items-center">
              <Phone fill="#323232" color="#ffff" size={20} />
              <span className="text-base">{ownerRelation.phoneNumber}</span>
            </div>
            <div className="flex gap-x-2 items-center">
              <Mail size={20} />
              <span className="text-base">{ownerRelation.email}</span>
            </div>
          </div>
          {/* Right section */}
          <div className="ml-auto text-right space-y-2 -mt-1">
            <span className="font-roboto font-black text-2xl text-32 block">
              Invoice |{" "}
              <span className="text-invoice-templateI">
                {invoice.invoiceNumber}
              </span>
            </span>
            <span className="text-base block">
              Invoice Date | {invoice.invoiceDate}
            </span>
            <span className="text-base block">
              Due Date | {invoice.dueDate}
            </span>
            <span className="text-base block">
              P.O# | {invoice.purchaseOrder}
            </span>
            {customInvoiceFields && customInvoiceFields.length > 1 ? (
              <>
                {customInvoiceFields.map((item, index) => {
                  return (
                    <span className="text-base block" key={index}>
                      {item.label} | {item.content}
                    </span>
                  );
                })}
              </>
            ) : null}
          </div>
        </section>

        {/* Recipient Info & Due Amount */}
        <section className="flex items-center justify-between">
          {/* Left section */}
          <div className="grid grid-cols-[5%_95%] items-center">
            <div className="h-full w-1 bg-invoice-templateI"></div>
            <div className="font-roboto text-32">
              <p className="font-bold">{invoice.recipientName}</p>
              <span className="text-base block">
                {invoice.recipientAddress}
              </span>
              {invoice.recipientEmail && (
                <span className="text-base block">
                  {invoice.recipientEmail}
                </span>
              )}
              {recipientContactPerson && recipientContactPerson.name && (
                <span className="text-base block text-muted-foreground italic">
                  {recipientContactPerson.title} {recipientContactPerson.name}
                </span>
              )}
              {invoice.recipientPhoneNumber && (
                <span className="text-base block text-muted-foreground italic">
                  {invoice.recipientPhoneNumber}
                </span>
              )}
            </div>
          </div>
          {/* Right Section */}
          <div className="bg-invoice-templateI text-white flex justify-between py-1 px-5 gap-x-10 [clip-path:polygon(20_0,100%_0,100%_100%,0_100%)]">
            <p>Total Due |</p>
            <p className="font-black">
              {invoice.currency} {invoice.grandTotal.toLocaleString()}
            </p>
          </div>
        </section>

        {/* Invoice items */}
        <section className="mt-10">
          <Table className="w-full table-fixed overflow-x-hidden border-collapse">
            <colgroup>
              <col style={{ width: "40%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
            <TableHeader>
              <TableRow>
                <TableHead className="flex items-center gap-x-2 font-bold text-invoice-templateI text-lg pb-2">
                  <div className="size-3 bg-invoice-templateI -ml-2"></div>
                  <span>Item Description</span>
                </TableHead>
                <TableHead className="font-bold text-invoice-templateI text-lg pb-5 text-center">
                  Unit Price
                </TableHead>
                <TableHead className="font-bold text-invoice-templateI text-lg pb-5 text-center">
                  Quantity
                </TableHead>
                <TableHead className="font-bold text-invoice-templateI text-lg pb-5 text-right">
                  Total
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="border border-invoice-templateI">
              {invoiceItems.map((item, index) => (
                <TableRow
                  key={index}
                  className="border-t-4 border-invoice-templateI break-inside-avoid"
                >
                  <TableCell className="font-medium">
                    <span className="text-base block">{item.item}</span>
                    {item.description && (
                      <span className="text-muted-foreground font-normal text-xs">
                        {item.description}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center text-base">
                    {item.currency}{" "}
                    {parseFloat(item.unitPrice).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center text-base">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="text-right pr-2 text-base">
                    {invoice.currency}{" "}
                    {parseFloat(item.subTotal).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
        <div className="grid grid-cols-2 gap-x-10 mt-5">
          {/* Left section */}
          <section className="space-y-2">
            <span className="text-lg block text-center bg-[#C4C4C4] font-bold rounded">
              Payment Method
            </span>
            <div className="py-1 space-y-3">
              {/* Payment Options */}
              {paymentMethods.mtnMobileMoney && (
                <Field className="gap-1">
                  <FieldTitle className="text-base">
                    MTN Mobile Money{" "}
                    <Image
                      src="/payments/momo.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                  </FieldTitle>
                  <FieldLabel className="text-base">
                    {paymentMethods.mtnMobileMoney.accountName} |{" "}
                    {paymentMethods.mtnMobileMoney.accountNumber}
                  </FieldLabel>
                </Field>
              )}

              {paymentMethods.telecelCash && (
                <Field className="gap-1">
                  <FieldTitle className="text-base">
                    Telecel Cash{" "}
                    <Image
                      src="/payments/tcash.png"
                      alt=""
                      width={24}
                      height={24}
                    />
                  </FieldTitle>
                  <FieldLabel className="text-base">
                    {paymentMethods.telecelCash.accountName} |{" "}
                    {paymentMethods.telecelCash.accountNumber}
                  </FieldLabel>
                </Field>
              )}
              {paymentMethods.atMoney && (
                <Field className="gap-1">
                  <FieldTitle className="text-base">
                    AirtelTigo Money{" "}
                    <Image
                      src="/payments/atmoney.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                  </FieldTitle>
                  <FieldLabel className="text-base">
                    {paymentMethods.atMoney.accountName} |{" "}
                    {paymentMethods.atMoney.accountNumber}
                  </FieldLabel>
                </Field>
              )}
              {paymentMethods.bankTransfer && (
                <Field className="gap-1">
                  <FieldTitle className="text-base">
                    Bank Transfer{" "}
                    <Image
                      src="/payments/banks.png"
                      alt=""
                      width={24}
                      height={24}
                    />
                  </FieldTitle>
                  <FieldLabel className="text-base">
                    {paymentMethods.bankTransfer.bankName} ,{" "}
                    {paymentMethods.bankTransfer.branch} |{" "}
                    {paymentMethods.bankTransfer.accountName}
                  </FieldLabel>
                  <FieldLabel className="text-base">
                    Account No. | {paymentMethods.bankTransfer.accountNumber}
                  </FieldLabel>
                </Field>
              )}
              {paymentMethods.paymentGateway && (
                <Field className="gap-1">
                  <FieldTitle className="text-base">
                    Payment Gateway{" "}
                    <Image
                      src="/payments/gateways.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                  </FieldTitle>
                  <FieldLabel className="text-base">
                    {paymentMethods.paymentGateway.link}
                  </FieldLabel>
                </Field>
              )}
              {paymentMethods.others && (
                <Field className="gap-1">
                  <FieldTitle className="text-base">
                    Others{" "}
                    <Image
                      src="/payments/others.png"
                      alt=""
                      width={18}
                      height={18}
                    />
                  </FieldTitle>
                  <FieldLabel className="text-base">
                    {paymentMethods.others.specifyOther}
                  </FieldLabel>
                </Field>
              )}
              <div className="flex w-fit">
                {paymentMethods.cash && (
                  <Field className="gap-1">
                    <FieldTitle className="text-base">
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
                  <Field className="gap-1">
                    <FieldTitle className="text-base">
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
          <section className="ml-auto space-y-2 w-full pr-1 mt-10 break-inside-avoid">
            <div className="flex items-center justify-between py-1 border-b border-dashed border-black/30 ">
              <span className="text-base block font-medium">SUB TOTAL</span>
              <span className="text-base block font-black">
                {invoice.currency} {""}
                {invoice.aggregateSubTotals.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 ">
              <span className="text-base block font-medium">
                TAX {invoice.utilisePercentTax && <span>{invoice.tax}%</span>}
              </span>
              <span className="text-base block font-black">
                {invoice.currency} {""}
                {invoice.calculatedTax.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 ">
              <span className="text-base block font-medium">
                DISCOUNT{" "}
                {invoice.utilisePercentDiscount && (
                  <span>{invoice.discount}%</span>
                )}
              </span>
              <span className="text-base block font-black">
                {invoice.currency} {""}
                {invoice.calculatedDiscount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-dashed border-black/30 ">
              <span className="text-base block font-medium">
                SHIPPING {invoice.utiliseTaxableShipping ? "| T" : "| NT"}
              </span>
              <span className="text-base block font-black">
                {invoice.currency} {""}
                {parseFloat(invoice.shipping ?? "0").toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 ">
              <span className="text-base block font-medium">TOTAL DUE</span>
              <span className="text-base block font-black">
                {invoice.currency} {""}
                {invoice.grandTotal.toLocaleString()}
              </span>
            </div>
          </section>
        </div>

        <section className="mt-10">
          <div className="space-y-2">
            <span className="text-base block text-muted-foreground">
              {issuerRelation?.role}
            </span>
            <span className="text-base block">
              <Image src={"/#"} alt="" width={24} height={24} />
            </span>
            <span className="text-base block font-medium">
              {issuerRelation?.name}
            </span>
            <span className="text-base block text-muted-foreground">
              Thank you for doing business with us!
            </span>
          </div>
        </section>

        <section
          className={
            !invoice.terms || !invoice.notes ? "hidden" : "block mt-10"
          }
        >
          {invoice.terms && (
            <span className="text-xs block pb-1 font-medium">
              Terms:{" "}
              <span className="text-muted-foreground font-normal">
                {" "}
                {invoice.terms}
              </span>
            </span>
          )}
          {invoice.notes && (
            <span className="text-xs block font-medium ">
              Notes:{" "}
              <span className="text-muted-foreground font-normal">
                {invoice.notes}
              </span>
            </span>
          )}
        </section>
      </main>
      <footer className="mt-10 print:hidden">
        <section className="border-t border-dashed flex justify-between items-center border-black/30 mt-5 pt-2">
          <div className="text-invoice-templateI font-black font-roboto text-2xl">
            {ownerRelation.name}
          </div>
          <div>
            <span className="text-base block">{ownerRelation.address}</span>
            <span className="text-center text-base block">
              {ownerRelation.email}
            </span>
          </div>
          {invoice.issuerBrandLogo || ownerRelation.logo ? (
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="ml-auto max-w-12 rounded-full"
              />
            </Avatar>
          ) : null}
        </section>
      </footer>
    </div>
  );
}
