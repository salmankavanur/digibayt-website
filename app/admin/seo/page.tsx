import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { PlusCircle, Save, FileText, Globe, ArrowRight } from "lucide-react"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const metadata: Metadata = {
  title: "SEO Management | DigiBayt Admin",
  description: "Manage your website's SEO settings",
}

export default async function SEOPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">SEO Management</h1>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="global">
        <TabsList className="mb-6">
          <TabsTrigger value="global">Global SEO</TabsTrigger>
          <TabsTrigger value="pages">Page SEO</TabsTrigger>
          <TabsTrigger value="sitemap">Sitemap & Robots</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>

        <TabsContent value="global">
          <Card>
            <CardHeader>
              <CardTitle>Global SEO Settings</CardTitle>
              <CardDescription>
                These settings apply to your entire website unless overridden by page-specific settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="site-title">Website Title</Label>
                <Input id="site-title" defaultValue="DigiBayt - Web Development & Digital Solutions" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="site-description">Website Description</Label>
                <Textarea
                  id="site-description"
                  rows={3}
                  defaultValue="DigiBayt offers professional web development, mobile app development, digital marketing, cloud solutions, and library automation services."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Global Keywords</Label>
                <Textarea
                  id="keywords"
                  rows={2}
                  defaultValue="web development, mobile app development, digital marketing, cloud solutions, library automation"
                />
                <p className="text-sm text-muted-foreground">Separate keywords with commas</p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="canonical" defaultChecked />
                <Label htmlFor="canonical">Auto-generate canonical URLs</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="indexing" defaultChecked />
                <Label htmlFor="indexing">Allow search engines to index site</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle>Page-Specific SEO</CardTitle>
              <CardDescription>Manage SEO settings for individual pages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Pages</h3>
                  <Button variant="outline" size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Page
                  </Button>
                </div>

                {[
                  { path: "/", title: "Homepage" },
                  { path: "/services/web-development", title: "Web Development" },
                  { path: "/services/mobile-app-development", title: "Mobile App Development" },
                  { path: "/blog", title: "Blog" },
                  { path: "/contact", title: "Contact" },
                ].map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">{page.title}</div>
                      <div className="text-sm text-muted-foreground">{page.path}</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sitemap">
          <Card>
            <CardHeader>
              <CardTitle>Sitemap & Robots.txt</CardTitle>
              <CardDescription>Configure your sitemap and robots.txt file</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">Sitemap</h3>
                    <p className="text-sm text-muted-foreground">
                      Your sitemap is available at: <code>/sitemap.xml</code>
                    </p>
                  </div>
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    View Sitemap
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-sitemap" defaultChecked />
                    <Label htmlFor="auto-sitemap">Auto-generate sitemap</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Automatically update sitemap when content changes</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excluded-paths">Exclude Paths</Label>
                  <Textarea
                    id="excluded-paths"
                    rows={3}
                    defaultValue="/admin/*
/api/*
/login
/setup"
                  />
                  <p className="text-sm text-muted-foreground">One path per line. Use * for wildcards.</p>
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">Robots.txt</h3>
                    <p className="text-sm text-muted-foreground">Control how search engines crawl your site</p>
                  </div>
                  <Button variant="outline">
                    <Globe className="mr-2 h-4 w-4" />
                    View Robots.txt
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="robots-content">Robots.txt Content</Label>
                  <Textarea
                    id="robots-content"
                    rows={6}
                    defaultValue="User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /login
Disallow: /setup

Sitemap: https://digibayt.com/sitemap.xml"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Settings</CardTitle>
              <CardDescription>Configure how your content appears when shared on social media</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Open Graph Settings</h3>

                <div className="space-y-2">
                  <Label htmlFor="og-title">Default OG Title</Label>
                  <Input id="og-title" defaultValue="DigiBayt - Web Development & Digital Solutions" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="og-description">Default OG Description</Label>
                  <Textarea
                    id="og-description"
                    rows={3}
                    defaultValue="Professional web development, mobile app development, digital marketing, cloud solutions, and library automation services."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="og-image">Default OG Image</Label>
                  <div className="flex items-center gap-3">
                    <div className="h-20 w-40 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                      Preview Image
                    </div>
                    <Button variant="outline">Upload Image</Button>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-medium">Twitter Card Settings</h3>

                <div className="space-y-2">
                  <Label htmlFor="twitter-card">Card Type</Label>
                  <select id="twitter-card" className="w-full p-2 border rounded-md">
                    <option value="summary_large_image">Summary with Large Image</option>
                    <option value="summary">Summary</option>
                    <option value="app">App</option>
                    <option value="player">Player</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter-handle">Twitter Handle</Label>
                  <Input id="twitter-handle" defaultValue="@digibayt" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
