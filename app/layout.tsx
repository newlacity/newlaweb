import type React from "react"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"
import Link from "next/link";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "NEW LA - FiveM Roleplay Server",
  description: "Experience the ultimate FiveM roleplay server in Los Angeles",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <nav className="bg-neutral-900">
            <Header  />
          </nav>
        </header>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
