import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactForm } from "@/components/contact-form"
import { RevealSection } from "@/components/reveal-section"

export const metadata = {
  title: "Contact Us | DigiBayt",
  description: "Get in touch with our team for web development, mobile app, and digital marketing services.",
}

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <RevealSection className="space-y-4">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  <span className="mr-1 h-3.5 w-3.5">✉️</span>
                  <span>Get in Touch</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Let's Discuss Your <span className="text-primary">Project</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  We're here to help you bring your digital vision to life. Fill out the form and our team will get back
                  to you within 24 hours.
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3 text-primary">
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
                        className="h-5 w-5"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3 text-primary">
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
                        className="h-5 w-5"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">info@digibayt.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3 text-primary">
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
                        className="h-5 w-5"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Location</h3>
                      <p className="text-muted-foreground">123 Tech Street, San Francisco, CA 94107</p>
                    </div>
                  </div>
                </div>
              </RevealSection>
              <RevealSection delay={100}>
                <ContactForm />
              </RevealSection>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
