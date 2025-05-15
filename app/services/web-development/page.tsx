import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  CheckCircle,
  Code,
  Database,
  Server,
  Zap,
  Globe,
  Layers,
  GitBranch,
  ShieldCheck,
  Rocket,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { RevealSection } from "@/components/reveal-section"
import { ContactForm } from "@/components/contact-form"

export default function WebDevelopmentPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-blue-500/30 to-teal-500/30 blur-3xl dark:from-blue-500/20 dark:to-teal-500/20" />
          <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-blue-500/30 to-teal-500/30 blur-3xl dark:from-blue-500/20 dark:to-teal-500/20" />
        </div>
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <RevealSection direction="left" className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-500">
                  <Code className="mr-1 h-3.5 w-3.5" />
                  <span>Web Development</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Powerful <span className="text-blue-500">Web Applications</span> Built for Performance
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  We develop custom web applications and solutions that drive business growth using cutting-edge
                  technologies and best practices.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-500/90 hover:to-teal-500/90 text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
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
                  <Link href="#technologies">Our Technologies</Link>
                </Button>
              </div>
            </RevealSection>
            <RevealSection direction="right" className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-teal-500 opacity-30 blur-xl"></div>
                <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-background/80 backdrop-blur-sm hover:scale-[1.02] transition-transform duration-500">
                  <Image
                    src="/images/web-development-hero.jpg"
                    width={550}
                    height={550}
                    alt="Web Development"
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
              <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-500">
                <Zap className="mr-1 h-3.5 w-3.5" />
                <span>Our Services</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Comprehensive <span className="text-blue-500">Web Development</span> Services
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                From custom web applications to e-commerce solutions, we deliver end-to-end development services
                tailored to your business needs.
              </p>
            </div>
          </RevealSection>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <RevealSection
              delay={50}
              className="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Custom Web Applications</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Tailor-made web applications designed to solve your specific business challenges and streamline
                  operations.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Scalable Architecture</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>User-Centric Design</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Robust Security</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={100}
              className="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">E-commerce Solutions</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Powerful online stores with seamless checkout experiences, inventory management, and payment
                  integration.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Secure Payment Gateways</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Inventory Management</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Customer Analytics</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={150}
              className="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">CMS Development</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Custom content management systems that give you complete control over your website content and
                  structure.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>User-Friendly Interfaces</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Custom Workflows</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Content Versioning</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={200}
              className="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <Server className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">API Development & Integration</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Robust APIs that connect your systems and enable seamless data flow between applications and services.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>RESTful & GraphQL APIs</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Third-Party Integrations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Microservices Architecture</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={250}
              className="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Web Application Security</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Comprehensive security solutions to protect your web applications from threats and vulnerabilities.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Security Audits</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Vulnerability Testing</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Compliance Implementation</span>
                  </li>
                </ul>
              </div>
            </RevealSection>

            <RevealSection
              delay={300}
              className="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-background/80 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105 duration-500"
            >
              <div className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <Rocket className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Performance Optimization</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Speed up your web applications for better user experience, higher conversions, and improved SEO
                  rankings.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Load Time Optimization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Code Refactoring</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Caching Strategies</span>
                  </li>
                </ul>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="relative w-full py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-blue-500/10 to-teal-500/10 blur-3xl dark:from-blue-500/5 dark:to-teal-500/5" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-blue-500/10 to-teal-500/10 blur-3xl dark:from-blue-500/5 dark:to-teal-500/5" />
        </div>
        <div className="container px-4 md:px-6">
          <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-500">
                <Layers className="mr-1 h-3.5 w-3.5" />
                <span>Our Tech Stack</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Cutting-Edge <span className="text-blue-500">Technologies</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                We use the latest technologies and frameworks to build robust, scalable, and high-performance web
                applications.
              </p>
            </div>
          </RevealSection>

          <div className="grid gap-8 md:grid-cols-2">
            <RevealSection direction="left" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Frontend Technologies</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 rounded-lg border border-blue-500/20 bg-background/80 p-4 backdrop-blur-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500/10">
                      <Image src="/icons/react-icon.png" width={24} height={24} alt="React" className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">React</h4>
                      <p className="text-xs text-muted-foreground">UI Library</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border border-blue-500/20 bg-background/80 p-4 backdrop-blur-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500/10">
                      <Image src="/icons/nextjs-icon.png" width={24} height={24} alt="Next.js" className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">Next.js</h4>
                      <p className="text-xs text-muted-foreground">React Framework</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border border-blue-500/20 bg-background/80 p-4 backdrop-blur-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500/10">
                      <Image
                        src="/icons/typescript-icon.png"
                        width={24}
                        height={24}
                        alt="TypeScript"
                        className="h-6 w-6"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">TypeScript</h4>
                      <p className="text-xs text-muted-foreground">Type Safety</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border border-blue-500/20 bg-background/80 p-4 backdrop-blur-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500/10">
                      <Image
                        src="/icons/tailwind-icon.png"
                        width={24}
                        height={24}
                        alt="Tailwind CSS"
                        className="h-6 w-6"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">Tailwind CSS</h4>
                      <p className="text-xs text-muted-foreground">Styling</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Backend Technologies</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 rounded-lg border border-blue-500/20 bg-background/80 p-4 backdrop-blur-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500/10">
                      <Image src="/icons/node-icon.png" width={24} height={24} alt="Node.js" className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">Node.js</h4>
                      <p className="text-xs text-muted-foreground">Runtime</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border border-blue-500/20 bg-background/80 p-4 backdrop-blur-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500/10">
                      <Image src="/express-icon.png" width={24} height={24} alt="Express" className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">Express</h4>
                      <p className="text-xs text-muted-foreground">Web Framework</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border border-blue-500/20 bg-background/80 p-4 backdrop-blur-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500/10">
                      <Image src="/icons/mongodb-icon.png" width={24} height={24} alt="MongoDB" className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">MongoDB</h4>
                      <p className="text-xs text-muted-foreground">Database</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border border-blue-500/20 bg-background/80 p-4 backdrop-blur-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500/10">
                      <Image
                        src="/icons/postgresql-icon.png"
                        width={24}
                        height={24}
                        alt="PostgreSQL"
                        className="h-6 w-6"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">PostgreSQL</h4>
                      <p className="text-xs text-muted-foreground">Database</p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>

            <RevealSection direction="right" className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-teal-500 opacity-20 blur-xl"></div>
                <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-background/80 backdrop-blur-sm">
                  <Image
                    src="/images/cloud-infrastructure.png"
                    width={500}
                    height={500}
                    alt="Technology Stack"
                    className="rounded-xl object-cover p-1"
                  />
                </div>
              </div>
            </RevealSection>
          </div>

          <RevealSection delay={200} className="mt-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-center">Development Workflow</h3>
              <div className="grid gap-6 md:grid-cols-4">
                <div className="rounded-lg border border-blue-500/20 bg-background/80 p-6 backdrop-blur-sm text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                    <GitBranch className="h-6 w-6 text-blue-500" />
                  </div>
                  <h4 className="mb-2 font-medium">Version Control</h4>
                  <p className="text-sm text-muted-foreground">Git & GitHub for code management and collaboration</p>
                </div>
                <div className="rounded-lg border border-blue-500/20 bg-background/80 p-6 backdrop-blur-sm text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                    <Code className="h-6 w-6 text-blue-500" />
                  </div>
                  <h4 className="mb-2 font-medium">CI/CD</h4>
                  <p className="text-sm text-muted-foreground">Automated testing and deployment for faster delivery</p>
                </div>
                <div className="rounded-lg border border-blue-500/20 bg-background/80 p-6 backdrop-blur-sm text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                    <Server className="h-6 w-6 text-blue-500" />
                  </div>
                  <h4 className="mb-2 font-medium">Infrastructure as Code</h4>
                  <p className="text-sm text-muted-foreground">
                    Terraform and AWS CloudFormation for infrastructure management
                  </p>
                </div>
                <div className="rounded-lg border border-blue-500/20 bg-background/80 p-6 backdrop-blur-sm text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                    <ShieldCheck className="h-6 w-6 text-blue-500" />
                  </div>
                  <h4 className="mb-2 font-medium">Security First</h4>
                  <p className="text-sm text-muted-foreground">
                    Security integrated throughout the development lifecycle
                  </p>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Case Studies */}
      <section className="relative w-full py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/50 to-background"></div>
        <div className="container px-4 md:px-6">
          <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-500">
                <Rocket className="mr-1 h-3.5 w-3.5" />
                <span>Case Studies</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Our <span className="text-blue-500">Success Stories</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Explore how we've helped businesses transform their digital presence with custom web development
                solutions.
              </p>
            </div>
          </RevealSection>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <RevealSection delay={50} className="group relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-teal-500/80 opacity-0 transition-opacity group-hover:opacity-70"></div>
              <Image
                src="/images/web-project-1.png"
                width={400}
                height={300}
                alt="E-commerce Platform"
                className="aspect-video h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="text-xl font-bold text-white translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  E-commerce Platform
                </h3>
                <p className="mb-4 text-sm text-white/90 translate-y-4 transition-transform duration-500 delay-75 group-hover:translate-y-0">
                  Custom shopping experience with 200% increase in conversions
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
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-teal-500/80 opacity-0 transition-opacity group-hover:opacity-70"></div>
              <Image
                src="/images/web-project-2.png"
                width={400}
                height={300}
                alt="FinTech Application"
                className="aspect-video h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="text-xl font-bold text-white translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  FinTech Application
                </h3>
                <p className="mb-4 text-sm text-white/90 translate-y-4 transition-transform duration-500 delay-75 group-hover:translate-y-0">
                  Secure banking platform with real-time transaction processing
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
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-teal-500/80 opacity-0 transition-opacity group-hover:opacity-70"></div>
              <Image
                src="/images/web-project-3.png"
                width={400}
                height={300}
                alt="SaaS Platform"
                className="aspect-video h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="text-xl font-bold text-white translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  SaaS Platform
                </h3>
                <p className="mb-4 text-sm text-white/90 translate-y-4 transition-transform duration-500 delay-75 group-hover:translate-y-0">
                  Scalable project management tool serving 10,000+ users
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
            <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-500/90 hover:to-teal-500/90 text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105">
              View All Case Studies
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </RevealSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-us" className="relative w-full py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-blue-500/10 to-teal-500/10 blur-3xl dark:from-blue-500/5 dark:to-teal-500/5" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-blue-500/10 to-teal-500/10 blur-3xl dark:from-blue-500/5 dark:to-teal-500/5" />
        </div>
        <div className="container px-4 md:px-6">
          <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-500">
                <Mail className="mr-1 h-3.5 w-3.5" />
                <span>Get Started</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to <span className="text-blue-500">Build</span> Your Next Web Application?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Contact us today to discuss your project and get a free consultation.
              </p>
            </div>
          </RevealSection>

          <div className="mx-auto max-w-3xl">
            <RevealSection className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-teal-500 opacity-30 blur-xl"></div>
              <ContactForm sourcePage="web-development" />
            </RevealSection>
          </div>
        </div>
      </section>
    </main>
  )
}
