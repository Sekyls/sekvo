import { Home, HelpCircle, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function InvoiceLoadingPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#e91e63] via-[#ff5722] to-[#ff9800] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full flex flex-col items-center">
        {/* Central Visual: The "Ghost" Invoice */}
        <div className="relative bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 shadow-2xl transform transition-all hover:scale-105 duration-500">
          {/* Floating Spinner Badge */}
          <div className="absolute -top-6 -right-6 bg-white text-[#ff5722] p-3 rounded-full shadow-lg animate-bounce">
            <Loader2 className="size-8 animate-spin" />
          </div>

          {/* Invoice Skeleton Visual */}
          <div className="w-64 h-80 bg-white rounded-lg p-6 shadow-inner flex flex-col gap-4 opacity-90">
            {/* Header Line */}
            <div className="flex justify-between items-center border-b pb-4 mb-2">
              <div className="size-8 bg-gray-200 rounded animate-pulse" />
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Invoice Lines (Simulating Rows) */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-full bg-gray-100" />
              <Skeleton className="h-4 w-3/4 bg-gray-100" />
              <Skeleton className="h-4 w-5/6 bg-gray-100" />
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Total Amount Line */}
            <div className="flex justify-between pt-4 border-t mt-2">
              <Skeleton className="h-4 w-16 bg-gray-200" />
              <Skeleton className="h-6 w-24 bg-gray-300" />
            </div>
          </div>
        </div>

        {/* Loading Message */}
        <h2 className="mt-12 text-4xl font-bold text-white mb-4 text-center">
          Generating Preview...
        </h2>
        <p className="text-lg text-white/80 mb-8 max-w-md mx-auto text-center">
          We are compiling the line items and calculating the totals. This
          should only take a moment.
        </p>

        {/* Bottom Navigation (Kept from inspiration) */}
        <div className="mt-16 flex justify-center gap-12">
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="size-12 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors flex items-center justify-center mb-2 border border-white/10">
              <Home className="text-white size-5" />
            </div>
            <span className="text-sm text-white font-medium">Dashboard</span>
          </div>

          <div className="flex flex-col items-center group cursor-pointer">
            <div className="size-12 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors flex items-center justify-center mb-2 border border-white/10">
              <HelpCircle className="text-white size-5" />
            </div>
            <span className="text-sm text-white font-medium">Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
