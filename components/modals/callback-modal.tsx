"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CallbackModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
  const [date, setDate] = useState("")
  const [timeBucket, setTimeBucket] = useState("")
  const [notes, setNotes] = useState("")

  const handleCreateCallback = () => {
    console.log("[v0] Creating callback:", { date, timeBucket, notes })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/95 border border-yellow-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-yellow-400">Create Callback</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="callback-date" className="text-yellow-400/80">
              Date
            </Label>
            <Input
              id="callback-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-black/40 border-yellow-500/30 text-white mt-1"
            />
          </div>

          <div>
            <Label htmlFor="callback-time" className="text-yellow-400/80">
              Time Bucket
            </Label>
            <Select value={timeBucket} onValueChange={setTimeBucket}>
              <SelectTrigger className="bg-black/40 border-yellow-500/30 text-white mt-1">
                <SelectValue placeholder="Select time bucket" />
              </SelectTrigger>
              <SelectContent className="bg-black/95 border-yellow-500/30 text-white">
                <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="callback-notes" className="text-yellow-400/80">
              Notes
            </Label>
            <Textarea
              id="callback-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Callback reason or notes..."
              rows={4}
              className="bg-black/40 border-yellow-500/30 text-white mt-1 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-yellow-500/30 text-white hover:bg-yellow-500/10 bg-transparent"
            >
              Cancel
            </Button>
            <Button onClick={handleCreateCallback} className="bg-yellow-500 hover:bg-yellow-600 text-black">
              Create Callback
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
