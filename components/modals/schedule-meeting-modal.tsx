"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ScheduleMeetingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ScheduleMeetingModal({ isOpen, onClose }: ScheduleMeetingModalProps) {
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [duration, setDuration] = useState("30")
  const [notes, setNotes] = useState("")

  const handleSchedule = () => {
    console.log("[v0] Scheduling meeting:", { date, time, duration, notes })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/95 border border-yellow-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-yellow-400">Schedule Meeting</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="meeting-date" className="text-yellow-400/80">
                Date
              </Label>
              <Input
                id="meeting-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-black/40 border-yellow-500/30 text-white mt-1"
              />
            </div>
            <div>
              <Label htmlFor="meeting-time" className="text-yellow-400/80">
                Time
              </Label>
              <Input
                id="meeting-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-black/40 border-yellow-500/30 text-white mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="meeting-duration" className="text-yellow-400/80">
              Duration (minutes)
            </Label>
            <Input
              id="meeting-duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="30"
              className="bg-black/40 border-yellow-500/30 text-white mt-1"
            />
          </div>

          <div>
            <Label htmlFor="meeting-notes" className="text-yellow-400/80">
              Notes
            </Label>
            <Textarea
              id="meeting-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Meeting agenda or notes..."
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
            <Button onClick={handleSchedule} className="bg-yellow-500 hover:bg-yellow-600 text-black">
              Schedule
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
