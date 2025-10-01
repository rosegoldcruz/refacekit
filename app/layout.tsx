import type React from "react"
import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import "./globals.css"

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
})

export const metadata: Metadata = {
  title: "RefaceKit CRM",
  description: "White-label CRM solution for sales teams",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  console.log("[v0] Root layout rendering")

  return (
    <html lang="en" className={`${figtree.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
