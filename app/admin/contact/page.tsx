"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, Trash2, Loader2, Clock, CheckCircle, AlertCircle, ArrowUpDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import type { ContactSubmission } from "@/models/Contact"

export default function ContactPage() {
  const router = useRouter()
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [submissionToDelete, setSubmissionToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [serviceFilter, setServiceFilter] = useState<string>("all")
  const [serviceCategories, setServiceCategories] = useState<any[]>([])
  const [sortField, setSortField] = useState<string>("createdAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    fetchContactSubmissions()
    fetchServiceCategories()
  }, [])

  const fetchContactSubmissions = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/contact")

      if (!response.ok) {
        throw new Error("Failed to fetch contact submissions")
      }

      const data = await response.json()
      setContactSubmissions(data)
    } catch (error) {
      console.error("Error fetching contact submissions:", error)
      toast({
        title: "Error",
        description: "Failed to load contact submissions",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchServiceCategories = async () => {
    try {
      const response = await fetch("/api/service-categories")

      if (response.ok) {
        const data = await response.json()
        setServiceCategories(data)
      }
    } catch (error) {
      console.error("Error fetching service categories:", error)
    }
  }

  const handleDelete = async () => {
    if (!submissionToDelete) return

    try {
      setIsDeleting(true)
      const response = await fetch(`/api/contact/${submissionToDelete}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete contact submission")
      }

      setContactSubmissions(contactSubmissions.filter((submission) => submission._id !== submissionToDelete))
      toast({
        title: "Success",
        description: "Contact submission deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting contact submission:", error)
      toast({
        title: "Error",
        description: "Failed to delete contact submission",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setSubmissionToDelete(null)
    }
  }

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge variant="secondary" className="bg-blue-500 hover:bg-blue-600 text-white">
            <AlertCircle className="mr-1 h-3 w-3" />
            New
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="secondary" className="bg-amber-500 hover:bg-amber-600 text-white">
            <Clock className="mr-1 h-3 w-3" />
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-500 hover:bg-green-600 text-white">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredSubmissions = contactSubmissions.filter(
    (submission) =>
      (statusFilter === "all" || submission.status === statusFilter) &&
      (serviceFilter === "all" || submission.service === serviceFilter) &&
      (submission.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.message.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    if (sortField === "name") {
      const nameA = `${a.firstName} ${a.lastName}`
      const nameB = `${b.firstName} ${b.lastName}`
      return sortDirection === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA)
    } else if (sortField === "email") {
      return sortDirection === "asc" ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email)
    } else if (sortField === "createdAt") {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA
    }
    return 0
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Contact Management</h1>
        <p className="text-muted-foreground">Manage contact form submissions from your website.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search contacts..."
              className="w-full sm:w-[300px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Contacts</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              {serviceCategories.map((category) => (
                <SelectItem key={category._id.toString()} value={category._id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : contactSubmissions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No contact submissions found.</p>
            </div>
          ) : (
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-medium flex items-center gap-1 -ml-3"
                        onClick={() => handleSort("name")}
                      >
                        Name
                        <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-medium flex items-center gap-1 -ml-3"
                        onClick={() => handleSort("email")}
                      >
                        Email
                        <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-medium flex items-center gap-1 -ml-3"
                        onClick={() => handleSort("createdAt")}
                      >
                        Date
                        <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedSubmissions.map((submission) => (
                    <TableRow key={submission._id?.toString()}>
                      <TableCell className="font-medium">
                        {submission.firstName} {submission.lastName}
                      </TableCell>
                      <TableCell>{submission.email}</TableCell>
                      <TableCell>
                        {submission.serviceName ||
                          (submission.service && serviceCategories.find((c) => c._id === submission.service)?.name) ||
                          "Not specified"}
                      </TableCell>
                      <TableCell>{formatDate(submission.createdAt)}</TableCell>
                      <TableCell>{getStatusBadge(submission.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <span className="sr-only">Open menu</span>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/contact/${submission._id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => {
                                    e.preventDefault()
                                    setSubmissionToDelete(submission._id?.toString() || null)
                                  }}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the contact submission
                                    and remove it from our servers.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel onClick={() => setSubmissionToDelete(null)}>
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={handleDelete}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    disabled={isDeleting}
                                  >
                                    {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
