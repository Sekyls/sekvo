import { TemplateDataSchema, UserObject } from "@/lib/miscellany/schema";
import z4 from "zod/v4";
import { AvatarImage } from "../ui/avatar";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar } from "@radix-ui/react-avatar";

export default function TemplateI({
  data,
}: {
  data: z4.infer<typeof TemplateDataSchema> & z4.infer<typeof UserObject>;
}) {
  const {
    logo,
    userLogo,
    userName,
    notes,
    terms,
    userAddress,
    userEmail,
    userPhoneNumber,
    invoiceNumber,
    invoiceDate,
    dueDate,
    purchaseOrder,
    customInvoiceFields,
    companyAddress,
    companyName,
    companyEmail,
    contactPerson,
    currency,
    grandTotal,
    invoiceItems,
    aggregateSubTotals,
    calculatedDiscount,
    calculatedTax,
    utilisePercentDiscount,
    utilisePercentTax,
    utiliseTaxableShipping,
    discount,
    phoneNumber,
    shipping,
    tax,
  } = data;
  return (
    <div className="w-[794px] print:w-auto min-h-[1123px] print:h-auto mx-auto print:m-auto p-12 print:p-0 font-roboto text-32 border print:border-0 text-base overflow-x-hidden">
      <header className="flex justify-between font-roboto gap-x-20 print:hidden">
        <div className="text-invoice-templateI font-black font-roboto text-2xl">
          {userName}
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
              <span className="text-base">{userAddress}</span>
            </div>
            <div className="flex gap-x-2 items-center">
              <Phone fill="#323232" color="#ffff" size={20} />
              <span className="text-base">{userPhoneNumber}</span>
            </div>
            <div className="flex gap-x-2 items-center">
              <Mail size={20} />
              <span className="text-base">{userEmail}</span>
            </div>
          </div>
          {/* Right section */}
          <div className="ml-auto text-right space-y-2 -mt-1">
            <span className="font-roboto font-black text-2xl text-32 block">
              Invoice |{" "}
              <span className="text-invoice-templateI">{invoiceNumber}</span>
            </span>
            <span className="text-base block">
              Invoice Date | {invoiceDate}
            </span>
            <span className="text-base block">Due Date | {dueDate}</span>
            <span className="text-base block">P.O# | {purchaseOrder}</span>
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
              <p className="font-bold">{companyName}</p>
              <span className="text-base block">{companyAddress}</span>
              {companyEmail && (
                <span className="text-base block">{companyEmail}</span>
              )}
              {contactPerson && contactPerson.name && (
                <span className="text-base block text-muted-foreground italic">
                  {contactPerson.title} {contactPerson.name}
                </span>
              )}
              {phoneNumber && (
                <span className="text-base block text-muted-foreground italic">
                  {phoneNumber}
                </span>
              )}
            </div>
          </div>
          {/* Right Section */}
          <div className="bg-invoice-templateI text-white flex justify-between py-1 px-5 gap-x-10 [clip-path:polygon(20_0,100%_0,100%_100%,0_100%)]">
            <p>Total Due |</p>
            <p className="font-black">
              {currency} {grandTotal.toLocaleString()}
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
              {invoiceItems.map((invoice, index) => (
                <TableRow
                  key={index}
                  className="border-t-4 border-invoice-templateI break-inside-avoid"
                >
                  <TableCell className="font-medium">
                    <span className="text-base block">{invoice.item}</span>
                    {invoice.description && (
                      <span className="text-muted-foreground font-normal text-xs">
                        {invoice.description}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center text-base">
                    {invoice.unitPrice.currency}{" "}
                    {parseFloat(invoice.unitPrice.price).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center text-base">
                    {invoice.quantity}
                  </TableCell>
                  <TableCell className="text-right pr-2 text-base">
                    {currency} {parseFloat(invoice.subTotal).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
        <div className="grid grid-cols-2 gap-x-10 mt-5">
          {/* Left section */}
          <section className="space-y-2">
            <div className="bg-[#C4C4C4] py-1">
              <span className="text-base block text-center">
                Payment Method
              </span>
            </div>
          </section>
          {/* Right section */}
          <section className="ml-auto space-y-2 w-full pr-1 mt-10 break-inside-avoid">
            <div className="flex items-center justify-between py-1 border-b border-dashed border-black/30 ">
              <span className="text-base block font-medium">SUB TOTAL</span>
              <span className="text-base block font-black">
                {currency} {""}
                {aggregateSubTotals.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 ">
              <span className="text-base block font-medium">
                TAX {utilisePercentTax && <span>{tax}%</span>}
              </span>
              <span className="text-base block font-black">
                {currency} {""}
                {calculatedTax.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 ">
              <span className="text-base block font-medium">
                DISCOUNT {utilisePercentDiscount && <span>{discount}%</span>}
              </span>
              <span className="text-base block font-black">
                {currency} {""}
                {calculatedDiscount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-dashed border-black/30 ">
              <span className="text-base block font-medium">
                SHIPPING {utiliseTaxableShipping ? "| T" : "| NT"}
              </span>
              <span className="text-base block font-black">
                {currency} {""}
                {parseFloat(shipping ?? "0").toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 ">
              <span className="text-base block font-medium">TOTAL DUE</span>
              <span className="text-base block font-black">
                {currency} {""}
                {grandTotal.toLocaleString()}
              </span>
            </div>
          </section>
        </div>
        <section>
          <div className="space-y-2">
            <span className="text-base block text-muted-foreground">Role</span>
            <span className="text-base block font-medium">{userName}</span>
            <span className="text-base block">Sign</span>
            <span className="text-base block text-muted-foreground">
              Thank you for doing business with us!
            </span>
          </div>
        </section>
        <section className={!terms || !notes ? "hidden" : "block mt-10"}>
          {terms && (
            <span className="text-xs block pb-1 font-medium">
              Terms: <span className="text-muted-foreground font-normal"> {terms}</span>
            </span>
          )}
          {notes && (
            <span className="text-xs block font-medium ">
              Notes: <span className="text-muted-foreground font-normal">{notes}</span>
            </span>
          )}
        </section>
      </main>
      <footer className="mt-10 print:hidden">
        <section className="border-t border-dashed flex justify-between items-center border-black/30 mt-5 pt-2">
          <div className="text-invoice-templateI font-black font-roboto text-2xl">
            {userName}
          </div>
          <div>
            <span className="text-base block">{userAddress}</span>
            <span className="text-center text-base block">{userEmail}</span>
          </div>
          {logo || userLogo ? (
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
