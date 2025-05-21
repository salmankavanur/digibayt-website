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
  },
  metadataBase: new URL("https://demo.digibayt.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en": "/en",
      // Add more languages if available
    }
  },
  openGraph: {
    title: "DigiBayt - Web Design, Development & Cloud Solutions",
    description: "Professional web design, development, and cloud solutions for businesses of all sizes.",
    url: "https://demo.digibayt.com/",
    siteName: "DigiBayt",
    images: [
      {
        url: "https://demo.digibayt.com/images/svg/3d-object.png",
        width: 1200,
        height: 630,
        alt: "DigiBayt 3D Object"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "DigiBayt - Web Design, Development & Cloud Solutions",
    description: "Professional web design, development, and cloud solutions for businesses of all sizes.",
    images: [
      "https://demo.digibayt.com/images/svg/3d-object.png"
    ],
    creator: "@DigiBayt",
    site: "@DigiBayt"
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      maxVideoPreview: -1,
      maxImagePreview: "large",
      maxSnippet: -1
    }
  },
  category: "Web Design, Development, Cloud Solutions, Digital Marketing, Mobile Apps, E-commerce, SEO",
  generator: "Next.js, React, TypeScript",
  applicationName: "DigiBayt",
  referrer: "origin-when-cross-origin"
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
