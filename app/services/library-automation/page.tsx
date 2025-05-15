import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  CheckCircle,
  BookOpen,
  Zap,
  BarChart3,
  Search,
  Users,
  Database,
  Shield,
  Clock,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { RevealSection } from "@/components/reveal-section"
import { ContactForm } from "@/components/contact-form"

export default function LibraryAutomationPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-500/30 blur-3xl dark:from-emerald-500/20 dark:to-teal-500/20" />
          <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-emerald-500/30 to-teal-500/30 blur-3xl dark:from-emerald-500/20 dark:to-teal-500/20" />
        </div>
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <RevealSection direction="left" className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-500">
                  <BookOpen className="mr-1 h-3.5 w-3.5" />
                  <span>Library Automation</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Modern <span className="text-emerald-500">Library Management</span> Solutions
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Streamline your library operations with our comprehensive automation solutions designed for academic,
                  public, and special libraries.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-500/90 hover:to-teal-500/90 text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-105"
                  asChild
                >
                  <Link href="#contact-us">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-emerald-500/20 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all hover:scale-105"
                  asChild
                >
                  <Link href="#features">Key Features</Link>
                </Button>
              </div>
            </RevealSection>
            <RevealSection direction="right" className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-30 blur-xl"></div>
                <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-background/80 backdrop-blur-sm hover:scale-[1.02] transition-transform duration-500">
                  <Image
                    src="/images/modern-university-library.png"
                    width={550}
                    height={550}
                    alt="Modern University Library"
                    className="rounded-xl object-cover p-1"
                    priority
                  />
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative w-full py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/50 to-background"></div>
        <div className="container px-4 md:px-6">
          <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-500">
                <Zap className="mr-1 h-3.5 w-3.5" />
                <span>Key Features</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Comprehensive <span className="text-emerald-500">Library Automation</span> Features
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Our library management system offers a complete suite of features to modernize your library operations.
              </p>
            </div>
          </RevealSection>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <RevealSection
              delay={50}
              className="group relative overflow-hidden rounded-xl border border-emerald-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-emerald-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Catalog Management</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Comprehensive catalog management with support for various metadata standards and formats.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                    <span>MARC21 & Dublin Core Support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                    <span>Batch Import/Export</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                    <span>Authority Control</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={100}
              className="group relative overflow-hidden rounded-xl border border-emerald-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-emerald-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Circulation Management</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Streamline check-in/check-out processes, manage holds, and automate renewals and recalls.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                    <span>Barcode & RFID Integration</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                    <span>Customizable Loan Policies</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                    <span>Automated Notifications</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={150}
              className="group relative overflow-hidden rounded-xl border border-emerald-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-emerald-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Patron Management</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Manage patron records, track borrowing history, and handle fines and payments.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                    <span>Self-Service Portal</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                    <span>Online Fine Payment</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                    <span>Borrowing History</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={200}
              className="group relative overflow-hidden rounded-xl border border-emerald-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-emerald-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Discovery Interface</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Powerful search capabilities with faceted navigation and personalized recommendations.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                    <span>Advanced Search Options</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                    <span>Relevance Ranking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                    <span>Mobile-Friendly Interface</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={250}
              className="group relative overflow-hidden rounded-xl border border-emerald-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-emerald-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Reporting & Analytics</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Comprehensive reporting tools to track usage, collection performance, and operational metrics.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                    <span>Customizable Reports</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                    <span>Usage Statistics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                    <span>Collection Analysis</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={300}
              className="group relative overflow-hidden rounded-xl border border-emerald-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-emerald-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Security & Integration</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Robust security features and seamless integration with existing systems and third-party services.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                    <span>Role-Based Access Control</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                    <span>API Integration</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                    <span>Single Sign-On</span>
                  </li>
                </ul>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative w-full py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10 blur-3xl dark:from-emerald-500/5 dark:to-teal-500/5" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 blur-3xl dark:from-emerald-500/5 dark:to-teal-500/5" />
        </div>
        <div className="container px-4 md:px-6">
          <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-500">
                <Zap className="mr-1 h-3.5 w-3.5" />
                <span>Benefits</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Why Choose Our <span className="text-emerald-500">Library Automation</span> Solution
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Discover how our library management system can transform your library operations.
              </p>
            </div>
          </RevealSection>

          <div className="grid gap-8 md:grid-cols-2">
            <RevealSection direction="left" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Operational Benefits</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Increased Efficiency</h4>
                      <p className="text-sm text-muted-foreground">
                        Automate routine tasks and streamline workflows to save staff time and reduce operational costs.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Improved Accuracy</h4>
                      <p className="text-sm text-muted-foreground">
                        Reduce human error in cataloging, circulation, and inventory management processes.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Enhanced Resource Management</h4>
                      <p className="text-sm text-muted-foreground">
                        Better track and manage your collection, identify gaps, and optimize acquisition decisions.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection direction="right" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">User Experience Benefits</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Improved Accessibility</h4>
                      <p className="text-sm text-muted-foreground">
                        Provide 24/7 access to library resources and services through web and mobile interfaces.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Enhanced Discovery</h4>
                      <p className="text-sm text-muted-foreground">
                        Help users find relevant resources more easily with powerful search and recommendation features.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Self-Service Options</h4>
                      <p className="text-sm text-muted-foreground">
                        Empower patrons with self-checkout, account management, and online reservation capabilities.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="relative w-full py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/50 to-background"></div>
        <div className="container px-4 md:px-6">
          <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-500">
                <Clock className="mr-1 h-3.5 w-3.5" />
                <span>Implementation</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Our <span className="text-emerald-500">Implementation</span> Process
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                We follow a structured approach to ensure a smooth transition to your new library management system.
              </p>
            </div>
          </RevealSection>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent hidden md:block"></div>

            <div className="space-y-12 relative">
              <RevealSection delay={50} className="md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="md:text-right md:pr-8">
                  <div className="space-y-2">
                    <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-500">
                      <span>Step 1</span>
                    </div>
                    <h3 className="text-2xl font-bold">Assessment & Planning</h3>
                    <p className="text-muted-foreground">
                      We begin by understanding your library's needs, workflows, and existing systems to create a
                      comprehensive implementation plan.
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:pl-8 relative">
                  <div className="absolute -left-4 top-1/2 h-8 w-8 rounded-full bg-emerald-500 hidden md:flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 blur-xl"></div>
                    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-background/80 backdrop-blur-sm">
                      <Image
                        src="/images/library-dashboard.png"
                        width={500}
                        height={300}
                        alt="Assessment Phase"
                        className="rounded-xl object-cover p-1"
                      />
                    </div>
                  </div>
                </div>
              </RevealSection>

              <RevealSection delay={100} className="md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="md:order-2 md:pl-8">
                  <div className="space-y-2">
                    <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-500">
                      <span>Step 2</span>
                    </div>
                    <h3 className="text-2xl font-bold">Data Migration</h3>
                    <p className="text-muted-foreground">
                      We carefully migrate your existing catalog and patron data to the new system, ensuring data
                      integrity and completeness.
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:pr-8 relative">
                  <div className="absolute -right-4 top-1/2 h-8 w-8 rounded-full bg-emerald-500 hidden md:flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 blur-xl"></div>
                    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-background/80 backdrop-blur-sm">
                      <Image
                        src="/placeholder.svg?key=kwmwo"
                        width={500}
                        height={300}
                        alt="Data Migration"
                        className="rounded-xl object-cover p-1"
                      />
                    </div>
                  </div>
                </div>
              </RevealSection>

              <RevealSection delay={150} className="md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="md:text-right md:pr-8">
                  <div className="space-y-2">
                    <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-500">
                      <span>Step 3</span>
                    </div>
                    <h3 className="text-2xl font-bold">Configuration & Customization</h3>
                    <p className="text-muted-foreground">
                      We configure the system to match your library's policies, workflows, and branding requirements.
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:pl-8 relative">
                  <div className="absolute -left-4 top-1/2 h-8 w-8 rounded-full bg-emerald-500 hidden md:flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 blur-xl"></div>
                    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-background/80 backdrop-blur-sm">
                      <Image
                        src="/placeholder.svg?key=cjtru"
                        width={500}
                        height={300}
                        alt="Configuration Phase"
                        className="rounded-xl object-cover p-1"
                      />
                    </div>
                  </div>
                </div>
              </RevealSection>

              <RevealSection delay={200} className="md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="md:order-2 md:pl-8">
                  <div className="space-y-2">
                    <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-500">
                      <span>Step 4</span>
                    </div>
                    <h3 className="text-2xl font-bold">Training & Support</h3>
                    <p className="text-muted-foreground">
                      We provide comprehensive training for staff and ongoing support to ensure your library gets the
                      most from the system.
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:pr-8 relative">
                  <div className="absolute -right-4 top-1/2 h-8 w-8 rounded-full bg-emerald-500 hidden md:flex items-center justify-center">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 blur-xl"></div>
                    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-background/80 backdrop-blur-sm">
                      <Image
                        src="/images/library-staff-training.png"
                        width={500}
                        height={300}
                        alt="Training Phase"
                        className="rounded-xl object-cover p-1"
                      />
                    </div>
                  </div>
                </div>
              </RevealSection>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="relative w-full py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10 blur-3xl dark:from-emerald-500/5 dark:to-teal-500/5" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 blur-3xl dark:from-emerald-500/5 dark:to-teal-500/5" />
        </div>
        <div className="container px-4 md:px-6">
          <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-500">
                <BookOpen className="mr-1 h-3.5 w-3.5" />
                <span>Success Stories</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Our <span className="text-emerald-500">Case Studies</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Explore how we've helped libraries transform their operations with our automation solutions.
              </p>
            </div>
          </RevealSection>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <RevealSection delay={50} className="group relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/80 to-teal-500/80 opacity-0 transition-opacity group-hover:opacity-70"></div>
              <Image
                src="/images/modern-university-library.png"
                width={400}
                height={300}
                alt="University Library Case Study"
                className="aspect-video h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="text-xl font-bold text-white translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  National University Library
                </h3>
                <p className="mb-4 text-sm text-white/90 translate-y-4 transition-transform duration-500 delay-75 group-hover:translate-y-0">
                  Modernized operations for a major university library with 500,000+ volumes
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 translate-y-4 transition-transform duration-500 delay-150 group-hover:translate-y-0"
                >
                  View Case Study
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </RevealSection>

            <RevealSection delay={100} className="group relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/80 to-teal-500/80 opacity-0 transition-opacity group-hover:opacity-70"></div>
              <Image
                src="/placeholder.svg?key=tkhlv"
                width={400}
                height={300}
                alt="Public Library Case Study"
                className="aspect-video h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="text-xl font-bold text-white translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  Metro Public Library Network
                </h3>
                <p className="mb-4 text-sm text-white/90 translate-y-4 transition-transform duration-500 delay-75 group-hover:translate-y-0">
                  Unified 12 branch libraries under a single, integrated system
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 translate-y-4 transition-transform duration-500 delay-150 group-hover:translate-y-0"
                >
                  View Case Study
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </RevealSection>

            <RevealSection delay={150} className="group relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/80 to-teal-500/80 opacity-0 transition-opacity group-hover:opacity-70"></div>
              <Image
                src="/placeholder.svg?key=o2g8t"
                width={400}
                height={300}
                alt="Special Library Case Study"
                className="aspect-video h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="text-xl font-bold text-white translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  Medical Research Institute
                </h3>
                <p className="mb-4 text-sm text-white/90 translate-y-4 transition-transform duration-500 delay-75 group-hover:translate-y-0">
                  Specialized solution for a medical research library with complex metadata requirements
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 translate-y-4 transition-transform duration-500 delay-150 group-hover:translate-y-0"
                >
                  View Case Study
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </RevealSection>
          </div>

          <RevealSection delay={200} className="flex justify-center mt-10">
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-500/90 hover:to-teal-500/90 text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-105">
              View All Case Studies
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </RevealSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-us" className="relative w-full py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/50 to-background"></div>
        <div className="container px-4 md:px-6">
          <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-500">
                <Mail className="mr-1 h-3.5 w-3.5" />
                <span>Get Started</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to <span className="text-emerald-500">Transform</span> Your Library?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Contact us today to discuss your library automation needs and get a free consultation.
              </p>
            </div>
          </RevealSection>

          <div className="mx-auto max-w-3xl">
            <RevealSection className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-30 blur-xl"></div>
              <ContactForm sourcePage="library-automation" />
            </RevealSection>
          </div>
        </div>
      </section>
    </main>
  )
}
