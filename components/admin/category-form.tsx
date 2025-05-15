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
import type { Category } from "@/models/Category"

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
  description: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface CategoryFormProps {
  initialData?: Category
  isEditing?: boolean
}

export function CategoryForm({ initialData, isEditing = false }: CategoryFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      slug: "",
      description: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true)

      const url = isEditing ? `/api/blog/categories/${initialData?._id}` : "/api/blog/categories"
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
        throw new Error(errorData.message || "Failed to save category")
      }

      // Show success toast notification
      toast({
        title: "Success",
        description: isEditing ? "Category updated successfully" : "Category created successfully",
        variant: "default",
      })

      // Redirect to the categories list page
      setTimeout(() => {
        router.push("/admin/blog/categories")
        router.refresh()
      }, 500) // Small delay to ensure toast is visible
    } catch (error) {
      console.error("Error saving category:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save category",
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

    if (!isEditing || !initialData?.slug) {
      const slug = name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")

      form.setValue("slug", slug, { shouldValidate: true })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Category name"
                  {...field}
                  onChange={handleNameChange}
                  disabled={isEditing && initialData?.slug === "uncategorized"}
                />
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
                <Input
                  placeholder="category-slug"
                  {...field}
                  disabled={isEditing && initialData?.slug === "uncategorized"}
                />
              </FormControl>
              <FormDescription>Used in the URL: /blog/category/{field.value || "category-slug"}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief description of the category (optional)"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/blog/categories")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? "Update Category" : "Create Category"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
