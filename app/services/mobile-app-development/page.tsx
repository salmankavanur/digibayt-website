import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  CheckCircle,
  Smartphone,
  Zap,
  Layers,
  Code,
  ShoppingBag,
  Map,
  Activity,
  MessageSquare,
  Shield,
  Rocket,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { RevealSection } from "@/components/reveal-section"
import { ContactForm } from "@/components/contact-form"

export default function MobileAppDevelopmentPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-3xl dark:from-purple-500/20 dark:to-pink-500/20" />
          <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-purple-500/30 to-pink-500/30 blur-3xl dark:from-purple-500/20 dark:to-pink-500/20" />
        </div>
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <RevealSection direction="left" className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-500">
                  <Smartphone className="mr-1 h-3.5 w-3.5" />
                  <span>Mobile App Development</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Innovative <span className="text-purple-500">Mobile Apps</span> for Modern Businesses
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  We create powerful, user-friendly mobile applications that engage your audience and drive business
                  growth across iOS and Android platforms.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-500/90 hover:to-pink-500/90 text-white shadow-lg shadow-purple-500/20 transition-all hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105"
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
                  className="border-purple-500/20 hover:bg-purple-500/10 hover:text-purple-500 transition-all hover:scale-105"
                  asChild
                >
                  <Link href="#portfolio">View Our Work</Link>
                </Button>
              </div>
            </RevealSection>
            <RevealSection direction="right" className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 blur-xl"></div>
                <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-background/80 backdrop-blur-sm hover:scale-[1.02] transition-transform duration-500">
                  <Image
                    src="/images/mobile-app-development-hero.jpg"
                    width={550}
                    height={550}
                    alt="Mobile App Development"
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
      <section className="relative w-full py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/50 to-background"></div>
        <div className="container px-4 md:px-6">
          <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-500">
                <Zap className="mr-1 h-3.5 w-3.5" />
                <span>Our Services</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Comprehensive <span className="text-purple-500">Mobile App</span> Development Services
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                From concept to launch, we provide end-to-end mobile app development services tailored to your business
                needs.
              </p>
            </div>
          </RevealSection>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <RevealSection
              delay={50}
              className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-purple-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                  <Smartphone className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Native App Development</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  High-performance native applications for iOS and Android platforms with platform-specific features.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>iOS (Swift/Objective-C)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Android (Kotlin/Java)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Platform-Specific Optimizations</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={100}
              className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-purple-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Cross-Platform Development</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Cost-effective solutions that work seamlessly across multiple platforms with a single codebase.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>React Native</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Flutter</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Shared Codebase Efficiency</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={150}
              className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-purple-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">UI/UX Design</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Intuitive, engaging user interfaces that provide exceptional user experiences and drive engagement.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>User Research & Personas</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Wireframing & Prototyping</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Usability Testing</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={200}
              className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-purple-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">App Security</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Robust security measures to protect user data and ensure compliance with industry standards.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Secure Authentication</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Data Encryption</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Vulnerability Testing</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={250}
              className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-purple-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                  <Activity className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">App Maintenance & Support</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Ongoing maintenance, updates, and support to ensure your app remains secure and up-to-date.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Regular Updates</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Performance Monitoring</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Technical Support</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={300}
              className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-purple-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                  <Rocket className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">App Store Optimization</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Strategies to improve your app's visibility and increase downloads on app stores.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Keyword Optimization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Conversion Rate Optimization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Ratings & Reviews Management</span>
                  </li>
                </ul>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* App Types Section */}
      <section id="app-types" className="relative w-full py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl dark:from-purple-500/5 dark:to-pink-500/5" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-purple-500/10 to-pink-500/10 blur-3xl dark:from-purple-500/5 dark:to-pink-500/5" />
        </div>
        <div className="container px-4 md:px-6">
          <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-500">
                <Smartphone className="mr-1 h-3.5 w-3.5" />
                <span>App Types</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Mobile Apps for <span className="text-purple-500">Every Industry</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                We develop custom mobile applications for various industries, each tailored to meet specific business
                needs and user expectations.
              </p>
            </div>
          </RevealSection>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <RevealSection
              delay={50}
              className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-purple-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6 text-center">
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">E-commerce Apps</h3>
                <p className="text-sm text-muted-foreground">
                  Feature-rich shopping applications with secure payment gateways, product catalogs, and personalized
                  recommendations.
                </p>
              </div>
            </RevealSection>

            <RevealSection
              delay={100}
              className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-purple-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6 text-center">
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                  <Activity className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Health & Fitness Apps</h3>
                <p className="text-sm text-muted-foreground">
                  Wellness applications with activity tracking, health monitoring, and personalized fitness plans.
                </p>
              </div>
            </RevealSection>

            <RevealSection
              delay={150}
              className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-purple-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6 text-center">
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                  <Map className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">On-Demand Service Apps</h3>
                <p className="text-sm text-muted-foreground">
                  Service delivery applications with real-time tracking, booking systems, and payment processing.
                </p>
              </div>
            </RevealSection>

            <RevealSection
              delay={200}
              className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-purple-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6 text-center">
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Social Networking Apps</h3>
                <p className="text-sm text-muted-foreground">
                  Community platforms with real-time messaging, content sharing, and user engagement features.
                </p>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="relative w-full py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/50 to-background"></div>
        <div className="container px-4 md:px-6">
          <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-500">
                <Layers className="mr-1 h-3.5 w-3.5" />
                <span>Our Process</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Our App Development <span className="text-purple-500">Process</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                We follow a structured approach to ensure your mobile app is delivered on time, within budget, and
                exceeds expectations.
              </p>
            </div>
          </RevealSection>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-purple-500/20 to-transparent hidden md:block"></div>

            <div className="space-y-12 relative">
              <RevealSection delay={50} className="md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="md:text-right md:pr-8">
                  <div className="space-y-2">
                    <div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-500">
                      <span>Step 1</span>
                    </div>
                    <h3 className="text-2xl font-bold">Discovery & Planning</h3>
                    <p className="text-muted-foreground">
                      We begin by understanding your business goals, target audience, and app requirements to create a
                      comprehensive development plan.
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:pl-8 relative">
                  <div className="absolute -left-4 top-1/2 h-8 w-8 rounded-full bg-purple-500 hidden md:flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur-xl"></div>
                    <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-background/80 backdrop-blur-sm">
                      <Image
                        src="/images/app-discovery-phase.png"
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
                    <div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-500">
                      <span>Step 2</span>
                    </div>
                    <h3 className="text-2xl font-bold">UI/UX Design</h3>
                    <p className="text-muted-foreground">
                      Our designers create intuitive, engaging user interfaces and experiences that align with your
                      brand and meet user expectations.
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:order-1 md:pr-8 relative">
                  <div className="absolute -right-4 top-1/2 h-8 w-8 rounded-full bg-purple-500 hidden md:flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur-xl"></div>
                    <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-background/80 backdrop-blur-sm">
                      <Image
                        src="/images/app-design-phase.png"
                        width={500}
                        height={300}
                        alt="Design Phase"
                        className="rounded-xl object-cover p-1"
                      />
                    </div>
                  </div>
                </div>
              </RevealSection>

              <RevealSection delay={150} className="md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="md:text-right md:pr-8">
                  <div className="space-y-2">
                    <div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-500">
                      <span>Step 3</span>
                    </div>
                    <h3 className="text-2xl font-bold">Development</h3>
                    <p className="text-muted-foreground">
                      Our developers build your app using the latest technologies and best practices, ensuring high
                      performance and scalability.
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:pl-8 relative">
                  <div className="absolute -left-4 top-1/2 h-8 w-8 rounded-full bg-purple-500 hidden md:flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur-xl"></div>
                    <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-background/80 backdrop-blur-sm">
                      <Image
                        src="/images/app-development-phase.png"
                        width={500}
                        height={300}
                        alt="Development Phase"
                        className="rounded-xl object-cover p-1"
                      />
                    </div>
                  </div>
                </div>
              </RevealSection>

              <RevealSection delay={200} className="md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className="md:order-2 md:pl-8">
                  <div className="space-y-2">
                    <div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-500">
                      <span>Step 4</span>
                    </div>
                    <h3 className="text-2xl font-bold">Testing & Launch</h3>
                    <p className="text-muted-foreground">
                      We rigorously test your app across devices and scenarios, then help you launch it on app stores
                      with optimized listings.
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:order-1 md:pr-8 relative">
                  <div className="absolute -right-4 top-1/2 h-8 w-8 rounded-full bg-purple-500 hidden md:flex items-center justify-center">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur-xl"></div>
                    <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-background/80 backdrop-blur-sm">
                      <Image
                        src="/images/app-testing-phase.png"
                        width={500}
                        height={300}
                        alt="Testing Phase"
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

      {/* Portfolio Section */}
      <section id="portfolio" className="relative w-full py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl dark:from-purple-500/5 dark:to-pink-500/5" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-purple-500/10 to-pink-500/10 blur-3xl dark:from-purple-500/5 dark:to-pink-500/5" />
        </div>
        <div className="container px-4 md:px-6">
          <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-500">
                <Smartphone className="mr-1 h-3.5 w-3.5" />
                <span>Portfolio</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Our <span className="text-purple-500">Mobile App</span> Portfolio
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Explore some of our latest mobile app projects and see what we can do for you.
              </p>
            </div>
          </RevealSection>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <RevealSection delay={50} className="group relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/80 to-pink-500/80 opacity-0 transition-opacity group-hover:opacity-70"></div>
              <Image
                src="/images/app-project-1.png"
                width={400}
                height={300}
                alt="Fitness App"
                className="aspect-video h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="text-xl font-bold text-white translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  FitTrack Pro
                </h3>
                <p className="mb-4 text-sm text-white/90 translate-y-4 transition-transform duration-500 delay-75 group-hover:translate-y-0">
                  Fitness tracking app with personalized workout plans
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
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/80 to-pink-500/80 opacity-0 transition-opacity group-hover:opacity-70"></div>
              <Image
                src="/images/app-project-2.png"
                width={400}
                height={300}
                alt="Food Delivery App"
                className="aspect-video h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="text-xl font-bold text-white translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  QuickBite
                </h3>
                <p className="mb-4 text-sm text-white/90 translate-y-4 transition-transform duration-500 delay-75 group-hover:translate-y-0">
                  Food delivery app with real-time order tracking
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
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/80 to-pink-500/80 opacity-0 transition-opacity group-hover:opacity-70"></div>
              <Image
                src="/images/app-project-3.png"
                width={400}
                height={300}
                alt="E-commerce App"
                className="aspect-video h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="text-xl font-bold text-white translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  ShopEase
                </h3>
                <p className="mb-4 text-sm text-white/90 translate-y-4 transition-transform duration-500 delay-75 group-hover:translate-y-0">
                  E-commerce app with AR product visualization
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
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-500/90 hover:to-pink-500/90 text-white shadow-lg shadow-purple-500/20 transition-all hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105">
              View All Projects
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
              <div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-500">
                <Mail className="mr-1 h-3.5 w-3.5" />
                <span>Get Started</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to Build Your <span className="text-purple-500">Mobile App</span>?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Contact us today to discuss your project and get a free consultation.
              </p>
            </div>
          </RevealSection>

          <div className="mx-auto max-w-3xl">
            <RevealSection className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 blur-xl"></div>
              <ContactForm sourcePage="mobile-app-development" />
            </RevealSection>
          </div>
        </div>
      </section>
    </main>
  )
}
