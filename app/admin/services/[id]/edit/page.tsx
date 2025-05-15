import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ServiceCategoryForm } from "@/components/admin/service-category-form"
import { getServiceCategoryById } from "@/models/ServiceCategory"

interface EditServiceCategoryPageProps {
  params: {
    id: string
  }
}

export default async function EditServiceCategoryPage({ params }: EditServiceCategoryPageProps) {
  const category = await getServiceCategoryById(params.id)

  if (!category) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/services">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Edit Service Category</h1>
      </div>

      <ServiceCategoryForm initialData={category} isEditing />
    </div>
  )
}
