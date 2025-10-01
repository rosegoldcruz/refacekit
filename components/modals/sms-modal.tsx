"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface SMSModalProps {
  isOpen: boolean
  onClose: () => void
  defaultPhone?: string
}

export function SMSModal({ isOpen, onClose, defaultPhone = "" }: SMSModalProps) {
  const [formData, setFormData] = useState({
    to: defaultPhone,
    message: "",
  })

  const [charCount, setCharCount] = useState(0)
  const maxChars = 160

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] SMS form submitted:", formData)
    // TODO: Wire to API
    onClose()
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    if (text.length <= maxChars) {
      setFormData({ ...formData, message: text })
      setCharCount(text.length)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-black border border-yellow-500/30 rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Send SMS</h2>
          <Button onClick={onClose} variant="ghost" size="sm" className="text-white/60 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-yellow-400/70 text-sm mb-2 block">Phone Number *</label>
            <Input
              required
              type="tel"
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              placeholder="+1 (555) 123-4567"
              className="bg-black/40 border-yellow-500/30 text-white placeholder:text-white/40"
            />
          </div>

          <div>
            <label className="text-yellow-400/70 text-sm mb-2 block">Message *</label>
            <textarea
              required
              value={formData.message}
              onChange={handleMessageChange}
              placeholder="Type your message here..."
              rows={5}
              className="w-full bg-black/40 border border-yellow-500/30 rounded-lg text-white placeholder:text-white/40 p-3 resize-none"
            />
            <p className="text-xs text-yellow-400/60 mt-1 text-right">
              {charCount}/{maxChars} characters
            </p>
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
              Send SMS
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
