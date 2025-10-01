"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface NoteModalProps {
  isOpen: boolean
  onClose: () => void
  contactName?: string
}

export function NoteModal({ isOpen, onClose, contactName = "" }: NoteModalProps) {
  const [note, setNote] = useState("")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Note submitted:", note)
    // TODO: Wire to API
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-black border border-yellow-500/30 rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Add Note</h2>
          <Button onClick={onClose} variant="ghost" size="sm" className="text-white/60 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {contactName && <p className="text-yellow-400/70 text-sm mb-4">For: {contactName}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-yellow-400/70 text-sm mb-2 block">Note *</label>
            <textarea
              required
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Type your note here..."
              rows={6}
              className="w-full bg-black/40 border border-yellow-500/30 rounded-lg text-white placeholder:text-white/40 p-3 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 border-yellow-500/30 bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black">
              Save Note
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
