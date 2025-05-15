import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PortfolioCategoriesLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-5 w-full max-w-[500px]" />
      </div>

      <div className="flex justify-end">
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-5 w-[150px]" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-1">
                  <Skeleton className="h-5 w-[200px]" />
                  <Skeleton className="h-4 w-[300px]" />
                </div>
                <Skeleton className="h-10 w-[100px]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
