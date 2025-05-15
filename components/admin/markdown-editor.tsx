"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import ReactMarkdown from "react-markdown"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<string>("write")

  return (
    <div className="border rounded-md">
      <Tabs defaultValue="write" onValueChange={setActiveTab}>
        <div className="border-b px-3">
          <TabsList className="bg-transparent">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="write" className="p-0 mt-0">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your content in Markdown..."
            className="min-h-[400px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
          />
        </TabsContent>

        <TabsContent value="preview" className="p-4 mt-0 prose dark:prose-invert max-w-none min-h-[400px]">
          {value ? (
            <ReactMarkdown>{value}</ReactMarkdown>
          ) : (
            <div className="text-muted-foreground italic">Nothing to preview</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
