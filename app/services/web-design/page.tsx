import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Palette, Zap, Code, Smartphone, Search, BarChart3, Layers, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RevealSection } from "@/components/reveal-section"
import { ContactForm } from "@/components/contact-form"

export default function WebDesignPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-blue-500/30 to-indigo-500/30 blur-3xl dark:from-blue-500/20 dark:to-indigo-500/20" />
          <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-blue-500/30 to-indigo-500/30 blur-3xl dark:from-blue-500/20 dark:to-indigo-500/20" />
        </div>
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <RevealSection direction="left" className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-500">
                  <Palette className="mr-1 h-3.5 w-3.5" />
                  <span>Web Design</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Stunning <span className="text-blue-500">Web Designs</span> That Convert
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  We create beautiful, responsive websites that engage your audience and drive business growth.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-500/90 hover:to-indigo-500/90 text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
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
                  className="border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-500 transition-all hover:scale-105"
                  asChild
                >
                  <Link href="#services">Our Services</Link>
                </Button>
              </div>
            </RevealSection>
            <RevealSection direction="right" className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-30 blur-xl"></div>
                <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-background/80 backdrop-blur-sm hover:scale-[1.02] transition-transform duration-500">
                  <Image
                    src="/images/corporate-website-design.png"
                    width={550}
                    height={550}
                    alt="Web Design"
                    className="rounded-xl object-cover p-1"
                    priority
                  />
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative w-full py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/50 to-background"></div>
        <div className="container px-4 md:px-6">
          <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-500">
                <Zap className="mr-1 h-3.5 w-3.5" />
                <span>Our Services</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Comprehensive <span className="text-blue-500">Web Design</span> Services
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                From concept to completion, we offer a full range of web design services to meet your business needs.
              </p>
            </div>
          </RevealSection>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <RevealSection
              delay={50}
              className="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <Palette className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">UI/UX Design</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  User-centered design that creates intuitive, engaging experiences for your website visitors.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>User Research & Personas</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Wireframing & Prototyping</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Visual Design & Branding</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={100}
              className="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Front-End Development</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Clean, efficient code that brings your designs to life with smooth interactions and animations.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>HTML5/CSS3/JavaScript</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>React & Next.js</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Performance Optimization</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={150}
              className="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <Smartphone className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Responsive Design</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Websites that look and function beautifully on all devices, from desktops to smartphones.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Mobile-First Approach</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Cross-Browser Compatibility</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Adaptive Layouts</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={200}
              className="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">SEO-Friendly Design</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Websites built with search engine optimization in mind to improve your visibility online.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Semantic HTML Structure</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Fast Loading Speeds</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Schema Markup</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={250}
              className="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Conversion-Focused Design</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Strategic design that guides visitors toward your business goals and increases conversion rates.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Clear Call-to-Actions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Persuasive Content Layout</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>A/B Testing</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={300}
              className="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">CMS Integration</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Easy-to-use content management systems that give you control over your website content.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>WordPress Development</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Custom CMS Solutions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>User-Friendly Admin</span>
                  </li>
                </ul>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="relative w-full py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-blue-500/10 to-indigo-500/10 blur-3xl dark:from-blue-500/5 dark:to-indigo-500/5" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 blur-3xl dark:from-blue-500/5 dark:to-indigo-500/5" />
        </div>
        <div className="container px-4 md:px-6">
          <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-500">
                <Zap className="mr-1 h-3.5 w-3.5" />
                <span>Our Process</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Our <span className="text-blue-500">Design Process</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                We follow a proven methodology to deliver exceptional web design results.
              </p>
            </div>
          </RevealSection>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent hidden md:block"></div>

            <div className="space-y-12 relative">
              <RevealSection delay={50} className="md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="md:text-right md:pr-8">
                  <div className="space-y-2">
                    <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-500">
                      <span>Step 1</span>
                    </div>
                    <h3 className="text-2xl font-bold">Discovery & Strategy</h3>
                    <p className="text-muted-foreground">
                      We begin by understanding your business goals, target audience, and competitive landscape to
                      create a strategic design plan.
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:pl-8 relative">
                  <div className="absolute -left-4 top-1/2 h-8 w-8 rounded-full bg-blue-500 hidden md:flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20 blur-xl"></div>
                    <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-background/80 backdrop-blur-sm">
                      <Image
                        src="/images/web-design-process.png"
                        width={500}
                        height={300}
                        alt="Discovery Phase"
                        className="rounded-xl object-cover p-1"
                      />
                    </div>
                  </div>
                </div>
              </RevealSection>

              <RevealSection delay={100} className="md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="md:order-2 md:pl-8">
                  <div className="space-y-2">
                    <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-500">
                      <span>Step 2</span>
                    </div>
                    <h3 className="text-2xl font-bold">Wireframing & Prototyping</h3>
                    <p className="text-muted-foreground">
                      We create wireframes and interactive prototypes to visualize the structure and user flow of your
                      website before moving to visual design.
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:pr-8 relative">
                  <div className="absolute -right-4 top-1/2 h-8 w-8 rounded-full bg-blue-500 hidden md:flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20 blur-xl"></div>
                    <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-background/80 backdrop-blur-sm">                      <Image
                        src="/images/web-design-process.png"
                        width={500}
                        height={300}
                        alt="Wireframing Phase"
                        className="rounded-xl object-cover p-1"
                      />
                    </div>
                  </div>
                </div>
              </RevealSection>

              <RevealSection delay={150} className="md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="md:text-right md:pr-8">
                  <div className="space-y-2">
                    <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-500">
                      <span>Step 3</span>
                    </div>
                    <h3 className="text-2xl font-bold">Visual Design</h3>
                    <p className="text-muted-foreground">
                      We create stunning visual designs that align with your brand identity and appeal to your target
                      audience.
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:pl-8 relative">
                  <div className="absolute -left-4 top-1/2 h-8 w-8 rounded-full bg-blue-500 hidden md:flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20 blur-xl"></div>
                    <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-background/80 backdrop-blur-sm">                      <Image
                        src="/corporate-website-design.png"
                        width={500}
                        height={300}
                        alt="Visual Design Phase"
                        className="rounded-xl object-cover p-1"
                      />
                    </div>
                  </div>
                </div>
              </RevealSection>

              <RevealSection delay={200} className="md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="md:order-2 md:pl-8">
                  <div className="space-y-2">
                    <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-500">
                      <span>Step 4</span>
                    </div>
                    <h3 className="text-2xl font-bold">Development & Testing</h3>
                    <p className="text-muted-foreground">
                      We bring your designs to life with clean, efficient code and thoroughly test across devices and
                      browsers.
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:pr-8 relative">
                  <div className="absolute -right-4 top-1/2 h-8 w-8 rounded-full bg-blue-500 hidden md:flex items-center justify-center">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20 blur-xl"></div>
                    <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-background/80 backdrop-blur-sm">                      <Image
                        src="/images/web-development-illustration.png"
                        width={500}
                        height={300}
                        alt="Development Phase"
                        className="rounded-xl object-cover p-1"
                      />
                    </div>
                  </div>
                </div>
              </RevealSection>

              <RevealSection delay={250} className="md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="md:text-right md:pr-8">
                  <div className="space-y-2">
                    <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-500">
                      <span>Step 5</span>
                    </div>
                    <h3 className="text-2xl font-bold">Launch & Support</h3>
                    <p className="text-muted-foreground">
                      We ensure a smooth launch and provide ongoing support to keep your website performing at its best.
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:pl-8 relative">
                  <div className="absolute -left-4 top-1/2 h-8 w-8 rounded-full bg-blue-500 hidden md:flex items-center justify-center">
                    <span className="text-white font-bold">5</span>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20 blur-xl"></div>
                    <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-background/80 backdrop-blur-sm">
                      <Image
                        src="/website-launch-celebration.png"
                        width={500}
                        height={300}
                        alt="Launch Phase"
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
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/50 to-background"></div>
        <div className="container px-4 md:px-6">
          <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-500">
                <Zap className="mr-1 h-3.5 w-3.5" />
                <span>Case Studies</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Our <span className="text-blue-500">Recent Work</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Explore some of our successful web design projects.
              </p>
            </div>
          </RevealSection>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <RevealSection delay={50} className="group relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-indigo-500/80 opacity-0 transition-opacity group-hover:opacity-70"></div>
              <Image
                src="/images/corporate-website-design.png"
                width={400}
                height={300}
                alt="Corporate Website"
                className="aspect-video h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="text-xl font-bold text-white translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  Corporate Website Redesign
                </h3>
                <p className="mb-4 text-sm text-white/90 translate-y-4 transition-transform duration-500 delay-75 group-hover:translate-y-0">
                  Modern redesign for a financial services firm, increasing lead generation by 45%
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
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-indigo-500/80 opacity-0 transition-opacity group-hover:opacity-70"></div>
              <Image
                src="/images/restaurant-website-design.png"
                width={400}
                height={300}
                alt="Restaurant Website"
                className="aspect-video h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="text-xl font-bold text-white translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  Restaurant Website
                </h3>
                <p className="mb-4 text-sm text-white/90 translate-y-4 transition-transform duration-500 delay-75 group-hover:translate-y-0">
                  Appetizing design for a high-end restaurant, boosting online reservations by 60%
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
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-indigo-500/80 opacity-0 transition-opacity group-hover:opacity-70"></div>
              <Image
                src="/images/web-project-3.png"
                width={400}
                height={300}
                alt="E-commerce Website"
                className="aspect-video h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="text-xl font-bold text-white translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  E-commerce Platform
                </h3>
                <p className="mb-4 text-sm text-white/90 translate-y-4 transition-transform duration-500 delay-75 group-hover:translate-y-0">
                  Conversion-focused design for a fashion retailer, increasing sales by 35%
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
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-500/90 hover:to-indigo-500/90 text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </RevealSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-us" className="relative w-full py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-blue-500/10 to-indigo-500/10 blur-3xl dark:from-blue-500/5 dark:to-indigo-500/5" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 blur-3xl dark:from-blue-500/5 dark:to-indigo-500/5" />
        </div>
        <div className="container px-4 md:px-6">
          <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-500">
                <Mail className="mr-1 h-3.5 w-3.5" />
                <span>Get Started</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready for a <span className="text-blue-500">Website</span> That Stands Out?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Contact us today to discuss your web design project and get a free consultation.
              </p>
            </div>
          </RevealSection>

          <div className="mx-auto max-w-3xl">
            <RevealSection className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-30 blur-xl"></div>
              <ContactForm sourcePage="web-design" />
            </RevealSection>
          </div>
        </div>
      </section>
    </main>
  )
}
