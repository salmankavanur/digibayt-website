import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  CheckCircle,
  Cloud,
  Zap,
  Server,
  Shield,
  Database,
  Code,
  BarChart3,
  RefreshCw,
  Globe,
  Rocket,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { RevealSection } from "@/components/reveal-section"
import { ContactForm } from "@/components/contact-form"

export default function CloudSolutionsPage() {
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
                  <Cloud className="mr-1 h-3.5 w-3.5" />
                  <span>Cloud Solutions</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Scalable <span className="text-purple-500">Cloud Infrastructure</span> for Modern Businesses
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  We design, implement, and manage secure, scalable cloud solutions that power your digital
                  transformation and drive business growth.
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
                  <Link href="#services">Our Services</Link>
                </Button>
              </div>
            </RevealSection>
            <RevealSection direction="right" className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 blur-xl"></div>
                <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-background/80 backdrop-blur-sm hover:scale-[1.02] transition-transform duration-500">
                  <Image
                    src="/images/cloud-solutions-hero.jpg"
                    width={550}
                    height={550}
                    alt="Cloud Solutions"
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
              <div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-500">
                <Zap className="mr-1 h-3.5 w-3.5" />
                <span>Our Services</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Comprehensive <span className="text-purple-500">Cloud Solutions</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                From cloud migration to managed services, we provide end-to-end cloud solutions tailored to your
                business needs.
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
                  <Cloud className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Cloud Migration</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Seamlessly transition your applications, data, and infrastructure to the cloud with minimal disruption
                  to your business.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Assessment & Planning</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Data Migration</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Application Modernization</span>
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
                  <Server className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Cloud Infrastructure</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Design and implement scalable, secure cloud infrastructure that meets your performance and compliance
                  requirements.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Infrastructure as Code</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Multi-Cloud Architecture</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Serverless Computing</span>
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
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Cloud Security</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Protect your cloud environment with comprehensive security solutions that safeguard your data and
                  applications.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Security Assessment</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Identity & Access Management</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Compliance Implementation</span>
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
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Cloud Databases</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Implement and manage high-performance, scalable database solutions in the cloud for your data-driven
                  applications.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Database Migration</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Performance Optimization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>High Availability Setup</span>
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
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">DevOps & CI/CD</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Implement DevOps practices and CI/CD pipelines to accelerate your software delivery and improve
                  quality.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>CI/CD Pipeline Setup</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Infrastructure Automation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Containerization & Orchestration</span>
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
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Cloud Monitoring & Management</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Proactively monitor and manage your cloud environment to ensure optimal performance, security, and
                  cost efficiency.
                </p>
                <ul className="mb-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Performance Monitoring</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Cost Optimization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Incident Response</span>
                  </li>
                </ul>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Cloud Providers Section */}
      <section className="relative w-full py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl dark:from-purple-500/5 dark:to-pink-500/5" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-purple-500/10 to-pink-500/10 blur-3xl dark:from-purple-500/5 dark:to-pink-500/5" />
        </div>
        <div className="container px-4 md:px-6">
          <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-500">
                <Globe className="mr-1 h-3.5 w-3.5" />
                <span>Cloud Providers</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Multi-Cloud <span className="text-purple-500">Expertise</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                We work with all major cloud providers to deliver the best solution for your specific needs.
              </p>
            </div>
          </RevealSection>

          <div className="grid gap-8 md:grid-cols-3">
            <RevealSection delay={50} className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/10">
                <Image src="/icons/aws-icon.png" width={60} height={60} alt="AWS" className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold">Amazon Web Services</h3>
              <p className="text-muted-foreground">
                Leverage the power and flexibility of AWS with our certified experts who can design, implement, and
                manage your AWS infrastructure.
              </p>
            </RevealSection>

            <RevealSection delay={100} className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/10">
                <Image src="/icons/azure-icon.png" width={60} height={60} alt="Azure" className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold">Microsoft Azure</h3>
              <p className="text-muted-foreground">
                Maximize your Microsoft investments with Azure cloud solutions that integrate seamlessly with your
                existing Microsoft ecosystem.
              </p>
            </RevealSection>

            <RevealSection delay={150} className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/10">
                <Image src="/icons/gcp-icon.png" width={60} height={60} alt="Google Cloud" className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold">Google Cloud Platform</h3>
              <p className="text-muted-foreground">
                Harness the innovation and scalability of Google Cloud with our expertise in GCP services and
                infrastructure.
              </p>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative w-full py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/50 to-background"></div>
        <div className="container px-4 md:px-6">
          <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-500">
                <Zap className="mr-1 h-3.5 w-3.5" />
                <span>Benefits</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Why Choose <span className="text-purple-500">Cloud Solutions</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Discover the transformative benefits of moving your business to the cloud.
              </p>
            </div>
          </RevealSection>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <RevealSection delay={50} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10">
                <RefreshCw className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold">Scalability</h3>
              <p className="text-muted-foreground">
                Easily scale your resources up or down based on demand, ensuring optimal performance during peak times.
              </p>
            </RevealSection>

            <RevealSection delay={100} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10">
                <Shield className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold">Security</h3>
              <p className="text-muted-foreground">
                Benefit from enterprise-grade security measures and compliance capabilities that protect your data.
              </p>
            </RevealSection>

            <RevealSection delay={150} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10">
                <BarChart3 className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold">Cost Efficiency</h3>
              <p className="text-muted-foreground">
                Reduce capital expenses and only pay for the resources you use with flexible pricing models.
              </p>
            </RevealSection>

            <RevealSection delay={200} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10">
                <Rocket className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold">Innovation</h3>
              <p className="text-muted-foreground">
                Access cutting-edge technologies and services that enable rapid innovation and digital transformation.
              </p>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="relative w-full py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl dark:from-purple-500/5 dark:to-pink-500/5" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-purple-500/10 to-pink-500/10 blur-3xl dark:from-purple-500/5 dark:to-pink-500/5" />
        </div>
        <div className="container px-4 md:px-6">
          <RevealSection className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-500">
                <Rocket className="mr-1 h-3.5 w-3.5" />
                <span>Case Studies</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Our <span className="text-purple-500">Success Stories</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Explore how we've helped businesses transform their operations with cloud solutions.
              </p>
            </div>
          </RevealSection>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <RevealSection delay={50} className="group relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/80 to-pink-500/80 opacity-0 transition-opacity group-hover:opacity-70"></div>
              <Image
                src="/images/cloud-case-1.png"
                width={400}
                height={300}
                alt="Cloud Migration Case Study"
                className="aspect-video h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="text-xl font-bold text-white translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  Enterprise Cloud Migration
                </h3>
                <p className="mb-4 text-sm text-white/90 translate-y-4 transition-transform duration-500 delay-75 group-hover:translate-y-0">
                  Migrated a financial services firm to AWS, reducing costs by 40%
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
                src="/images/cloud-case-2.png"
                width={400}
                height={300}
                alt="DevOps Case Study"
                className="aspect-video h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="text-xl font-bold text-white translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  DevOps Transformation
                </h3>
                <p className="mb-4 text-sm text-white/90 translate-y-4 transition-transform duration-500 delay-75 group-hover:translate-y-0">
                  Implemented CI/CD pipelines, reducing deployment time by 80%
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
                src="/images/cloud-case-3.png"
                width={400}
                height={300}
                alt="Cloud Security Case Study"
                className="aspect-video h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="text-xl font-bold text-white translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  Cloud Security Implementation
                </h3>
                <p className="mb-4 text-sm text-white/90 translate-y-4 transition-transform duration-500 delay-75 group-hover:translate-y-0">
                  Enhanced security posture for a healthcare provider, achieving HIPAA compliance
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
              <div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-500">
                <Mail className="mr-1 h-3.5 w-3.5" />
                <span>Get Started</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to <span className="text-purple-500">Transform</span> Your Business?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Contact us today to discuss your cloud needs and get a free consultation.
              </p>
            </div>
          </RevealSection>

          <div className="mx-auto max-w-3xl">
            <RevealSection className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 blur-xl"></div>
              <ContactForm sourcePage="cloud-solutions" />
            </RevealSection>
          </div>
        </div>
      </section>
    </main>
  )
}
