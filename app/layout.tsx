import type { Metadata } from "next";
import "@/styles/globals.css";
import { inter, spaceGrotesk, roboto } from "@/lib/misc/fonts";
import { appMetaData } from "@/lib/misc/metadata";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/providers/authentication-provider";
import { ReactNode } from "react";
import { getUserAuthStatus } from "@/actions/db/get-auth-user";
export const metadata: Metadata = appMetaData;

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const user = await getUserAuthStatus();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${spaceGrotesk.variable} ${roboto.variable}  antialiased overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider value={user}>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
