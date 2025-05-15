import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ServiceCategoryForm } from "@/components/admin/service-category-form"

export default function NewServiceCategoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/services">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Add Service Category</h1>
      </div>

      <ServiceCategoryForm />
    </div>
  )
}
