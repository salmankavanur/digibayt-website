import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getPublishedBlogPosts } from "@/lib/blog"
import { getFeaturedPortfolioItems } from "@/lib/portfolio"
import { getContactSubmissionsByStatus } from "@/lib/contact"
import { formatDistanceToNow } from "date-fns"
import { BarChart3, FileText, ImageIcon, MessageSquare, ArrowUpRight, ArrowRight, Plus } from "lucide-react"

export default async function AdminDashboard() {
  const recentBlogPosts = await getPublishedBlogPosts(5)
  const featuredProjects = await getFeaturedPortfolioItems(5)
  const newContacts = await getContactSubmissionsByStatus("new")

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your website admin panel. Manage your content, users, and settings.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentBlogPosts.length}</div>
            <p className="text-xs text-muted-foreground">Published posts</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="gap-1" asChild>
              <Link href="/admin/blog">
                View all posts
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{featuredProjects.length}</div>
            <p className="text-xs text-muted-foreground">Featured projects</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="gap-1" asChild>
              <Link href="/admin/portfolio">
                View all projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contacts</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newContacts.length}</div>
            <p className="text-xs text-muted-foreground">New submissions</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="gap-1" asChild>
              <Link href="/admin/contact">
                View all contacts
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Analytics</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">Website traffic</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="gap-1" asChild>
              <Link href="/admin/analytics">
                View analytics
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="recent-activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent-activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="quick-actions">Quick Actions</TabsTrigger>
        </TabsList>
        <TabsContent value="recent-activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest content and interactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {newContacts.length > 0 && (
                <div>
                  <h3 className="mb-4 text-sm font-medium">New Contact Submissions</h3>
                  <div className="space-y-4">
                    {newContacts.slice(0, 3).map((contact) => (
                      <div key={contact._id?.toString()} className="flex items-start gap-4">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>
                            {contact.firstName.charAt(0)}
                            {contact.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {contact.firstName} {contact.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">{contact.email}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(contact.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/admin/contact/${contact._id}`}>View</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {recentBlogPosts.length > 0 && (
                <div>
                  <h3 className="mb-4 text-sm font-medium">Recent Blog Posts</h3>
                  <div className="space-y-4">
                    {recentBlogPosts.slice(0, 3).map((post) => (
                      <div key={post._id?.toString()} className="flex items-start gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{post.title}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {post.categories[0]}
                            </Badge>
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(post.publishedAt as string), { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                        <div className="ml-auto flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/admin/blog/${post._id}/edit`}>Edit</Link>
                          </Button>
                          <Button size="sm" variant="ghost" asChild>
                            <Link href={`/blog/${post.slug}`} target="_blank">
                              <ArrowUpRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="quick-actions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">New Blog Post</CardTitle>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    <Button asChild className="w-full">
                      <Link href="/admin/blog/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Post
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">New Portfolio Item</CardTitle>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    <Button asChild className="w-full">
                      <Link href="/admin/portfolio/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Project
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">Upload Media</CardTitle>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    <Button asChild className="w-full">
                      <Link href="/admin/media">
                        <Plus className="mr-2 h-4 w-4" />
                        Upload Files
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
