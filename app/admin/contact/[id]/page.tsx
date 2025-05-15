import { notFound } from "next/navigation"
import Link from "next/link"
import { ObjectId } from "mongodb"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ContactStatusForm } from "@/components/admin/contact-status-form"
import clientPromise from "@/lib/mongodb"

interface ContactDetailPageProps {
  params: {
    id: string
  }
}

async function getContactSubmission(id: string) {
  try {
    const client = await clientPromise
    const db = client.db("digibayt")

    const submission = await db.collection("contact").findOne({ _id: new ObjectId(id) })

    if (!submission) {
      return null
    }

    return submission
  } catch (error) {
    console.error("Error fetching contact submission:", error)
    return null
  }
}

export default async function ContactDetailPage({ params }: ContactDetailPageProps) {
  const submission = await getContactSubmission(params.id)

  if (!submission) {
    notFound()
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
        return <Badge className="bg-blue-500 hover:bg-blue-600 text-white">New</Badge>
      case "in-progress":
        return <Badge className="bg-amber-500 hover:bg-amber-600 text-white">In Progress</Badge>
      case "completed":
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">Completed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/contact">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Contact Submission</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Message</CardTitle>
              <CardDescription>Submitted on {formatDate(submission.createdAt)}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap">{submission.message}</div>
            </CardContent>
          </Card>

          {submission.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap">{submission.notes}</div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Name</div>
                <div>
                  {submission.firstName} {submission.lastName}
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <div>
                  <a href={`mailto:${submission.email}`} className="text-primary hover:underline">
                    {submission.email}
                  </a>
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">Phone</div>
                <div>
                  <a href={`tel:${submission.phone}`} className="text-primary hover:underline">
                    {submission.phone}
                  </a>
                </div>
              </div>

              {submission.preferredContact && (
                <div>
                  <div className="text-sm text-muted-foreground">Preferred Contact Method</div>
                  <div className="capitalize">{submission.preferredContact}</div>
                </div>
              )}

              {submission.serviceName && (
                <div>
                  <div className="text-sm text-muted-foreground">Service Interested In</div>
                  <div>{submission.serviceName}</div>
                </div>
              )}

              <div>
                <div className="text-sm text-muted-foreground">Source</div>
                <div>{submission.source || "Website"}</div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">Status</div>
                <div className="mt-1">{getStatusBadge(submission.status)}</div>
              </div>
            </CardContent>
          </Card>

          <ContactStatusForm
            id={submission._id.toString()}
            currentStatus={submission.status}
            currentNotes={submission.notes || ""}
          />
        </div>
      </div>
    </div>
  )
}
