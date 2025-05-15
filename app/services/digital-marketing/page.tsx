import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  CheckCircle,
  BarChart3,
  Zap,
  Search,
  Share2,
  Mail,
  MessageSquare,
  LineChart,
  Target,
  TrendingUp,
  Users,
  Rocket,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { RevealSection } from "@/components/reveal-section"
import { ContactForm } from "@/components/contact-form"

export default function DigitalMarketingPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-amber-500/30 to-orange-600/30 blur-3xl dark:from-amber-500/20 dark:to-orange-600/20" />
          <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-amber-500/30 to-orange-600/30 blur-3xl dark:from-amber-500/20 dark:to-orange-600/20" />
        </div>
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <RevealSection direction="left" className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-500">
                  <BarChart3 className="mr-1 h-3.5 w-3.5" />
                  <span>Digital Marketing</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Strategic <span className="text-amber-500">Digital Marketing</span> Solutions
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Drive growth, increase visibility, and connect with your target audience through our comprehensive
                  digital marketing services.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-500/90 hover:to-orange-600/90 text-white shadow-lg shadow-amber-500/20 transition-all hover:shadow-xl hover:shadow-amber-500/30 hover:scale-105"
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
                  className="border-amber-500/20 hover:bg-amber-500/10 hover:text-amber-500 transition-all hover:scale-105"
                  asChild
                >
                  <Link href="#services">Our Services</Link>
                </Button>
              </div>
            </RevealSection>
            <RevealSection direction="right" className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 opacity-30 blur-xl"></div>
                <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-background/80 backdrop-blur-sm hover:scale-[1.02] transition-transform duration-500">
                  <Image
                    src="/images/digital-marketing-hero.jpg"
                    width={550}
                    height={550}
                    alt="Digital Marketing"
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
              <div className="inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-500">
                <Zap className="mr-1 h-3.5 w-3.5" />
                <span>Our Services</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Comprehensive <span className="text-amber-500">Digital Marketing</span> Services
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                We offer a full range of digital marketing services to help your business thrive in the online
                landscape.
              </p>
            </div>
          </RevealSection>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <RevealSection
              delay={50}
              className="group relative overflow-hidden rounded-xl border border-amber-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-amber-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Search Engine Optimization (SEO)</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Improve your website's visibility in search engine results and drive organic traffic to your business.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-amber-500" />
                    <span>Keyword Research & Strategy</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-amber-500" />
                    <span>On-Page & Off-Page SEO</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-amber-500" />
                    <span>Technical SEO & Site Audits</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={100}
              className="group relative overflow-hidden rounded-xl border border-amber-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-amber-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Pay-Per-Click (PPC) Advertising</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Drive targeted traffic to your website with strategic paid advertising campaigns across multiple
                  platforms.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-amber-500" />
                    <span>Google Ads Management</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-amber-500" />
                    <span>Social Media Advertising</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-amber-500" />
                    <span>Retargeting Campaigns</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={150}
              className="group relative overflow-hidden rounded-xl border border-amber-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-amber-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                  <Share2 className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Social Media Marketing</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Build brand awareness, engage with your audience, and drive conversions through strategic social media
                  presence.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-amber-500" />
                    <span>Platform Strategy & Management</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-amber-500" />
                    <span>Content Creation & Curation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-amber-500" />
                    <span>Community Management</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={200}
              className="group relative overflow-hidden rounded-xl border border-amber-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-amber-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Email Marketing</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Nurture leads, build customer relationships, and drive conversions with targeted email campaigns.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-amber-500" />
                    <span>Campaign Strategy & Design</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-amber-500" />
                    <span>Automation & Drip Campaigns</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-amber-500" />
                    <span>Performance Analytics</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={250}
              className="group relative overflow-hidden rounded-xl border border-amber-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-amber-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Content Marketing</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Attract, engage, and convert your target audience with valuable, relevant content that establishes
                  your authority.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-amber-500" />
                    <span>Content Strategy & Planning</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-amber-500" />
                    <span>Blog & Article Creation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-amber-500" />
                    <span>Infographics & Visual Content</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={300}
              className="group relative overflow-hidden rounded-xl border border-amber-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-amber-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                  <LineChart className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Analytics & Reporting</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Track, analyze, and optimize your digital marketing performance with comprehensive data insights.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-amber-500" />
                    <span>Performance Tracking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-amber-500" />
                    <span>Custom Reporting Dashboards</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-amber-500" />
                    <span>Data-Driven Optimization</span>
                  </li>
                </ul>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="relative w-full py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-amber-500/10 to-orange-600/10 blur-3xl dark:from-amber-500/5 dark:to-orange-600/5" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-amber-500/10 to-orange-600/10 blur-3xl dark:from-amber-500/5 dark:to-orange-600/5" />
        </div>
        <div className="container px-4 md:px-6">
          <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-500">
                <Target className="mr-1 h-3.5 w-3.5" />
                <span>Our Approach</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Data-Driven <span className="text-amber-500">Marketing Strategy</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                We follow a strategic, results-oriented approach to digital marketing that drives real business growth.
              </p>
            </div>
          </RevealSection>

          <div className="grid gap-8 md:grid-cols-2">
            <RevealSection direction="left" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Our Marketing Framework</h3>
                <p className="text-muted-foreground">
                  Our comprehensive digital marketing framework is designed to deliver measurable results and maximize
                  your return on investment. We focus on understanding your business goals, target audience, and
                  competitive landscape to create customized strategies that drive growth.
                </p>
                <div className="space-y-4 mt-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                      <span className="text-lg font-bold text-amber-500">1</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Research & Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        We begin with thorough market research, competitor analysis, and audience insights to inform our
                        strategy.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                      <span className="text-lg font-bold text-amber-500">2</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Strategy Development</h4>
                      <p className="text-sm text-muted-foreground">
                        We create a customized marketing plan aligned with your business objectives and target audience.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                      <span className="text-lg font-bold text-amber-500">3</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Implementation & Execution</h4>
                      <p className="text-sm text-muted-foreground">
                        We deploy campaigns across relevant channels with meticulous attention to detail and quality.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                      <span className="text-lg font-bold text-amber-500">4</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Monitoring & Optimization</h4>
                      <p className="text-sm text-muted-foreground">
                        We continuously track performance and make data-driven adjustments to maximize results.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                      <span className="text-lg font-bold text-amber-500">5</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Reporting & Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        We provide transparent, comprehensive reporting on campaign performance and ROI.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>

            <RevealSection direction="right" className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 opacity-20 blur-xl"></div>
                <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-background/80 backdrop-blur-sm">
                  <Image
                    src="/images/digital-marketing-strategy.png"
                    width={500}
                    height={500}
                    alt="Digital Marketing Strategy"
                    className="rounded-xl object-cover p-1"
                  />
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="relative w-full py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/50 to-background"></div>
        <div className="container px-4 md:px-6">
          <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-500">
                <TrendingUp className="mr-1 h-3.5 w-3.5" />
                <span>Results</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Driving <span className="text-amber-500">Measurable Results</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Our digital marketing strategies deliver tangible business outcomes and sustainable growth.
              </p>
            </div>
          </RevealSection>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <RevealSection delay={50} className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/10">
                <Search className="h-10 w-10 text-amber-500" />
              </div>
              <h3 className="text-3xl font-bold text-amber-500">250%</h3>
              <p className="text-muted-foreground">Average increase in organic search traffic</p>
            </RevealSection>

            <RevealSection delay={100} className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/10">
                <Target className="h-10 w-10 text-amber-500" />
              </div>
              <h3 className="text-3xl font-bold text-amber-500">320%</h3>
              <p className="text-muted-foreground">Average ROI on PPC campaigns</p>
            </RevealSection>

            <RevealSection delay={150} className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/10">
                <Users className="h-10 w-10 text-amber-500" />
              </div>
              <h3 className="text-3xl font-bold text-amber-500">180%</h3>
              <p className="text-muted-foreground">Average increase in social media engagement</p>
            </RevealSection>

            <RevealSection delay={200} className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/10">
                <TrendingUp className="h-10 w-10 text-amber-500" />
              </div>
              <h3 className="text-3xl font-bold text-amber-500">200%</h3>
              <p className="text-muted-foreground">Average increase in conversion rates</p>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="relative w-full py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-amber-500/10 to-orange-600/10 blur-3xl dark:from-amber-500/5 dark:to-orange-600/5" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-amber-500/10 to-orange-600/10 blur-3xl dark:from-amber-500/5 dark:to-orange-600/5" />
        </div>
        <div className="container px-4 md:px-6">
          <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-500">
                <Rocket className="mr-1 h-3.5 w-3.5" />
                <span>Case Studies</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Our <span className="text-amber-500">Success Stories</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Explore how we've helped businesses achieve remarkable growth through strategic digital marketing.
              </p>
            </div>
          </RevealSection>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <RevealSection delay={50} className="group relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/80 to-orange-600/80 opacity-0 transition-opacity group-hover:opacity-70"></div>
              <Image
                src="/images/marketing-case-1.png"
                width={400}
                height={300}
                alt="E-commerce Case Study"
                className="aspect-video h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="text-xl font-bold text-white translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  E-commerce Growth
                </h3>
                <p className="mb-4 text-sm text-white/90 translate-y-4 transition-transform duration-500 delay-75 group-hover:translate-y-0">
                  300% increase in online sales through integrated digital marketing
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
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/80 to-orange-600/80 opacity-0 transition-opacity group-hover:opacity-70"></div>
              <Image
                src="/images/marketing-case-2.png"
                width={400}
                height={300}
                alt="B2B Case Study"
                className="aspect-video h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="text-xl font-bold text-white translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  B2B Lead Generation
                </h3>
                <p className="mb-4 text-sm text-white/90 translate-y-4 transition-transform duration-500 delay-75 group-hover:translate-y-0">
                  250% increase in qualified leads through targeted content marketing
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
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/80 to-orange-600/80 opacity-0 transition-opacity group-hover:opacity-70"></div>
              <Image
                src="/images/marketing-case-3.png"
                width={400}
                height={300}
                alt="Local Business Case Study"
                className="aspect-video h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="text-xl font-bold text-white translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  Local Business Expansion
                </h3>
                <p className="mb-4 text-sm text-white/90 translate-y-4 transition-transform duration-500 delay-75 group-hover:translate-y-0">
                  400% increase in foot traffic through local SEO and social media
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
            <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-500/90 hover:to-orange-600/90 text-white shadow-lg shadow-amber-500/20 transition-all hover:shadow-xl hover:shadow-amber-500/30 hover:scale-105">
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
              <div className="inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-500">
                <Mail className="mr-1 h-3.5 w-3.5" />
                <span>Get Started</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to <span className="text-amber-500">Grow</span> Your Business?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Contact us today to discuss your digital marketing needs and get a free consultation.
              </p>
            </div>
          </RevealSection>

          <div className="mx-auto max-w-3xl">
            <RevealSection className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 opacity-30 blur-xl"></div>
              <ContactForm sourcePage="digital-marketing" />
            </RevealSection>
          </div>
        </div>
      </section>
    </main>
  )
}
