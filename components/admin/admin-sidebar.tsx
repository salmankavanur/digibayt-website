"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ImageIcon,
  FileText,
  MessageSquare,
  Users,
  Settings,
  BarChart,
  Search,
  Tag,
  Upload,
  Layers,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Portfolio",
    href: "/admin/portfolio",
    icon: ImageIcon,
    children: [
      {
        title: "All Projects",
        href: "/admin/portfolio",
      },
      {
        title: "Add New",
        href: "/admin/portfolio/new",
      },
      {
        title: "Categories",
        href: "/admin/portfolio/categories",
      },
    ],
  },
  {
    title: "Blog",
    href: "/admin/blog",
    icon: FileText,
    children: [
      {
        title: "All Posts",
        href: "/admin/blog",
      },
      {
        title: "Add New",
        href: "/admin/blog/new",
      },
      {
        title: "Categories",
        href: "/admin/blog/categories",
      },
    ],
  },
  {
    title: "Contact",
    href: "/admin/contact",
    icon: MessageSquare,
  },
  {
    title: "Media",
    href: "/admin/media",
    icon: Upload,
  },
  {
    title: "Services",
    href: "/admin/services",
    icon: Layers,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
    role: "superadmin",
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart,
  },
  {
    title: "SEO",
    href: "/admin/seo",
    icon: Search,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const userRole = session?.user?.role || ""

  return (
    <ScrollArea className="h-full">
      <div className="space-y-1">
        {adminNavItems.map((item) => {
          // Skip items that require specific roles
          if (item.role && item.role !== userRole) {
            return null
          }

          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <div key={item.href} className="space-y-1">
              <Button
                asChild
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive ? "bg-primary/10 hover:bg-primary/20" : "hover:bg-primary/5",
                )}
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
              {item.children && isActive && (
                <div className="ml-4 space-y-1">
                  {item.children.map((child) => {
                    const isChildActive = pathname === child.href
                    return (
                      <Button
                        key={child.href}
                        asChild
                        variant={isChildActive ? "secondary" : "ghost"}
                        size="sm"
                        className={cn(
                          "w-full justify-start",
                          isChildActive ? "bg-primary/10 hover:bg-primary/20" : "hover:bg-primary/5",
                        )}
                      >
                        <Link href={child.href}>
                          <Tag className="mr-2 h-3 w-3" />
                          {child.title}
                        </Link>
                      </Button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}
