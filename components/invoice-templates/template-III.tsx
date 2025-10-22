import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail } from "lucide-react";

export default function InvoiceTemplateIII() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg p-10">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-12">
          {/* Left - Company Info */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-slate-800">braintec</h1>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Lita Co, Ltd.999 Conway Blvd.</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>San Francisco CA 94133, United States</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>49 - 123456789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@braintec.com</span>
              </div>
            </div>
          </div>

          {/* Right - Invoice Details */}
          <div className="text-right">
            <div className="h-1 w-96 bg-slate-800 mb-8"></div>
            <h2 className="text-4xl font-bold text-slate-800 mb-2">
              INVOICE <span className="text-teal-700">INV/2023/04/0003</span>
            </h2>
            <p className="text-sm text-gray-600 mb-8">
              Due Date April 28, 2023
            </p>
            <div className="bg-slate-800 text-white px-8 py-4 inline-block">
              <p className="text-sm mb-1">Total Due:</p>
              <p className="text-3xl font-bold">€9,141.27</p>
            </div>
          </div>
        </div>

        {/* Bill To Section */}
        <div className="mb-8 border-l-4 border-slate-800 pl-4">
          <h3 className="font-bold text-slate-800 mb-1">YOUR COMPANY</h3>
          <p className="text-sm text-gray-600">
            San Francisco SA 65798, United States
          </p>
          <p className="text-sm text-gray-600">info@company.com</p>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <div className="grid grid-cols-12 gap-4 mb-4">
            <div className="col-span-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-800"></div>
                <h3 className="font-bold text-slate-800">Item Description</h3>
              </div>
            </div>
            <div className="col-span-2 text-right font-bold text-slate-800">
              Unit Price
            </div>
            <div className="col-span-2 text-right font-bold text-slate-800">
              Quantity
            </div>
            <div className="col-span-2 text-right font-bold text-slate-800">
              Total
            </div>
          </div>

          <Separator className="mb-4" />

          {/* Item Rows */}
          {[1, 2, 3].map((item) => (
            <div key={item} className="border border-gray-300 p-4 mb-2">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-6">
                  <h4 className="font-bold text-slate-800 mb-1">
                    [FURN_8999] Three-seet Sofa
                  </h4>
                  <p className="text-sm text-gray-600">
                    Three Stetter Sofa with Lounger in Steel Grey Colour
                  </p>
                </div>
                <div className="col-span-2 text-right">€1 500.00</div>
                <div className="col-span-2 text-right">5</div>
                <div className="col-span-2 text-right font-bold">
                  €7 5000.00
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-12 mt-12">
          {/* Left - Payment & Signature */}
          <div className="space-y-8">
            <div className="bg-gray-100 px-4 py-2 inline-block">
              <p className="text-sm text-gray-700">
                Payment Method: Paypal, Visa, Mastercard
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-2">Accounts Manager</p>
              <p className="font-bold text-slate-800 mb-4">DECO ADICT</p>
              <div className="relative">
                <svg className="w-32 h-16" viewBox="0 0 120 60">
                  <path
                    d="M 10 40 Q 20 20 30 35 T 50 40 Q 60 45 70 35 T 90 40"
                    stroke="#1e293b"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Thank you for your business!
              </p>
            </div>
          </div>

          {/* Right - Totals */}
          <div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="font-semibold">SUB TOTAL</span>
                <span className="font-bold">€22,500.00</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="font-semibold">TAX VAT 10%</span>
                <span className="font-bold">€22,50.00</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="font-semibold">DISCOUNT 5%</span>
                <span className="font-bold">€1,125.00</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg pt-2">
                <span className="font-bold">TOTAL DUE</span>
                <span className="font-bold">€21,325.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            <span className="font-semibold">Terms:</span> Love is like a
            butterfly, the more you chase it, the more it will elude you.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t-2 border-gray-300 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-bold text-gray-400 mb-2">
              braintec<span className="text-2xl">.com</span>
            </h2>
            <div className="text-xs text-gray-600 space-y-1">
              <p>Lita Co, Ltd.999 Conway Blvd.</p>
              <p>San Francisco CA 94133, United States</p>
              <p>49 - 123456789</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-10 h-10 rounded-full bg-pink-400"></div>
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <div className="w-10 h-10 rounded-full bg-gray-400"></div>
            <div className="w-10 h-10 rounded-full bg-gray-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
