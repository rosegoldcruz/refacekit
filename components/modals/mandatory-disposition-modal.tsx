"use client"

import { useState } from "react"
import { X, CheckCircle2, Phone, Clock, XCircle, Ban, PhoneOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface DispositionModalProps {
  isOpen: boolean
  onClose: (disposition: DispositionData | null) => void
  phoneNumber: string
  contactName?: string
  leadId?: number
  campaignId: string
  agentUser: string
}

export interface DispositionData {
  status: string
  notes: string
  callbackDateTime?: string
}

const DISPOSITIONS = [
  { code: "SALE", label: "Sale", icon: CheckCircle2, color: "bg-green-500 hover:bg-green-600", description: "Successfully closed" },
  { code: "CB", label: "Callback", icon: Clock, color: "bg-blue-500 hover:bg-blue-600", description: "Schedule follow-up" },
  { code: "NI", label: "Not Interested", icon: XCircle, color: "bg-orange-500 hover:bg-orange-600", description: "Declined offer" },
  { code: "NA", label: "No Answer", icon: PhoneOff, color: "bg-gray-500 hover:bg-gray-600", description: "Didn't pick up" },
  { code: "B", label: "Busy", icon: Phone, color: "bg-yellow-500 hover:bg-yellow-600", description: "Line busy" },
  { code: "DNC", label: "Do Not Call", icon: Ban, color: "bg-red-500 hover:bg-red-600", description: "Requested removal" },
]

export function MandatoryDispositionModal({
  isOpen,
  onClose,
  phoneNumber,
  contactName,
  leadId,
  campaignId,
  agentUser
}: DispositionModalProps) {
  const [selectedDisposition, setSelectedDisposition] = useState<string | null>(null)
  const [notes, setNotes] = useState("")
  const [callbackDateTime, setCallbackDateTime] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async () => {
    if (!selectedDisposition) {
      alert("Please select a disposition")
      return
    }

    setIsSubmitting(true)

    try {
      // Submit disposition to backend (VICIdial + GHL sync)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/disposition/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          lead_id: leadId?.toString() || "0",
          agent_user: agentUser,
          status: selectedDisposition,
          campaign_id: campaignId,
          phone_number: phoneNumber,
          first_name: contactName?.split(" ")[0] || "",
          last_name: contactName?.split(" ").slice(1).join(" ") || "",
          notes: notes,
          callback_datetime: callbackDateTime || ""
        })
      })

      const result = await response.json()

      if (result.status === "ok" || result.status === "partial") {
        console.log("[DISPOSITION] Submitted successfully:", result)
        
        // Close modal and pass disposition data back
        onClose({
          status: selectedDisposition,
          notes,
          callbackDateTime
        })
        
        // Reset form
        setSelectedDisposition(null)
        setNotes("")
        setCallbackDateTime("")
      } else {
        console.error("[DISPOSITION] Submission failed:", result)
        alert("Failed to submit disposition. Please try again.")
      }
    } catch (error) {
      console.error("[DISPOSITION] Error:", error)
      alert("Error submitting disposition. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    // DO NOT ALLOW CLOSING WITHOUT DISPOSITION
    alert("You must select a disposition before continuing")
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-yellow-500/50 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-yellow-500/30">
          <div>
            <h2 className="text-3xl font-bold text-white">Call Disposition Required</h2>
            <p className="text-white/60 mt-1">You must select a disposition to continue</p>
          </div>
          {/* REMOVED CLOSE BUTTON - DISPOSITION IS MANDATORY */}
        </div>

        {/* Call Info */}
        <div className="bg-black/40 border border-yellow-500/20 rounded-xl p-4 mb-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-white/50">Phone Number:</span>
              <span className="text-white font-mono ml-2">{phoneNumber}</span>
            </div>
            <div>
              <span className="text-white/50">Contact:</span>
              <span className="text-white ml-2">{contactName || "Unknown"}</span>
            </div>
            {leadId && (
              <div>
                <span className="text-white/50">Lead ID:</span>
                <span className="text-white font-mono ml-2">{leadId}</span>
              </div>
            )}
          </div>
        </div>

        {/* Disposition Selection */}
        <div className="mb-6">
          <Label className="text-white text-lg mb-4 block">Select Disposition *</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {DISPOSITIONS.map((dispo) => {
              const Icon = dispo.icon
              const isSelected = selectedDisposition === dispo.code
              
              return (
                <button
                  key={dispo.code}
                  onClick={() => setSelectedDisposition(dispo.code)}
                  className={`
                    p-4 rounded-xl border-2 transition-all duration-200
                    ${isSelected 
                      ? 'border-yellow-500 scale-105 shadow-lg shadow-yellow-500/20' 
                      : 'border-white/20 hover:border-yellow-500/50'
                    }
                    ${dispo.color} text-white
                  `}
                >
                  <Icon className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-bold text-lg">{dispo.label}</div>
                  <div className="text-xs text-white/80 mt-1">{dispo.description}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Callback DateTime (shown only if CB selected) */}
        {selectedDisposition === "CB" && (
          <div className="mb-6">
            <Label htmlFor="callback-datetime" className="text-white mb-2 block">
              Callback Date & Time
            </Label>
            <Input
              id="callback-datetime"
              type="datetime-local"
              value={callbackDateTime}
              onChange={(e) => setCallbackDateTime(e.target.value)}
              className="bg-black/40 border-yellow-500/30 text-white"
            />
          </div>
        )}

        {/* Notes */}
        <div className="mb-6">
          <Label htmlFor="notes" className="text-white mb-2 block">
            Notes (Optional)
          </Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes about this call..."
            rows={4}
            className="bg-black/40 border-yellow-500/30 text-white placeholder:text-white/40 resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button
            onClick={handleSubmit}
            disabled={!selectedDisposition || isSubmitting}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Disposition"}
          </Button>
        </div>

        <p className="text-center text-white/50 text-sm mt-4">
          ⚠️ You cannot continue until you submit a disposition
        </p>
      </div>
    </div>
  )
}
