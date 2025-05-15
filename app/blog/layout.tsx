import type React from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "Blog | DigiBayt - Web Design, Development & Cloud Solutions",
  description: "Insights, tips, and trends in web development, mobile apps, digital marketing, and cloud solutions.",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  )
}
