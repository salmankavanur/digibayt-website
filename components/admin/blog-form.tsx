"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import FileUpload from "@/components/admin/file-upload"
import { TagInput } from "@/components/admin/tag-input"
import { MarkdownEditor } from "@/components/admin/markdown-editor"
import type { BlogPost } from "@/models/Blog"
import type { Author } from "@/models/Author"
import type { Category } from "@/models/Category"
import type { Tag } from "@/models/Tag"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { slugify } from "@/lib/utils"

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
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  excerpt: z.string().min(10, {
    message: "Excerpt must be at least 10 characters.",
  }),
  featuredImage: z.string().min(1, {
    message: "Featured image is required.",
  }),
  authorId: z.string().min(1, {
    message: "Author is required.",
  }),
  categories: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
  publishedAt: z.string().nullable(),
  status: z.enum(["draft", "published"]),
  readTime: z.number().int().min(1).default(5),
  seo: z.object({
    title: z.string().min(1, {
      message: "SEO title is required.",
    }),
    description: z.string().min(1, {
      message: "SEO description is required.",
    }),
    keywords: z.array(z.string()).optional().default([]),
    ogImage: z.string().min(1, {
      message: "Open Graph image is required.",
    }),
  }),
})

type FormValues = z.infer<typeof formSchema>

interface BlogFormProps {
  initialData?: BlogPost
  isEditing?: boolean
  authors: Author[]
  categories: Category[]
  tags: Tag[]
}

export function BlogForm({ initialData, isEditing = false, authors, categories, tags }: BlogFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [titleChanged, setTitleChanged] = useState(false)
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string>(initialData?.featuredImage || "")
  const [ogImagePreview, setOgImagePreview] = useState<string>(initialData?.seo?.ogImage || "")

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          authorId: initialData.authorId?.toString() || "",
          publishedAt: initialData.publishedAt ? new Date(initialData.publishedAt).toISOString().split("T")[0] : null,
          categories: initialData.categories || [],
          tags: initialData.tags || [],
          seo: initialData.seo || {
            title: initialData.title,
            description: initialData.excerpt,
            keywords: initialData.tags || [],
            ogImage: initialData.featuredImage,
          },
        }
      : {
          title: "",
          slug: "",
          content: "",
          excerpt: "",
          featuredImage: "",
          authorId: "",
          categories: [],
          tags: [],
          publishedAt: null,
          status: "draft",
          readTime: 5,
          seo: {
            title: "",
            description: "",
            keywords: [],
            ogImage: "",
          },
        },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true)
      setFormSuccess(false)
      setFormError(null)

      // If no categories are selected, add "uncategorized"
      if (!values.categories || values.categories.length === 0) {
        values.categories = ["uncategorized"]
      }

      // Ensure SEO fields are populated
      if (!values.seo.title) {
        values.seo.title = values.title
      }

      if (!values.seo.description) {
        values.seo.description = values.excerpt
      }

      if (!values.seo.ogImage) {
        values.seo.ogImage = values.featuredImage
      }

      if (!values.seo.keywords || values.seo.keywords.length === 0) {
        values.seo.keywords = values.tags
      }

      // Ensure publishedAt is set for published posts
      if (values.status === "published" && !values.publishedAt) {
        values.publishedAt = new Date().toISOString().split("T")[0]
      }

      console.log("Submitting blog form:", values)

      const url = isEditing ? `/api/blog/${initialData?._id}` : "/api/blog"
      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to save blog post")
      }

      console.log("Blog post saved successfully:", data)

      // Show success message
      setFormSuccess(true)

      // Show toast notification
      toast({
        title: "Success!",
        description: isEditing ? "Blog post updated successfully" : "Blog post created successfully",
      })

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/admin/blog")
      }, 1500)
    } catch (error) {
      console.error("Error saving blog post:", error)
      setFormError(error instanceof Error ? error.message : "Failed to save blog post")
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save blog post",
        variant: "destructive",
      })
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

  // Auto-populate SEO fields when main fields change
  useEffect(() => {
    const title = form.watch("title")
    const excerpt = form.watch("excerpt")
    const featuredImage = form.watch("featuredImage")
    const tags = form.watch("tags")

    // Auto-populate SEO title from main title
    form.setValue("seo.title", title, { shouldValidate: false })

    // Auto-populate SEO description from excerpt
    if (excerpt) {
      form.setValue("seo.description", excerpt, { shouldValidate: false })
    }

    // Auto-populate OG image from featured image
    if (featuredImage) {
      form.setValue("seo.ogImage", featuredImage, { shouldValidate: false })
      setOgImagePreview(featuredImage)
    }

    // Auto-populate SEO keywords from tags
    if (tags && tags.length > 0) {
      form.setValue("seo.keywords", tags, { shouldValidate: false })
    }
  }, [form.watch("title"), form.watch("excerpt"), form.watch("featuredImage"), form.watch("tags"), form])

  // Calculate read time based on content length
  useEffect(() => {
    const content = form.watch("content")
    if (content) {
      // Average reading speed: 200 words per minute
      const wordCount = content.trim().split(/\s+/).length
      const readTime = Math.max(1, Math.ceil(wordCount / 200))
      form.setValue("readTime", readTime, { shouldValidate: true })
    }
  }, [form.watch("content"), form])

  const handleSlugChange = () => {
    setTitleChanged(true)
  }

  const handleFeaturedImageUpload = (url: string) => {
    setFeaturedImagePreview(url)
    form.setValue("featuredImage", url)

    // Also update OG image if it's not set or is the same as the previous featured image
    const currentOgImage = form.getValues("seo.ogImage")
    const previousFeaturedImage = form.getValues("featuredImage")

    if (!currentOgImage || currentOgImage === previousFeaturedImage) {
      form.setValue("seo.ogImage", url)
      setOgImagePreview(url)
    }
  }

  const handleOgImageUpload = (url: string) => {
    setOgImagePreview(url)
    form.setValue("seo.ogImage", url)
  }

  return (
    <Form {...form}>
      {formSuccess && (
        <Alert className="mb-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900 sticky top-0 z-50 shadow-md">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          <AlertTitle className="text-green-800 dark:text-green-400 text-lg">Success!</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-500">
            {isEditing ? "Blog post updated successfully." : "Blog post created successfully."}
            <br />
            Redirecting to blog list...
          </AlertDescription>
        </Alert>
      )}

      {formError && (
        <Alert
          className="mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900 sticky top-0 z-50 shadow-md"
          variant="destructive"
        >
          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
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
                  <Input placeholder="Post title" {...field} />
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
                    placeholder="post-slug"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      handleSlugChange()
                    }}
                  />
                </FormControl>
                <FormDescription>Used in the URL: /blog/{field.value || "post-slug"}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief summary of the post (displayed in cards and search results)"
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <MarkdownEditor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Draft posts are only visible to administrators</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="publishedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publish Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value || null)}
                    disabled={form.watch("status") !== "published"}
                  />
                </FormControl>
                <FormDescription>Required for published posts</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="authorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an author" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {authors.map((author) => (
                    <SelectItem key={author._id?.toString()} value={author._id?.toString() || ""}>
                      {author.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                <Button
                  type="button"
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() => window.open("/admin/blog/authors/new", "_blank")}
                >
                  Add a new author
                </Button>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category._id?.toString()} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`category-${category._id}`}
                        checked={field.value?.includes(category.slug)}
                        onChange={(e) => {
                          const updatedCategories = e.target.checked
                            ? [...(field.value || []), category.slug]
                            : (field.value || []).filter((slug) => slug !== category.slug)
                          field.onChange(updatedCategories)
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor={`category-${category._id}`} className="text-sm">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
                <FormDescription>
                  <Button
                    type="button"
                    variant="link"
                    className="p-0 h-auto"
                    onClick={() => window.open("/admin/blog/categories/new", "_blank")}
                  >
                    Add a new category
                  </Button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <TagInput
                    placeholder="Add tags..."
                    tags={field.value || []}
                    setTags={(newTags) => field.onChange(newTags)}
                    maxTags={10}
                    suggestions={tags.map((tag) => tag.name)}
                  />
                </FormControl>
                <FormDescription>
                  <Button
                    type="button"
                    variant="link"
                    className="p-0 h-auto"
                    onClick={() => window.open("/admin/blog/tags/new", "_blank")}
                  >
                    Manage tags
                  </Button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="featuredImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured Image</FormLabel>
              <div className="space-y-4">
                {featuredImagePreview && (
                  <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-lg border">
                    <img
                      src={featuredImagePreview || "/placeholder.svg"}
                      alt="Featured image preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <FormControl>
                  <FileUpload value={field.value} onUpload={handleFeaturedImageUpload} bucket="blog" path="featured" />
                </FormControl>
                <FormDescription>Main image displayed in cards and at the top of the post</FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="border rounded-md p-4">
          <h3 className="text-lg font-medium mb-4">SEO Settings</h3>
          <p className="text-sm text-muted-foreground mb-4">
            These fields are automatically populated from your post content, but you can customize them if needed.
          </p>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="seo.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Title</FormLabel>
                  <FormControl>
                    <Input placeholder="SEO title (for search engines)" {...field} />
                  </FormControl>
                  <FormDescription>Defaults to post title</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="seo.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="SEO description (for search engines)" {...field} rows={2} />
                  </FormControl>
                  <FormDescription>Defaults to post excerpt</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="seo.keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Keywords</FormLabel>
                  <FormControl>
                    <TagInput
                      placeholder="Add SEO keywords..."
                      tags={field.value || []}
                      setTags={(newTags) => field.onChange(newTags)}
                      maxTags={15}
                    />
                  </FormControl>
                  <FormDescription>Defaults to post tags</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="seo.ogImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Open Graph Image</FormLabel>
                  <div className="space-y-4">
                    {ogImagePreview && (
                      <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-lg border">
                        <img
                          src={ogImagePreview || "/placeholder.svg"}
                          alt="Open Graph image preview"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <FormControl>
                      <FileUpload value={field.value} onUpload={handleOgImageUpload} bucket="blog" path="og-images" />
                    </FormControl>
                    <FormDescription>Defaults to featured image</FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/blog")} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>{isEditing ? "Update Post" : "Create Post"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
