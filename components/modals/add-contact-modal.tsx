"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface AddContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddContactModal({ isOpen, onClose }: AddContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    address: "",
    notes: "",
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Add Contact form submitted:", formData)
    // TODO: Wire to API
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-black border border-yellow-500/30 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Add New Contact</h2>
          <Button onClick={onClose} variant="ghost" size="sm" className="text-white/60 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-yellow-400/70 text-sm mb-2 block">Name *</label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              className="bg-black/40 border-yellow-500/30 text-white placeholder:text-white/40"
            />
          </div>

          <div>
            <label className="text-yellow-400/70 text-sm mb-2 block">Phone *</label>
            <Input
              required
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
              className="bg-black/40 border-yellow-500/30 text-white placeholder:text-white/40"
            />
          </div>

          <div>
            <label className="text-yellow-400/70 text-sm mb-2 block">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
              className="bg-black/40 border-yellow-500/30 text-white placeholder:text-white/40"
            />
          </div>

          <div>
            <label className="text-yellow-400/70 text-sm mb-2 block">Company</label>
            <Input
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Acme Corp"
              className="bg-black/40 border-yellow-500/30 text-white placeholder:text-white/40"
            />
          </div>

          <div>
            <label className="text-yellow-400/70 text-sm mb-2 block">Address</label>
            <Input
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="123 Main St, City, State"
              className="bg-black/40 border-yellow-500/30 text-white placeholder:text-white/40"
            />
          </div>

          <div>
            <label className="text-yellow-400/70 text-sm mb-2 block">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional information..."
              rows={3}
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
              Add Contact
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
