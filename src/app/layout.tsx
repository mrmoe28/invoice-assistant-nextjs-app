import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AuthProvider from "@/components/providers/auth-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Invoice Assistant - Professional Invoice Management",
  description: "Modern invoice application with automated calculations and professional templates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          inter.variable,
          "min-h-full bg-gray-50 font-sans antialiased"
        )}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
