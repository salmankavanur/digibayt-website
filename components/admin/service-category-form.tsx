"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  slug: z
    .string()
    .min(2, {
      message: "Slug must be at least 2 characters.",
    })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens.",
    }),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  order: z.coerce.number().int().default(0),
})

type FormValues = z.infer<typeof formSchema>

interface ServiceCategoryFormProps {
  initialData?: {
    _id?: string
    name: string
    slug: string
    description?: string
    isActive: boolean
    order?: number
  }
  isEditing?: boolean
}

export function ServiceCategoryForm({ initialData, isEditing = false }: ServiceCategoryFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      isActive: initialData?.isActive ?? true,
      order: initialData?.order || 0,
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true)

      const url = isEditing ? `/api/service-categories/${initialData?._id}` : "/api/service-categories"
      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error(`Failed to ${isEditing ? "update" : "create"} service category`)
      }

      toast({
        title: "Success",
        description: `Service category ${isEditing ? "updated" : "created"} successfully`,
      })

      router.push("/admin/services")
      router.refresh()
    } catch (error) {
      console.error(`Error ${isEditing ? "updating" : "creating"} service category:`, error)
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "create"} service category`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateSlug = () => {
    const name = form.getValues("name")
    if (name) {
      const slug = name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
      form.setValue("slug", slug)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit" : "Add"} Service Category</CardTitle>
        <CardDescription>
          {isEditing
            ? "Update the details of an existing service category"
            : "Create a new service category for your contact forms"}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Web Development"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        if (!isEditing && !form.getValues("slug")) {
                          setTimeout(generateSlug, 300)
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>The display name of the service category</FormDescription>
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
                  <div className="flex gap-2">
                    <FormControl>
                      <Input placeholder="web-development" {...field} />
                    </FormControl>
                    <Button type="button" variant="outline" onClick={generateSlug}>
                      Generate
                    </Button>
                  </div>
                  <FormDescription>The URL-friendly version of the name</FormDescription>
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
                      placeholder="Custom web development services for businesses of all sizes"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>Optional description of the service category</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Order</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>Controls the display order (lower numbers first)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Active</FormLabel>
                      <FormDescription>Show this service category in forms</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? "Update" : "Create"} Service Category
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
