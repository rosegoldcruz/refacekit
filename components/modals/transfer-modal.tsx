"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface TransferModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TransferModal({ isOpen, onClose }: TransferModalProps) {
  const [transferTo, setTransferTo] = useState("")
  const [transferType, setTransferType] = useState<"blind" | "attended">("blind")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Transfer call to:", transferTo, "Type:", transferType)
    // TODO: Wire to softphone API
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-black border border-yellow-500/30 rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Transfer Call</h2>
          <Button onClick={onClose} variant="ghost" size="sm" className="text-white/60 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-yellow-400/70 text-sm mb-2 block">Transfer To *</label>
            <Input
              required
              type="tel"
              value={transferTo}
              onChange={(e) => setTransferTo(e.target.value)}
              placeholder="Extension or phone number"
              className="bg-black/40 border-yellow-500/30 text-white placeholder:text-white/40"
            />
          </div>

          <div>
            <label className="text-yellow-400/70 text-sm mb-2 block">Transfer Type</label>
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setTransferType("blind")}
                className={`flex-1 ${
                  transferType === "blind"
                    ? "bg-yellow-500 text-black"
                    : "bg-black/40 border border-yellow-500/30 text-white"
                }`}
              >
                Blind
              </Button>
              <Button
                type="button"
                onClick={() => setTransferType("attended")}
                className={`flex-1 ${
                  transferType === "attended"
                    ? "bg-yellow-500 text-black"
                    : "bg-black/40 border border-yellow-500/30 text-white"
                }`}
              >
                Attended
              </Button>
            </div>
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
              Transfer
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
