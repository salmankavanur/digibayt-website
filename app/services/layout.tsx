import type { ReactNode } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container py-4 flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/#services" className="hover:text-primary transition-colors">
          Services
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-foreground">Details</span>
      </div>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
