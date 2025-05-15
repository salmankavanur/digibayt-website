import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function SEOLoading() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="mb-6">
        <Skeleton className="h-10 w-full max-w-md" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-64 mb-2" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent className="space-y-6">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  )
}
