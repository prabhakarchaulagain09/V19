import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "FoodTrace Pro - Smart Food Storage Management",
  description: "AI-powered food storage management system with real-time monitoring and predictive analytics",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${poppins.variable} bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen`}
      >
        {children}
      </body>
    </html>
  )
}
