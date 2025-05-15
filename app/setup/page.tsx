"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function SetupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingSetup, setIsCheckingSetup] = useState(true)
  const [setupNeeded, setSetupNeeded] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    // If user is already logged in and is an admin, redirect to admin
    if (
      status === "authenticated" &&
      session?.user?.role &&
      ["admin", "superadmin"].includes(session.user.role as string)
    ) {
      router.push("/admin")
      return
    }

    const checkSetup = async () => {
      try {
        const response = await fetch("/api/setup/check")
        const data = await response.json()

        if (!data.setupNeeded) {
          // If setup is not needed, redirect to login
          router.push("/login")
        } else {
          setSetupNeeded(true)
        }
      } catch (error) {
        setError("Failed to check setup status")
      } finally {
        setIsCheckingSetup(false)
      }
    }

    if (status !== "loading") {
      checkSetup()
    }
  }, [router, session, status])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Check if the error is because setup is already completed
        if (data.message === "Setup has already been completed") {
          setSuccess("Setup was already completed. Redirecting to login...")
          setTimeout(() => {
            router.push("/login")
          }, 2000)
          return
        }

        throw new Error(data.message || "Failed to create superadmin")
      }

      setSuccess("Superadmin created successfully! Redirecting to login...")

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (error: any) {
      setError(error.message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isCheckingSetup || status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Checking setup status...</p>
      </div>
    )
  }

  if (!setupNeeded) {
    return null // Will redirect to login
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Initial Setup</CardTitle>
          <CardDescription>Create your superadmin account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Superadmin Account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">This setup page is only available when no admin users exist</p>
        </CardFooter>
      </Card>
    </div>
  )
}
