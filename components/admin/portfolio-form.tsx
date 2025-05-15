"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Plus, X, CheckCircle2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import FileUpload from "@/components/admin/file-upload"
import { TagInput } from "@/components/admin/tag-input"
import type { PortfolioItem } from "@/models/Portfolio"
import Image from "next/image"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { slugify } from "@/lib/utils"
import { SimpleToast } from "@/components/admin/simple-toast"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  slug: z
    .string()
    .min(2, {
      message: "Slug must be at least 2 characters.",
    })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must contain only lowercase letters, numbers, and hyphens.",
    }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  shortDescription: z.string().min(10, {
    message: "Short description must be at least 10 characters.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  tags: z.array(z.string()).min(1, {
    message: "Please add at least one tag.",
  }),
  featuredImage: z.string().min(1, {
    message: "Featured image is required.",
  }),
  gallery: z.array(z.string()).default([]),
  client: z.string().min(1, {
    message: "Client name is required.",
  }),
  completionDate: z.string().min(1, {
    message: "Completion date is required.",
  }),
  technologies: z.array(z.string()).min(1, {
    message: "Please add at least one technology.",
  }),
  challenge: z.string().min(10, {
    message: "Challenge description must be at least 10 characters.",
  }),
  solution: z.string().min(10, {
    message: "Solution description must be at least 10 characters.",
  }),
  results: z.string().min(10, {
    message: "Results description must be at least 10 characters.",
  }),
  testimonial: z
    .object({
      quote: z.string().optional(),
      author: z.string().optional(),
      position: z.string().optional(),
      company: z.string().optional(),
    })
    .optional(),
  featured: z.boolean().default(false),
  order: z.number().int().min(0).default(0),
})

type FormValues = z.infer<typeof formSchema>

interface PortfolioFormProps {
  initialData?: PortfolioItem
  isEditing?: boolean
}

export function PortfolioForm({ initialData, isEditing = false }: PortfolioFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [galleryImages, setGalleryImages] = useState<string[]>(initialData?.gallery || [])
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string>(initialData?.featuredImage || "")
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success")
  const [titleChanged, setTitleChanged] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          completionDate: initialData.completionDate
            ? new Date(initialData.completionDate).toISOString().split("T")[0]
            : "",
          testimonial: initialData.testimonial || {
            quote: "",
            author: "",
            position: "",
            company: "",
          },
          gallery: initialData.gallery || [],
          tags: initialData.tags || [],
          technologies: initialData.technologies || [],
          featured: initialData.featured || false,
          order: initialData.order || 0,
        }
      : {
          title: "",
          slug: "",
          description: "",
          shortDescription: "",
          category: "",
          tags: [],
          featuredImage: "",
          gallery: [],
          client: "",
          completionDate: "",
          technologies: [],
          challenge: "",
          solution: "",
          results: "",
          testimonial: {
            quote: "",
            author: "",
            position: "",
            company: "",
          },
          featured: false,
          order: 0,
        },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true)
      setFormSuccess(false)
      setFormError(null)

      // Ensure gallery images are included in the form values
      values.gallery = galleryImages

      const url = isEditing ? `/api/portfolio/${initialData?._id}` : "/api/portfolio"

      const method = isEditing ? "PUT" : "POST"

      console.log("Submitting portfolio form:", values)

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to save portfolio item")
      }

      console.log("Portfolio saved successfully:", data)

      // Show success message
      setFormSuccess(true)

      // Show toast notification
      setToastMessage(isEditing ? "Portfolio item updated successfully!" : "Portfolio item created successfully!")
      setToastType("success")
      setShowToast(true)

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/admin/portfolio")
      }, 1500)
    } catch (error) {
      console.error("Error saving portfolio item:", error)
      setFormError(error instanceof Error ? error.message : "Failed to save portfolio item")
      setToastMessage("Failed to save portfolio item")
      setToastType("error")
      setShowToast(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Auto-generate slug from title
  useEffect(() => {
    const title = form.watch("title")
    if (title) {
      // Only auto-generate slug if the user hasn't manually edited it
      // or if we're creating a new item (not editing)
      if (!isEditing || !titleChanged) {
        const generatedSlug = slugify(title)
        form.setValue("slug", generatedSlug, { shouldValidate: true })
      }
    }
  }, [form.watch("title"), form, isEditing, titleChanged])

  const handleAddGalleryImage = (url: string) => {
    setGalleryImages((prev) => [...prev, url])
    form.setValue("gallery", [...galleryImages, url])
  }

  const handleRemoveGalleryImage = (index: number) => {
    const newGalleryImages = galleryImages.filter((_, i) => i !== index)
    setGalleryImages(newGalleryImages)
    form.setValue("gallery", newGalleryImages)
  }

  const handleFeaturedImageUpload = (url: string) => {
    setFeaturedImagePreview(url)
    form.setValue("featuredImage", url)
  }

  const handleSlugChange = () => {
    setTitleChanged(true)
  }

  const categories = [
    "Web Development",
    "Mobile App Development",
    "Cloud Solutions",
    "Digital Marketing",
    "Library Automation",
    "Web Design",
  ]

  return (
    <>
      {showToast && (
        <SimpleToast message={toastMessage} type={toastType} duration={5000} onClose={() => setShowToast(false)} />
      )}

      <Form {...form}>
        {formSuccess && (
          <Alert className="mb-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900 sticky top-0 z-50 shadow-md">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            <AlertTitle className="text-green-800 dark:text-green-400 text-lg">Success!</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-500">
              {isEditing ? "Portfolio item updated successfully." : "Portfolio item created successfully."}
              <br />
              Redirecting to portfolio list...
            </AlertDescription>
          </Alert>
        )}

        {formError && (
          <Alert
            className="mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900 sticky top-0 z-50 shadow-md"
            variant="destructive"
          >
            <AlertTitle className="text-red-800 dark:text-red-400 text-lg">Error</AlertTitle>
            <AlertDescription className="text-red-700 dark:text-red-500">{formError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Project title" {...field} />
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
                      placeholder="project-slug"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        handleSlugChange()
                      }}
                    />
                  </FormControl>
                  <FormDescription>Used in the URL: /portfolio/{field.value || "project-slug"}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Brief description of the project (displayed in cards)" {...field} rows={2} />
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
                <FormLabel>Full Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Detailed description of the project" {...field} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="client"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client</FormLabel>
                  <FormControl>
                    <Input placeholder="Client name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="completionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Completion Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      {...field}
                      onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Lower numbers appear first</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <TagInput
                    placeholder="Add tags..."
                    tags={field.value}
                    setTags={(newTags) => field.onChange(newTags)}
                  />
                </FormControl>
                <FormDescription>Press Enter to add a tag</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="technologies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technologies</FormLabel>
                <FormControl>
                  <TagInput
                    placeholder="Add technologies..."
                    tags={field.value}
                    setTags={(newTags) => field.onChange(newTags)}
                  />
                </FormControl>
                <FormDescription>Press Enter to add a technology</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="featuredImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Featured Image</FormLabel>
                <div className="space-y-4">
                  {featuredImagePreview && (
                    <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-lg border">
                      <Image
                        src={featuredImagePreview || "/placeholder.svg"}
                        alt="Featured image preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <FormControl>
                    <FileUpload
                      value={field.value}
                      onUpload={handleFeaturedImageUpload}
                      bucket="portfolio"
                      path="featured"
                    />
                  </FormControl>
                  <FormDescription>Main image displayed in cards and at the top of the project page</FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Gallery Images Section */}
          <div>
            <FormLabel>Gallery Images (Optional)</FormLabel>
            <FormDescription className="mb-2">
              Add additional images to showcase different aspects of your project
            </FormDescription>

            {/* Gallery Preview */}
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                {galleryImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-[3/2] relative rounded-md overflow-hidden border">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveGalleryImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Gallery Image */}
            <div className="mt-2">
              <FileUpload
                value=""
                onUpload={handleAddGalleryImage}
                bucket="portfolio"
                path="gallery"
                buttonText={
                  <div className="flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    <span>Add Gallery Image</span>
                  </div>
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="challenge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenge</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the challenge or problem that needed to be solved"
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="solution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Solution</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the solution you implemented" {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="results"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Results</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the outcomes and results achieved" {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-4">Testimonial (Optional)</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="testimonial.quote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quote</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Client testimonial quote" {...field} rows={2} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="testimonial.author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input placeholder="Author name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="testimonial.position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input placeholder="Author position" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="testimonial.company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Featured Project</FormLabel>
                  <FormDescription>Featured projects will be displayed on the homepage</FormDescription>
                </div>
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/portfolio")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>{isEditing ? "Update Project" : "Create Project"}</>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
