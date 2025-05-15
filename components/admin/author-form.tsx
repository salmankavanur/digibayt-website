"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import FileUpload from "@/components/admin/file-upload"
import type { Author } from "@/models/Author"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  slug: z
    .string()
    .min(2, {
      message: "Slug must be at least 2 characters.",
    })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must contain only lowercase letters, numbers, and hyphens.",
    }),
  bio: z.string().min(10, {
    message: "Bio must be at least 10 characters.",
  }),
  avatar: z.string().min(1, {
    message: "Avatar is required.",
  }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  instagram: z.string().optional(),
  role: z.string().min(1, {
    message: "Role is required.",
  }),
})

type FormValues = z.infer<typeof formSchema>

interface AuthorFormProps {
  initialData?: Author
  isEditing?: boolean
}

export function AuthorForm({ initialData, isEditing = false }: AuthorFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          email: initialData.email || "",
          website: initialData.website || "",
          twitter: initialData.twitter || "",
          linkedin: initialData.linkedin || "",
          github: initialData.github || "",
          instagram: initialData.instagram || "",
        }
      : {
          name: "",
          slug: "",
          bio: "",
          avatar: "",
          email: "",
          website: "",
          twitter: "",
          linkedin: "",
          github: "",
          instagram: "",
          role: "Contributor",
        },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true)

      const url = isEditing ? `/api/blog/authors/${initialData?._id}` : "/api/blog/authors"

      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || "Failed to save author")
      }

      // Show success toast notification
      toast({
        title: "Success",
        description: isEditing ? "Author updated successfully" : "Author created successfully",
        variant: "default",
      })

      // Redirect to the authors list page
      setTimeout(() => {
        router.push("/admin/blog/authors")
        router.refresh()
      }, 500) // Small delay to ensure toast is visible
    } catch (error) {
      console.error("Error saving author:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save author",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    form.setValue("name", name)

    if (!isEditing && !form.getValues("slug")) {
      const slug = name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")

      form.setValue("slug", slug, { shouldValidate: true })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Author name" {...field} onChange={handleNameChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="author-slug" {...field} />
                </FormControl>
                <FormDescription>Used in URLs: /authors/{field.value || "author-slug"}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Author biography" {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <FileUpload value={field.value} onUpload={(url) => field.onChange(url)} bucket="blog" path="authors" />
              </FormControl>
              <FormDescription>Author profile picture (recommended size: 400x400px)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Content Writer, Editor, SEO Specialist" {...field} />
              </FormControl>
              <FormDescription>Author's role or position</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="border rounded-md p-4">
          <h3 className="text-lg font-medium mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormDescription>Will not be displayed publicly</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h3 className="text-lg font-medium mb-4">Social Media</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <Input placeholder="@username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input placeholder="LinkedIn profile URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub</FormLabel>
                  <FormControl>
                    <Input placeholder="GitHub username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input placeholder="Instagram username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/blog/authors")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? "Update Author" : "Create Author"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
