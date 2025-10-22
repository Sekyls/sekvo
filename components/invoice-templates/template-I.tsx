import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function InvoiceTemplateI() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg">
        {/* Header */}
        <div className="bg-teal-800 text-white p-8">
          <h1 className="text-4xl font-bold">
            Invoice <span className="text-teal-200">| [Project name]</span>
          </h1>
        </div>

        {/* Top Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-gray-100">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Client details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-600">
              <p>Client name</p>
              <p>Client email ID</p>
              <p>Client phone number</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Billed to</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-600">
              <p>Your name</p>
              <p>Your address</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Invoice details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-600">
              <p>Invoice number:</p>
              <p>Issue date:</p>
              <p>Due date:</p>
            </CardContent>
          </Card>
        </div>

        {/* Project Details Section */}
        <div className="p-8 bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Project details
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </p>
        </div>

        {/* Deliverables Table */}
        <div className="p-8">
          <div className="mb-4">
            <div className="grid grid-cols-2 font-semibold text-gray-700 pb-4">
              <div>Deliverables</div>
              <div className="text-right">Price</div>
            </div>
            <Separator className="bg-teal-800 h-0.5" />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 py-3 bg-gray-50 px-4 rounded">
              <div className="text-gray-600">Deliverable #1</div>
              <div className="text-right text-gray-600">INR 0000.00</div>
            </div>

            <div className="grid grid-cols-2 py-3 bg-gray-100 px-4 rounded">
              <div className="text-gray-600">Deliverable #1</div>
              <div className="text-right text-gray-600">INR 0000.00</div>
            </div>

            <div className="grid grid-cols-2 py-3 bg-gray-50 px-4 rounded">
              <div className="text-gray-600">Deliverable #1</div>
              <div className="text-right text-gray-600">INR 0000.00</div>
            </div>

            <div className="grid grid-cols-2 py-3 bg-gray-50 px-4 rounded">
              <div className="text-teal-700 font-semibold">Discount</div>
              <div className="text-right text-teal-700 font-semibold">
                - INR 0000.00
              </div>
            </div>

            <div className="grid grid-cols-2 py-3 bg-gray-100 px-4 rounded">
              <div className="font-bold text-gray-800">TOTAL</div>
              <div className="text-right font-bold text-gray-800">
                INR 0000.00
              </div>
            </div>

            <div className="grid grid-cols-2 py-3 bg-gray-50 px-4 rounded">
              <div className="font-semibold text-gray-700">Advance [x%]</div>
              <div className="text-right font-semibold text-gray-700">
                INR 0000.00
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-gray-50 border-t">
          <div className="flex gap-6">
            <div className="w-20 h-20 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.5 2L6 10.5l3.5 3.5 8.5-8.5-3.5-3.5zm-5 13L7 17.5 3.5 14 6 11.5l3.5 3.5z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Contact details:
              </h3>
              <p className="text-sm text-gray-600">Richard Hendricks</p>
              <p className="text-sm text-gray-600">richard@piedpiper.com</p>
              <p className="text-sm text-gray-600">+1 8366 385 9239</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Wiring details:
            </h3>
            <p className="text-sm text-gray-600">Richard Hendricks</p>
            <p className="text-sm text-gray-600">Acc No: 50100287345954</p>
            <p className="text-sm text-gray-600">IFSC: HDFC0000919</p>
            <p className="text-sm text-gray-600">G-pay: richard97@okhdfcbank</p>
          </div>
        </div>
      </div>
    </div>
  );
}
