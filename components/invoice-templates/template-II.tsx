import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function InvoiceTemplateII() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg">
        {/* Header */}
        <div className="bg-teal-800 p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded"></div>
          <div className="text-white">
            <h1 className="text-2xl font-bold">Business</h1>
            <p className="text-lg">Name</p>
          </div>
        </div>

        <div className="h-1 bg-teal-400"></div>

        {/* Bill From/To and Document Type Section */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Bill From */}
            <div>
              <h3 className="font-semibold mb-2">Bill From</h3>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>

            {/* Bill To and Ship To */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Bill To</h3>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Ship To</h3>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Document Type and QR Code */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Document Type</h3>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="w-32 h-32 border-4 border-black bg-white p-2">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect width="100" height="100" fill="white" />
                {[...Array(10)].map((_, i) =>
                  [...Array(10)].map(
                    (_, j) =>
                      Math.random() > 0.5 && (
                        <rect
                          key={`${i}-${j}`}
                          x={i * 10}
                          y={j * 10}
                          width="10"
                          height="10"
                          fill="black"
                        />
                      )
                  )
                )}
                <rect x="0" y="0" width="20" height="20" fill="black" />
                <rect x="80" y="0" width="20" height="20" fill="black" />
                <rect x="0" y="80" width="20" height="20" fill="black" />
              </svg>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="px-6">
          <div className="bg-teal-700 text-white grid grid-cols-12 gap-2 p-3 text-sm font-semibold">
            <div className="col-span-1">SL No.</div>
            <div className="col-span-3">Item Description</div>
            <div className="col-span-1">Quantity</div>
            <div className="col-span-1">₹ Rate</div>
            <div className="col-span-1">₹ Disc.</div>
            <div className="col-span-2">₹ Taxable Value</div>
            <div className="col-span-1">₹ GST</div>
            <div className="col-span-1">₹ Cess</div>
            <div className="col-span-1">₹ Amount</div>
          </div>

          {/* Table Rows */}
          {[...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-12 gap-2 p-3 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              <div className="col-span-1">
                <div className="h-4 bg-gray-200 rounded w-8"></div>
              </div>
              <div className="col-span-3">
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="col-span-1">
                <div className="h-4 bg-gray-200 rounded w-12"></div>
              </div>
              <div className="col-span-1">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="col-span-1">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="col-span-2">
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="col-span-1">
                <div className="h-4 bg-gray-200 rounded w-12"></div>
              </div>
              <div className="col-span-1">
                <div className="h-4 bg-gray-200 rounded w-12"></div>
              </div>
              <div className="col-span-1">
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Payment Details */}
            <div>
              <h3 className="font-semibold mb-2">Payment Details</h3>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-48"></div>
                <div className="h-4 bg-gray-200 rounded w-40"></div>
              </div>
            </div>

            {/* QR Code */}
            <div className="w-24 h-24 border-4 border-black bg-white p-1">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect width="100" height="100" fill="white" />
                {[...Array(10)].map((_, i) =>
                  [...Array(10)].map(
                    (_, j) =>
                      Math.random() > 0.5 && (
                        <rect
                          key={`qr2-${i}-${j}`}
                          x={i * 10}
                          y={j * 10}
                          width="10"
                          height="10"
                          fill="black"
                        />
                      )
                  )
                )}
                <rect x="0" y="0" width="20" height="20" fill="black" />
                <rect x="80" y="0" width="20" height="20" fill="black" />
                <rect x="0" y="80" width="20" height="20" fill="black" />
              </svg>
            </div>

            {/* Notes */}
            <div>
              <h3 className="font-semibold mb-2">Notes</h3>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>

            {/* T&C */}
            <div>
              <h3 className="font-semibold mb-2">T&C</h3>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-11/12"></div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-48"></div>
              <div className="h-4 bg-gray-200 rounded w-48"></div>
              <div className="h-4 bg-gray-200 rounded w-40"></div>
            </div>

            {/* Total */}
            <div className="mt-8">
              <div className="text-right">
                <p className="text-2xl font-bold">TOTAL</p>
              </div>
            </div>

            {/* Signature */}
            <div className="mt-8">
              <p className="font-semibold mb-2">Signature</p>
              <div className="h-24 bg-gray-100 rounded border-2 border-gray-200"></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-teal-800 text-white p-4 text-right">
          <p className="text-sm">Page 1</p>
        </div>
      </div>
    </div>
  );
}
