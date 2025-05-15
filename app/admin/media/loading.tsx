import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function MediaLoading() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <Skeleton className="h-10 w-64" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />

            <div className="space-y-2">
              {Array(4)
                .fill(null)
                .map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
            </div>

            <div className="space-y-2">
              <Skeleton className="h-6 w-32 mb-2" />
              {Array(4)
                .fill(null)
                .map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
            </div>

            <div className="space-y-2">
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-5 w-20" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array(8)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i} className="overflow-hidden rounded-md border">
                      <Skeleton className="aspect-square w-full" />
                      <div className="p-2 space-y-1">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
