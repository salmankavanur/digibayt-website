import { PortfolioCategoryForm } from "@/components/admin/portfolio-category-form"

interface EditPortfolioCategoryPageProps {
  params: {
    id: string
  }
}

export const metadata = {
  title: "Edit Portfolio Category | DigiBayt Admin",
  description: "Edit an existing portfolio category",
}

export default function EditPortfolioCategoryPage({ params }: EditPortfolioCategoryPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Edit Portfolio Category</h1>
        <p className="text-muted-foreground">Update an existing portfolio category.</p>
      </div>

      <PortfolioCategoryForm categoryId={params.id} />
    </div>
  )
}
