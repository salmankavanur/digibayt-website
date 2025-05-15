"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { NavLink } from "@/components/nav-link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <Image src="/logo.png" alt="DigiBayt Logo" width={32} height={32} className="object-contain" />
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
          <Button 
            asChild 
            className="hidden md:flex !bg-gradient-to-r !from-[#25D366] !to-[#128C7E] hover:!from-[#128C7E] hover:!to-[#075E54] !text-white !border-none"
            style={{ background: 'linear-gradient(to right, #25D366, #128C7E)' }}
          >
            <Link href="https://wa.me/+919074433100">WhatsApp Us</Link>
          </Button>
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
             <Button 
              asChild 
              className="w-full mt-2 !bg-gradient-to-r !from-[#25D366] !to-[#128C7E] hover:!from-[#128C7E] hover:!to-[#075E54] !text-white !border-none"
              style={{ background: 'linear-gradient(to right, #25D366, #128C7E)' }}
            >
              <Link href="https://wa.me/+919074433100" onClick={() => setIsMenuOpen(false)}>
                <span className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                  </svg>
                  WhatsApp Us
                </span>
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
