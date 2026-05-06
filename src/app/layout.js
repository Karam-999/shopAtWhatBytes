import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shop@WhatBytes - Your One-Stop Online Store",
  description: "Browse electronics, clothing, jewelery and more. Find the best deals on quality products at Shop@WhatBytes.",
  icons: {
    icon: "/shopatwhatbytes.png",
    shortcut: "/shopatwhatbytes.png",
    apple: "/shopatwhatbytes.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Suspense>
            <Header />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Toaster position="bottom-right" richColors />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
