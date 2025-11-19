"use client";

import { Button } from "@/components/ui/button";
import { HelpCircle, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e91e63] via-[#ff5722] to-[#ff9800] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Code */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-white animate-pulse">404</h1>
        </div>

        {/* Error Message */}
        <h2 className="mt-8 text-4xl font-bold text-white mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-md mx-auto text-center truncate">
          {error.message ??
            ` The page you're looking for seems to have wandered off into the
          digital void. Don't worry, it happens to the best of us.`}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            className="px-8 py-3 bg-black text-white font-semibold rounded-lg"
            onClick={() => reset()}
          >
            Try again{" "}
          </Button>
          <Button
            className="px-8 py-3 bg-black text-white font-semibold rounded-lg"
            onClick={() => router.replace("/auth/login")}
          >
            Login
          </Button>
        </div>

        {/*  Elements */}
        <div className="mt-16 flex justify-center gap-8">
          <div className="flex flex-col items-center">
            <div className="size-10 rounded-full bg-32 flex items-center justify-center mb-2">
              <Home
                className="text-white"
                onClick={() => router.replace("/")}
              />
            </div>
            <span className="text-sm text-white">Homepage</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="size-10 bg-32 rounded-full flex items-center justify-center mb-2">
              <HelpCircle
                className="text-white"
                onClick={() => router.replace("/")}
              />
            </div>
            <span className="text-sm text-white">Help</span>
          </div>
        </div>
      </div>
    </div>
  );
}
