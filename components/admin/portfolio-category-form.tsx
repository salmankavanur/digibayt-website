"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(60, "Name cannot exceed 60 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(60, "Slug cannot exceed 60 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  description: z.string().max(500, "Description cannot exceed 500 characters").optional(),
})

type FormValues = z.infer<typeof formSchema>

interface PortfolioCategoryFormProps {
  categoryId?: string
}

export function PortfolioCategoryForm({ categoryId }: PortfolioCategoryFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(!!categoryId)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  })

  useEffect(() => {
    if (categoryId) {
      fetchCategory()
    }
  }, [categoryId])

  const fetchCategory = async () => {
    try {
      setIsFetching(true)
      const response = await fetch(`/api/portfolio/categories/${categoryId}`)

      if (!response.ok) {
        throw new Error("Failed to fetch category")
      }

      const data = await response.json()
      form.reset({
        name: data.name,
        slug: data.slug,
        description: data.description || "",
      })
    } catch (error) {
      console.error("Error fetching category:", error)
      toast({
        title: "Error",
        description: "Failed to load category data",
        variant: "destructive",
      })
    } finally {
      setIsFetching(false)
    }
  }

  const onSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true)

      const url = categoryId ? `/api/portfolio/categories/${categoryId}` : "/api/portfolio/categories"
      const method = categoryId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to save category")
      }

      toast({
        title: "Success",
        description: categoryId ? "Category updated successfully" : "Category created successfully",
      })

      router.push("/admin/portfolio/categories")
      router.refresh()
    } catch (error: any) {
      console.error("Error saving category:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to save category",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const generateSlug = () => {
    const name = form.getValues("name")
    if (name) {
      const slug = name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
      form.setValue("slug", slug, { shouldValidate: true })
    }
  }

  if (isFetching) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
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
                      onChange={(e) => {
                        field.onChange(e)
                        if (!categoryId && !form.getValues("slug")) {
                          setTimeout(generateSlug, 500)
                        }
                      }}
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
                  <div className="flex justify-between items-center">
                    <FormLabel>Slug</FormLabel>
                    <Button type="button" variant="outline" size="sm" onClick={generateSlug}>
                      Generate from name
                    </Button>
                  </div>
                  <FormControl>
                    <Input placeholder="category-slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief description of this category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/portfolio/categories")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {categoryId ? "Update Category" : "Create Category"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
