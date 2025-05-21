import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/session-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "DigiBayt - Web Design, Development & Cloud Solutions",
  description: "Professional web design, development, and cloud solutions for businesses of all sizes.",
  keywords: [
    "web design",
    "web development",
    "cloud solutions",
    "digital marketing",
    "mobile app development",
    "e-commerce solutions",
    "SEO services",
  ],
  authors: [{ name: "DigiBayt" }],
  creator: "DigiBayt",
  publisher: "DigiBayt",
  icons: {
    icon: "https://demo.digibayt.com/icons/digibayt-logo.ico",
    shortcut: "https://demo.digibayt.com/icons/digibayt-logo.ico",
    apple: "https://demo.digibayt.com/icons/digibayt-logo.ico"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
