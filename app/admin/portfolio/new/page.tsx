import { PortfolioForm } from "@/components/admin/portfolio-form"

export default function NewPortfolioPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New Portfolio Item</h1>
      <PortfolioForm />
    </div>
  )
}
