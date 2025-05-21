import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-muted/40">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="relative w-8 h-8">
                <Image src="/icons/digibayt-logo.png" alt="DigiBayt Logo" width={32} height={32} className="object-contain" />
              </div>
              <span className="font-bold">DigiBayt</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Transforming ideas into powerful digital solutions. We help businesses grow through innovative technology
              and strategic digital marketing.
            </p>
            <div className="flex space-x-4">

              <Link href="https://www.linkedin.com/company/digibayt/" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>

               <Link href="https://www.instagram.com/digi.bayt/" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>

              <Link href="https://facebook.com/digibayt" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              {/* <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link> */}
              
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/web-development"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services/mobile-app-development"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Mobile App Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services/digital-marketing"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="/services/cloud-solutions"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cloud Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/services/library-automation"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Library Automation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-muted-foreground">18/81D, Malappuram, Kerala, India - 673639</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                <Link href="tel:+919074433100" className="text-muted-foreground hover:text-foreground transition-colors">
                  +91 9074433100
                </Link>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                <Link
                  href="mailto:hi@digibayt.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  hi@digibayt.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DigiBayt. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="/privacy-policy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
