"use client"

export function TopPages() {
  const topPages = [
    {
      page: "/",
      views: 4325,
      uniqueVisitors: 3210,
      bounceRate: "32%",
      avgTime: "2m 15s",
    },
    {
      page: "/services/web-development",
      views: 2145,
      uniqueVisitors: 1876,
      bounceRate: "28%",
      avgTime: "3m 42s",
    },
    {
      page: "/blog/web-development-trends",
      views: 1832,
      uniqueVisitors: 1654,
      bounceRate: "25%",
      avgTime: "4m 10s",
    },
    {
      page: "/services/mobile-app-development",
      views: 1654,
      uniqueVisitors: 1432,
      bounceRate: "30%",
      avgTime: "2m 55s",
    },
    {
      page: "/contact",
      views: 1245,
      uniqueVisitors: 1198,
      bounceRate: "45%",
      avgTime: "1m 50s",
    },
    {
      page: "/portfolio",
      views: 1120,
      uniqueVisitors: 987,
      bounceRate: "35%",
      avgTime: "2m 30s",
    },
    {
      page: "/blog",
      views: 980,
      uniqueVisitors: 876,
      bounceRate: "38%",
      avgTime: "2m 05s",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 text-xs font-medium text-muted-foreground">
        <div>Page</div>
        <div className="text-right">Views</div>
        <div className="text-right">Visitors</div>
        <div className="text-right">Bounce Rate</div>
        <div className="text-right">Avg. Time</div>
      </div>
      {topPages.map((page, i) => (
        <div key={i} className="grid grid-cols-5 text-sm">
          <div className="truncate">{page.page}</div>
          <div className="text-right">{page.views.toLocaleString()}</div>
          <div className="text-right">{page.uniqueVisitors.toLocaleString()}</div>
          <div className="text-right">{page.bounceRate}</div>
          <div className="text-right">{page.avgTime}</div>
        </div>
      ))}
    </div>
  )
}
