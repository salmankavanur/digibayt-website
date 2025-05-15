"use client"

import { useState, useEffect, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(7, {
    message: "Please enter a valid phone number.",
  }),
  preferredContact: z.enum(["email", "phone", "whatsapp"]).optional(),
  service: z.string().optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  source: z.string().default("website"),
})

type FormValues = z.infer<typeof formSchema>

interface ServiceCategory {
  _id: string
  name: string
  slug: string
}

interface ContactFormProps {
  preselectedService?: string
  sourcePage?: string
  className?: string
}

export function ContactForm({ preselectedService, sourcePage = "website", className }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([])
  const [isLoadingServices, setIsLoadingServices] = useState(false)
  const successAlertRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchServiceCategories = async () => {
      try {
        setIsLoadingServices(true)
        const response = await fetch("/api/service-categories?activeOnly=true", {
          cache: "no-store",
        })

        if (response.ok) {
          const data = await response.json()
          setServiceCategories(data)
        }
      } catch (error) {
        console.error("Error fetching service categories:", error)
      } finally {
        setIsLoadingServices(false)
      }
    }

    fetchServiceCategories()
  }, [])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: preselectedService || "",
      message: "",
      source: sourcePage,
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true)

      // Find the service name if a service ID is provided
      let serviceName = ""
      if (values.service) {
        const selectedService = serviceCategories.find((cat) => cat._id === values.service)
        if (selectedService) {
          serviceName = selectedService.name
        }
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          serviceName,
        }),
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error("Failed to submit contact form")
      }

      setIsSuccess(true)
      form.reset()

      // Scroll to top of form
      if (successAlertRef.current) {
        successAlertRef.current.scrollIntoView({ behavior: "smooth" })
      } else {
        const formElement = document.getElementById("contact-form")
        if (formElement) {
          formElement.scrollIntoView({ behavior: "smooth" })
        }
      }

      toast({
        title: "Success",
        description: "Your message has been sent successfully. We will get back to you soon!",
      })
    } catch (error) {
      console.error("Error submitting contact form:", error)
      toast({
        title: "Error",
        description: "Failed to submit contact form. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card
      id="contact-form"
      className={`relative border border-primary/20 bg-background/80 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 ${className}`}
    >
      <CardHeader>
        <CardTitle>Send Us a Message</CardTitle>
        <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
      </CardHeader>
      {isSuccess ? (
        <CardContent className="space-y-4">
          <Alert
            ref={successAlertRef}
            className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900"
          >
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            <AlertTitle className="text-green-800 dark:text-green-400 text-lg">Message Sent Successfully!</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-500">
              Thank you for your message. We have received your inquiry and will get back to you as soon as possible.
            </AlertDescription>
          </Alert>
          <Button onClick={() => setIsSuccess(false)} className="w-full">
            Send Another Message
          </Button>
        </CardContent>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John"
                          {...field}
                          className="border-primary/20 focus:border-primary focus:ring-primary/20 transition-all"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Doe"
                          {...field}
                          className="border-primary/20 focus:border-primary focus:ring-primary/20 transition-all"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john.doe@example.com"
                        type="email"
                        {...field}
                        className="border-primary/20 focus:border-primary focus:ring-primary/20 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone/WhatsApp Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+91 9074433100"
                        type="tel"
                        {...field}
                        className="border-primary/20 focus:border-primary focus:ring-primary/20 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="preferredContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Contact Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-primary/20 focus:border-primary focus:ring-primary/20 transition-all">
                            <SelectValue placeholder="Select preferred contact method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Interested In</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-primary/20 focus:border-primary focus:ring-primary/20 transition-all">
                            <SelectValue placeholder={isLoadingServices ? "Loading services..." : "Select a service"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {serviceCategories.map((category) => (
                            <SelectItem key={category._id.toString()} value={category._id.toString()}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your project..."
                        {...field}
                        className="min-h-[120px] border-primary/20 focus:border-primary focus:ring-primary/20 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      )}
    </Card>
  )
}
