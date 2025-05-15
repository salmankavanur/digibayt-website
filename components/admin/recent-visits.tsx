"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function RecentVisits() {
  const recentVisits = [
    {
      id: "1",
      name: "Anonymous User",
      email: "IP: 192.168.1.1",
      time: "2 minutes ago",
      page: "/services/web-development",
    },
    {
      id: "2",
      name: "Anonymous User",
      email: "IP: 203.0.113.5",
      time: "5 minutes ago",
      page: "/",
    },
    {
      id: "3",
      name: "Anonymous User",
      email: "IP: 198.51.100.42",
      time: "12 minutes ago",
      page: "/blog/web-development-trends",
    },
    {
      id: "4",
      name: "Anonymous User",
      email: "IP: 172.16.254.1",
      time: "15 minutes ago",
      page: "/contact",
    },
    {
      id: "5",
      name: "Anonymous User",
      email: "IP: 10.0.0.1",
      time: "20 minutes ago",
      page: "/services/mobile-app-development",
    },
    {
      id: "6",
      name: "Anonymous User",
      email: "IP: 192.0.2.146",
      time: "25 minutes ago",
      page: "/portfolio",
    },
    {
      id: "7",
      name: "Anonymous User",
      email: "IP: 203.0.113.42",
      time: "30 minutes ago",
      page: "/blog",
    },
  ]

  return (
    <div className="space-y-4">
      {recentVisits.map((visit) => (
        <div key={visit.id} className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10">{visit.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{visit.name}</p>
            <p className="text-xs text-muted-foreground">{visit.email}</p>
          </div>
          <div className="text-right text-xs">
            <p className="text-muted-foreground">{visit.time}</p>
            <p className="font-medium truncate max-w-[140px]">{visit.page}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
