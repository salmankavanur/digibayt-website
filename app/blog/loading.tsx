import { Skeleton } from "@/components/ui/skeleton"

export default function BlogLoading() {
  return (
    <div className="container py-12 space-y-8">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Skeleton className="h-12 w-64 mx-auto" />
        <Skeleton className="h-6 w-full max-w-xl mx-auto" />
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <Skeleton className="h-12 w-full mb-8" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-8 w-32" />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
