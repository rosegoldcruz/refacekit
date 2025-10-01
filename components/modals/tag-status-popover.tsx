"use client"

import type React from "react"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Tag } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TagStatusPopoverProps {
  children: React.ReactNode
}

export function TagStatusPopover({ children }: TagStatusPopoverProps) {
  const [tags, setTags] = useState<string[]>(["VIP", "Enterprise"])
  const [newTag, setNewTag] = useState("")
  const [status, setStatus] = useState("Active")

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSave = () => {
    console.log("[v0] Saving tags and status:", { tags, status })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80 bg-black/95 border border-yellow-500/30 text-white">
        <div className="space-y-4">
          <div>
            <Label className="text-yellow-400/80 text-sm">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-black/40 border-yellow-500/30 text-white mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/95 border-yellow-500/30 text-white">
                <SelectItem value="Prospect">Prospect</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-yellow-400/80 text-sm">Tags</Label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30 flex items-center gap-1"
                >
                  {tag}
                  <X className="h-3 w-3 cursor-pointer hover:text-yellow-300" onClick={() => handleRemoveTag(tag)} />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                placeholder="Add tag..."
                className="bg-black/40 border-yellow-500/30 text-white flex-1"
              />
              <Button onClick={handleAddTag} size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Tag className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button onClick={handleSave} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
            Save Changes
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
