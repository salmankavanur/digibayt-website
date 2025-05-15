import { Skeleton } from "@/components/ui/skeleton"

export default function BlogPostLoading() {
  return (
    <div className="container py-12">
      <div className="mb-8">
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <article className="space-y-6">
            <Skeleton className="h-[400px] w-full rounded-lg" />

            <div className="flex gap-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>

            <Skeleton className="h-12 w-full max-w-lg" />

            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <Skeleton className="h-8 w-48" />

            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </article>

          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32 mt-2" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
