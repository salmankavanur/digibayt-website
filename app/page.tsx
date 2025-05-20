import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  CheckCircle,
  Code,
  Cloud,
  Laptop,
  Mail,
  MapPin,
  Phone,
  Zap,
  BarChart3,
  BookOpen,
  Star,
  Smartphone,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ThemeToggle } from "@/components/theme-toggle"
import { NavLink } from "@/components/nav-link"
import { ScrollToTop } from "@/components/scroll-to-top"
import { RevealSection } from "@/components/reveal-section"
// Import the BlogSection component
import { BlogSection } from "@/components/blog-section"
// Import the PortfolioSection component
import { PortfolioSection } from "@/components/portfolio-section"
// Import WhatsApp Button component
import WhatsAppButton from "@/components/whatsapp-button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background">
      {/* Decorative elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[60%] h-[800px] w-[800px] rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 blur-3xl dark:from-primary/10 dark:to-purple-500/10" />
        <div className="absolute -bottom-[40%] -left-[60%] h-[800px] w-[800px] rounded-full bg-gradient-to-tr from-blue-500/20 to-teal-500/20 blur-3xl dark:from-blue-500/10 dark:to-teal-500/10" />
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-600">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              DigiBayt
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <NavLink href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </NavLink>
            <NavLink href="#services" className="text-sm font-medium hover:text-primary transition-colors">
              Services
            </NavLink>
            <NavLink href="#portfolio" className="text-sm font-medium hover:text-primary transition-colors">
              Portfolio
            </NavLink>
            <NavLink href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </NavLink>
            <NavLink href="#team" className="text-sm font-medium hover:text-primary transition-colors">
              Team
            </NavLink>
            <NavLink href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </NavLink>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="hidden md:block">
              <WhatsAppButton />
            </div>
            <Button variant="outline" size="icon" className="md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative w-full overflow-hidden py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-3xl dark:from-blue-500/20 dark:to-purple-500/20" />
            <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-primary/30 to-teal-500/30 blur-3xl dark:from-primary/20 dark:to-teal-500/20" />
          </div>
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <RevealSection direction="left" className="flex flex-col justify-content space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary animate-fadeIn">
                    <Star className="mr-1 h-3.5 w-3.5" />
                    <span>Innovative Digital Solutions</span>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Transform Your <span className="text-primary">Digital Presence</span> With Cutting-Edge Solutions
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    We create stunning websites, powerful applications, and scalable cloud solutions that help your
                    business thrive in the digital world.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <WhatsAppButton className="size-lg transition-all hover:scale-105" />
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary/20 hover:bg-primary/10 hover:text-primary transition-all hover:scale-105"
                    asChild
                  >
                    <NavLink href="#services">Our Services</NavLink>
                  </Button>
                </div>
              </RevealSection>
              <RevealSection direction="right" className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-purple-600 opacity-30 blur-xl"></div>
                  <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-background/80 backdrop-blur-sm hover:scale-[1.02] transition-transform duration-500">
                    <Image
                      src="/digital-marketing-hero.png"
                      width={550}
                      height={550}
                      alt="Digital Technology Illustration"
                      className="rounded-xl object-cover p-1"
                      priority
                    />
                  </div>
                </div>
              </RevealSection>
            </div>
          </div>
        </section>

        <section id="services" className="relative w-full py-12 md:py-24 lg:py-32">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/50 to-background"></div>
          <div className="container px-4 md:px-6">
            <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  <Star className="mr-1 h-3.5 w-3.5" />
                  <span>Our Services</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Comprehensive <span className="text-primary">Digital Solutions</span>
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  We offer a wide range of services to help your business succeed in the digital landscape.
                </p>
              </div>
            </RevealSection>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <RevealSection
                delay={50}
                className="group relative overflow-hidden border border-primary/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-primary/10 rounded-xl hover:scale-105 duration-500"
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                    <Laptop className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Web Design</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Beautiful, responsive websites that engage your audience and reflect your brand identity.
                  </p>
                  <ul className="mb-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Responsive Design</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>UI/UX Excellence</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Brand Integration</span>
                    </li>
                  </ul>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-primary hover:bg-primary/10 hover:text-primary group"
                    asChild
                  >
                    <Link href="/services/web-design">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </RevealSection>
              <RevealSection
                delay={100}
                className="group relative overflow-hidden border border-primary/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-primary/10 rounded-xl hover:scale-105 duration-500"
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                    <Code className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Web Development</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Custom web applications and solutions built with the latest technologies and best practices.
                  </p>
                  <ul className="mb-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                      <span>Custom Applications</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                      <span>E-commerce Solutions</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                      <span>CMS Integration</span>
                    </li>
                  </ul>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-blue-500 hover:bg-blue-500/10 hover:text-blue-500 group"
                    asChild
                  >
                    <Link href="/services/web-development">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </RevealSection>
              <RevealSection
                delay={150}
                className="group relative overflow-hidden border border-primary/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-primary/10 rounded-xl hover:scale-105 duration-500"
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                    <Cloud className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Cloud Solutions</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Scalable, secure cloud infrastructure and services to power your digital business.
                  </p>
                  <ul className="mb-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                      <span>Cloud Migration</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                      <span>Serverless Architecture</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                      <span>DevOps & CI/CD</span>
                    </li>
                  </ul>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-purple-500 hover:bg-purple-500/10 hover:text-purple-500 group"
                    asChild
                  >
                    <Link href="/services/cloud-solutions">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </RevealSection>
              <RevealSection
                delay={200}
                className="group relative overflow-hidden border border-primary/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-primary/10 rounded-xl hover:scale-105 duration-500"
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Mobile App Development</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Custom mobile applications for iOS and Android that engage users and drive business growth.
                  </p>
                  <ul className="mb-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                      <span>Native & Cross-Platform</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                      <span>UI/UX Design</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                      <span>App Store Optimization</span>
                    </li>
                  </ul>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500 group"
                    asChild
                  >
                    <Link href="/services/mobile-app-development">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </RevealSection>
              <RevealSection
                delay={200}
                className="group relative overflow-hidden border border-primary/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-primary/10 rounded-xl hover:scale-105 duration-500"
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Digital Marketing</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Strategic digital marketing solutions to increase your online presence and drive growth.
                  </p>
                  <ul className="mb-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-amber-500" />
                      <span>SEO Optimization</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-amber-500" />
                      <span>Social Media Marketing</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-amber-500" />
                      <span>Content Strategy</span>
                    </li>
                  </ul>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-amber-500 hover:bg-amber-500/10 hover:text-amber-500 group"
                    asChild
                  >
                    <Link href="/services/digital-marketing">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </RevealSection>
              <RevealSection
                delay={250}
                className="group relative overflow-hidden border border-primary/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-primary/10 rounded-xl hover:scale-105 duration-500"
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-green-500 text-white shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Library Automation</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Comprehensive library management systems to streamline operations and enhance user experience.
                  </p>
                  <ul className="mb-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-teal-500" />
                      <span>Catalog Management</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-teal-500" />
                      <span>Digital Archives</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-teal-500" />
                      <span>RFID Integration</span>
                    </li>
                  </ul>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-teal-500 hover:bg-teal-500/10 hover:text-teal-500 group"
                    asChild
                  >
                    <Link href="/services/library-automation">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </RevealSection>
            </div>
          </div>
        </section>

        {/* Replace the static portfolio section with the dynamic PortfolioSection */}
        <PortfolioSection />

        <section id="about" className="relative w-full py-12 md:py-24 lg:py-32">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/50 to-background"></div>
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <RevealSection direction="left" className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                    <Star className="mr-1 h-3.5 w-3.5" />
                    <span>About Us</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Transforming <span className="text-primary">Ideas</span> into Digital Reality
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    DigiBayt is a leading web design, development, and cloud solutions company dedicated to helping
                    businesses thrive in the digital age.
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Originally established in 2016, we rebranded to DigiBayt in 2024. We've grown from a small team of passionate developers to a full-service digital
                    agency with expertise across the entire digital spectrum. Our mission is to deliver innovative,
                    high-quality solutions that drive real business results.
                  </p>
                  <p className="text-muted-foreground">
                    We combine technical excellence with creative thinking to create digital experiences that stand out.
                    Our team stays at the forefront of technology trends to ensure our clients receive cutting-edge
                    solutions that give them a competitive edge.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
                  >
                    <NavLink href="#team">Meet Our Team</NavLink>
                  </Button>
                </div>
              </RevealSection>
              <RevealSection direction="right" className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-teal-500 opacity-30 blur-xl"></div>
                  <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-background/80 backdrop-blur-sm hover:scale-[1.02] transition-transform duration-500">
                    <Image
                      src="/modern-tech-office.png"
                      width={500}
                      height={500}
                      alt="DigiBayt Team"
                      className="rounded-xl object-cover p-1"
                    />
                  </div>
                </div>
              </RevealSection>
            </div>
          </div>
        </section>

        <section id="team" className="relative w-full py-12 md:py-24 lg:py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 blur-3xl dark:from-primary/5 dark:to-purple-500/5" />
            <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-blue-500/10 to-teal-500/10 blur-3xl dark:from-blue-500/5 dark:to-teal-500/5" />
          </div>
          <div className="container px-4 md:px-6">
            <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  <Star className="mr-1 h-3.5 w-3.5" />
                  <span>Our Team</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Meet the <span className="text-primary">Experts</span> Behind DigiBayt
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Our talented team of professionals is dedicated to delivering exceptional digital solutions.
                </p>
              </div>
            </RevealSection>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <RevealSection
                delay={50}
                className="group relative overflow-hidden rounded-xl bg-background/80 backdrop-blur-sm border border-primary/20 transition-all hover:shadow-xl hover:shadow-primary/10 hover:scale-105 duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-600/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative overflow-hidden">
                  <Image
                    src="/male-tech-executive-headshot.png"
                    width={300}
                    height={300}
                    alt="Team Member"
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-all duration-500 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-lg font-bold">David Chen</h3>
                    <p className="text-sm text-white/80">Founder & CEO</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">David Chen</h3>
                  <p className="text-sm text-muted-foreground">Founder & CEO</p>
                </div>
              </RevealSection>
              <RevealSection
                delay={100}
                className="group relative overflow-hidden rounded-xl bg-background/80 backdrop-blur-sm border border-primary/20 transition-all hover:shadow-xl hover:shadow-primary/10 hover:scale-105 duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-teal-500/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative overflow-hidden">
                  <Image
                    src="/female-tech-executive-headshot.png"
                    width={300}
                    height={300}
                    alt="Team Member"
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-all duration-500 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-lg font-bold">Sarah Johnson</h3>
                    <p className="text-sm text-white/80">Lead Designer</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold group-hover:text-blue-500 transition-colors">Sarah Johnson</h3>
                  <p className="text-sm text-muted-foreground">Lead Designer</p>
                </div>
              </RevealSection>
              <RevealSection
                delay={150}
                className="group relative overflow-hidden rounded-xl bg-background/80 backdrop-blur-sm border border-primary/20 transition-all hover:shadow-xl hover:shadow-primary/10 hover:scale-105 duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative overflow-hidden">
                  <Image
                    src="/male-developer-headshot.png"
                    width={300}
                    height={300}
                    alt="Team Member"
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-all duration-500 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-lg font-bold">Michael Rodriguez</h3>
                    <p className="text-sm text-white/80">Lead Developer</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold group-hover:text-purple-500 transition-colors">Michael Rodriguez</h3>
                  <p className="text-sm text-muted-foreground">Lead Developer</p>
                </div>
              </RevealSection>
              <RevealSection
                delay={200}
                className="group relative overflow-hidden rounded-xl bg-background/80 backdrop-blur-sm border border-primary/20 transition-all hover:shadow-xl hover:shadow-primary/10 hover:scale-105 duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative overflow-hidden">
                  <Image
                    src="/confident-businesswoman.png"
                    width={300}
                    height={300}
                    alt="Team Member"
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-all duration-500 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-lg font-bold">Emily Patel</h3>
                    <p className="text-sm text-white/80">Cloud Architect</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold group-hover:text-amber-500 transition-colors">Emily Patel</h3>
                  <p className="text-sm text-muted-foreground">Cloud Architect</p>
                </div>
              </RevealSection>
            </div>
          </div>
        </section>

        <BlogSection />

        <section id="contact" className="relative w-full py-12 md:py-24 lg:py-32">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/50 to-background"></div>
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <RevealSection direction="left" className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                    <Star className="mr-1 h-3.5 w-3.5" />
                    <span>Contact Us</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Let's Discuss Your <span className="text-primary">Project</span>
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Ready to transform your digital presence? Get in touch with our team to discuss how we can help.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  {/* India Office */}
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">+91 9074433100</div>
                      <div className="text-sm text-muted-foreground">18/81D, Malappuram, Kerala, India - 673639</div>
                      <div className="text-xs text-primary font-medium mt-1">India Office</div>
                    </div>
                  </div>
                  {/* UAE Office */}
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">+971-542950594</div>
                      <div className="text-sm text-muted-foreground">Deira, Dubai, United Arab Emirates</div>
                      <div className="text-xs text-primary font-medium mt-1">UAE Office</div>
                    </div>
                  </div>
                </div>
              </RevealSection>
              <RevealSection direction="right" className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-purple-600 opacity-30 blur-xl"></div>
                <Card className="relative border border-primary/20 bg-background/80 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-500">
                  <CardHeader>
                    <CardTitle>Send Us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="first-name"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            First Name
                          </label>
                          <Input
                            id="first-name"
                            placeholder="John"
                            className="border-primary/20 focus:border-primary focus:ring-primary/20 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="last-name"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Last Name
                          </label>
                          <Input
                            id="last-name"
                            placeholder="Doe"
                            className="border-primary/20 focus:border-primary focus:ring-primary/20 transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Email
                        </label>
                        <Input
                          id="email"
                          placeholder="john.doe@example.com"
                          type="email"
                          className="border-primary/20 focus:border-primary focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Phone/WhatsApp Number
                        </label>
                        <Input
                          id="phone"
                          placeholder="+91 9074433100"
                          type="tel"
                          className="border-primary/20 focus:border-primary focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Message
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your project..."
                          className="min-h-[120px] border-primary/20 focus:border-primary focus:ring-primary/20 transition-all"
                        />
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]">
                      Send Message
                    </Button>
                  </CardFooter>
                </Card>
              </RevealSection>
            </div>
          </div>
        </section>
      </main>
      <footer className="relative w-full border-t border-primary/10 py-6 md:py-0">
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background/80 to-background"></div>
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-600 hover:scale-110 transition-transform">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              DigiBayt
            </span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 DigiBayt. All rights reserved.
          </p>
          <div className="flex gap-4">

                        <Link
              href="https://www.linkedin.com/company/digibayt/"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 bg-background text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
            
            <Link
              href="https://facebook.com/digibayt"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 bg-background text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            {/* <Link
              href="#"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 bg-background text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link> */}

            <Link
              href="https://www.instagram.com/digi.bayt/"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 bg-background text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
      </footer>
      <ScrollToTop />
    </div>
  )
}
