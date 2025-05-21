"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { NavLink } from "@/components/nav-link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/whatsapp-button"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <Image src="/icons/digibayt-logo.png" alt="DigiBayt Logo" width={32} height={32} className="object-contain" />
            </div>
            <span className="hidden font-bold sm:inline-block">DigiBayt</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/#services">Services</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/#about">About</NavLink>
          <NavLink href="/#portfolio">Portfolio</NavLink>
          <NavLink href="/#contact">Contact</NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="hidden md:block">
            <WhatsAppButton className="!flex" />
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="container py-4 flex flex-col space-y-4">
            <NavLink href="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink href="/#services" onClick={() => setIsMenuOpen(false)}>
              Services
            </NavLink>
            <NavLink href="/blog" onClick={() => setIsMenuOpen(false)}>
              Blog
            </NavLink>
            <NavLink href="/#about" onClick={() => setIsMenuOpen(false)}>
              About
            </NavLink>
            <NavLink href="/#portfolio" onClick={() => setIsMenuOpen(false)}>
              Portfolio
            </NavLink>
            <NavLink href="/#contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </NavLink>
            {/* <Button asChild className="w-full mt-2">
              <Link href="/#contact" onClick={() => setIsMenuOpen(false)}>
                Get Started
              </Link>
            </Button> */}
             <div className="w-full mt-2">
               <WhatsAppButton className="w-full" onClick={() => setIsMenuOpen(false)} />
             </div>
          </nav>
        </div>
      )}
    </header>
  )
}
