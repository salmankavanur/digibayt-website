"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Simulate API call
    setTimeout(() => {
      if (email.includes("@") && email.includes(".")) {
        setIsSuccess(true)
        setEmail("")
      } else {
        setError("Please enter a valid email address")
      }
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Subscribe to our newsletter
        </CardTitle>
        <CardDescription>Get the latest articles, tutorials, and updates delivered to your inbox.</CardDescription>
      </CardHeader>
      <CardContent>
        {isSuccess ? (
          <div className="text-center py-4">
            <h4 className="font-medium text-lg">Thank you for subscribing!</h4>
            <p className="text-muted-foreground mt-1">You'll receive our next newsletter in your inbox.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background"
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
