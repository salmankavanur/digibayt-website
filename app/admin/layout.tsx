import type React from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { ToastProvider } from "@/components/admin/toast-provider"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <AdminHeader />
      <div className="flex-1 flex">
        <aside className="hidden md:block w-64 border-r border-border">
          <div className="sticky top-16 p-4 h-[calc(100vh-4rem)] overflow-y-auto">
            <AdminSidebar />
          </div>
        </aside>
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>
      </div>
      <ToastProvider />
    </div>
  )
}
