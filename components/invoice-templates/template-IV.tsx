import React from "react";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone } from "lucide-react";

export default function InvoiceTemplateIV() {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Cyan Stripe */}
      <div className="w-6 bg-cyan-500 flex-shrink-0"></div>

      {/* Main Content */}
      <div className="flex-1 p-12 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-16">
          <div className="flex items-center gap-3">
            <svg className="w-12 h-12" viewBox="0 0 50 50">
              <path
                d="M 15 10 Q 10 15 10 25 Q 10 35 15 40"
                stroke="#06b6d4"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M 35 10 Q 40 15 40 25 Q 40 35 35 40"
                stroke="#06b6d4"
                strokeWidth="3"
                fill="none"
              />
              <line
                x1="20"
                y1="25"
                x2="30"
                y2="25"
                stroke="#06b6d4"
                strokeWidth="3"
              />
            </svg>
            <h1 className="text-4xl">
              <span className="text-cyan-500 font-semibold">ockup</span>
              <span className="text-gray-800"> | Invoice</span>
            </h1>
          </div>
          <div className="text-right text-sm">
            <p className="text-gray-500 font-semibold">INVOICE NO.</p>
            <p className="text-gray-800 mb-3">001/2020</p>
            <p className="text-gray-500 font-semibold">INVOICE DATE</p>
            <p className="text-gray-800">January 1, 2020</p>
          </div>
        </div>

        {/* Recipient and Mockup Info */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          {/* Recipient */}
          <div>
            <h3 className="text-xs font-bold text-gray-800 mb-3">RECIPIENT</h3>
            <div className="space-y-1 text-sm">
              <p className="font-semibold text-gray-800">JOHN SNOW</p>
              <p className="text-gray-600">2345 Fite Island</p>
              <p className="text-gray-600">6789 Winterfeln, N</p>
              <p className="text-gray-600">VAT no.: 0987654</p>
              <div className="flex items-center gap-2 mt-3 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>company.mail@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>+386 714 505 8985</span>
              </div>
            </div>
          </div>

          {/* Mockup */}
          <div className="text-right">
            <h3 className="text-xs font-bold text-gray-800 mb-3">MOCKUP</h3>
            <div className="space-y-1 text-sm">
              <p className="text-gray-600">7896 Cloude Way</p>
              <p className="text-gray-600">99237 Braxwos, SE</p>
              <p className="text-gray-600">VAT no.: 2344234</p>
              <div className="flex items-center justify-end gap-2 mt-3 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>your.mail@gmail.com</span>
              </div>
              <div className="flex items-center justify-end gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>+00 000 000 000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <div className="grid grid-cols-12 gap-4 mb-3 text-xs font-bold text-cyan-600">
            <div className="col-span-5">DESCRIPTION</div>
            <div className="col-span-2 text-center">HOURS</div>
            <div className="col-span-2 text-center">UNITS</div>
            <div className="col-span-3 text-right">AMOUNT</div>
          </div>

          <Separator className="mb-4" />

          {/* Item 1 */}
          <div className="grid grid-cols-12 gap-4 py-3 text-sm">
            <div className="col-span-5 text-gray-700">Castle Black attack</div>
            <div className="col-span-2 text-center text-gray-700">60</div>
            <div className="col-span-2 text-center text-gray-700">15 u.</div>
            <div className="col-span-3 text-right text-gray-700">
              900.00 USD
            </div>
          </div>

          <Separator className="my-2" />

          {/* Item 2 */}
          <div className="grid grid-cols-12 gap-4 py-3 text-sm">
            <div className="col-span-5 text-gray-700">Dragon defence</div>
            <div className="col-span-2 text-center text-gray-700">20</div>
            <div className="col-span-2 text-center text-gray-700">12 u.</div>
            <div className="col-span-3 text-right text-gray-700">
              240.00 USD
            </div>
          </div>

          <Separator className="my-4" />

          {/* Subtotal */}
          <div className="grid grid-cols-12 gap-4 py-2 text-sm">
            <div className="col-span-9 text-right font-semibold text-cyan-600">
              SUBTOTAL
            </div>
            <div className="col-span-3 text-right text-gray-700">
              1140.00 USD
            </div>
          </div>

          <Separator className="my-2" />

          {/* Discount */}
          <div className="grid grid-cols-12 gap-4 py-2 text-sm">
            <div className="col-span-9 text-right font-semibold text-cyan-600">
              DISCOUNT 5%
            </div>
            <div className="col-span-3 text-right text-gray-700">57.00 USD</div>
          </div>

          <Separator className="my-2" />

          {/* Total */}
          <div className="grid grid-cols-12 gap-4 py-3">
            <div className="col-span-9 text-right font-bold text-gray-800">
              TOTAL
            </div>
            <div className="col-span-3 text-right font-bold text-cyan-600 text-lg">
              1083,00 USD
            </div>
          </div>
        </div>

        {/* Account Data */}
        <div className="bg-cyan-500 text-white p-4 mb-8">
          <h3 className="font-bold mb-2">ACCOUNT DATA</h3>
          <p className="text-sm mb-3">
            Transfer the amount to the business account below. Please include
            invoice number on your check.
          </p>
          <div className="text-sm space-y-1">
            <p>
              <span className="font-semibold">BANK:</span> FENTOS
            </p>
            <p>
              <span className="font-semibold">IBAN:</span> ADSA 2345 9332 23534
            </p>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-12">
          <h3 className="font-bold text-gray-800 mb-3">NOTES</h3>
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              Arya hated them making fun of Needle. 
            </p>
            <p>
              The orphan boys hooted. 
            </p>
            <p>Thank you and have a nice day.</p>
          </div>
        </div>

        {/* Footer */}
        <Separator className="my-8" />
        <div className="flex justify-between text-xs text-gray-400">
          <div>
            <p className="font-semibold">MOCKUP</p>
            <p>7896 Cloude Way | 99237 Braxwos, SE</p>
          </div>
          <div className="text-right space-y-1">
            <div className="flex items-center justify-end gap-2">
              <Mail className="w-3 h-3" />
              <span>your.mail@gmail.com</span>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Phone className="w-3 h-3" />
              <span>+00 000 000 000</span>
            </div>
          </div>
          <div className="text-right">
            <p>DB: VAT</p>
            <p>2344012028</p>
          </div>
        </div>
      </div>
    </div>
  );
}
