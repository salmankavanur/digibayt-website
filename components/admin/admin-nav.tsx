"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Mail,
  ImageIcon,
  Search,
  BarChart,
  Users,
  Settings,
  LogOut,
} from "lucide-react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "Portfolio",
    href: "/admin/portfolio",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    title: "Blog",
    href: "/admin/blog",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    title: "Contact",
    href: "/admin/contact",
    icon: <Mail className="h-4 w-4" />,
  },
  {
    title: "Media",
    href: "/admin/media",
    icon: <ImageIcon className="h-4 w-4" />,
  },
  {
    title: "SEO",
    href: "/admin/seo",
    icon: <Search className="h-4 w-4" />,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: <BarChart className="h-4 w-4" />,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Settings className="h-4 w-4" />,
  },
]

export function AdminNav() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const userRole = session?.user?.role || ""

  return (
    <nav className="space-y-2 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">Admin Panel</h2>
        <div className="space-y-1">
          {navItems.map((item) => {
            // Skip items that require specific roles
            if (item.role && item.role !== userRole) {
              return null
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                )}
              >
                {typeof item.icon === "string" ? item.icon : item.icon}
                {item.title}
              </Link>
            )
          })}
        </div>
      </div>
      <div className="px-3 py-2">
        <Button variant="ghost" className="w-full justify-start" onClick={() => signOut({ callbackUrl: "/" })}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </nav>
  )
}
