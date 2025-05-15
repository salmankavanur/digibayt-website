import { PortfolioCategoryForm } from "@/components/admin/portfolio-category-form"

export const metadata = {
  title: "Add Portfolio Category | DigiBayt Admin",
  description: "Add a new portfolio category",
}

export default function NewPortfolioCategoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Add Portfolio Category</h1>
        <p className="text-muted-foreground">Create a new category for your portfolio projects.</p>
      </div>

      <PortfolioCategoryForm />
    </div>
  )
}
