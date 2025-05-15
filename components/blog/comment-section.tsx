"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Comment {
  id: number
  name: string
  email: string
  date: string
  content: string
  avatar?: string
}

interface CommentSectionProps {
  postSlug: string
  initialComments?: Comment[]
}

export function CommentSection({ postSlug, initialComments = [] }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newComment: Comment = {
        id: Date.now(),
        name,
        email,
        date: new Date().toLocaleDateString(),
        content,
      }

      setComments([...comments, newComment])
      setName("")
      setEmail("")
      setContent("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments ({comments.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 mb-8">
          {comments.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">Be the first to comment on this post!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar className="h-10 w-10">
                  {comment.avatar ? (
                    <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.name} />
                  ) : (
                    <AvatarFallback>{comment.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <h4 className="font-medium">{comment.name}</h4>
                    <span className="text-xs text-muted-foreground">{comment.date}</span>
                  </div>
                  <p className="mt-2">{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h4 className="font-medium">Leave a comment</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea id="comment" rows={4} value={content} onChange={(e) => setContent(e.target.value)} required />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Post Comment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
