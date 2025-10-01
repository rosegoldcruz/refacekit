"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SendDemoModalProps {
  isOpen: boolean
  onClose: () => void
  defaultEmail?: string
  defaultPhone?: string
}

export function SendDemoModal({ isOpen, onClose, defaultEmail = "", defaultPhone = "" }: SendDemoModalProps) {
  const [emailTo, setEmailTo] = useState(defaultEmail)
  const [emailSubject, setEmailSubject] = useState("Demo Request")
  const [emailBody, setEmailBody] = useState("")
  const [phoneNumber, setPhoneNumber] = useState(defaultPhone)
  const [smsMessage, setSmsMessage] = useState("")

  const handleSendEmail = () => {
    console.log("[v0] Sending demo email:", { to: emailTo, subject: emailSubject, body: emailBody })
    onClose()
  }

  const handleSendSMS = () => {
    console.log("[v0] Sending demo SMS:", { to: phoneNumber, message: smsMessage })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/95 border border-yellow-500/30 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-yellow-400">Send Demo</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black/40">
            <TabsTrigger
              value="email"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400"
            >
              Email
            </TabsTrigger>
            <TabsTrigger
              value="sms"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400"
            >
              SMS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-4 mt-4">
            <div>
              <Label htmlFor="email-to" className="text-yellow-400/80">
                To
              </Label>
              <Input
                id="email-to"
                type="email"
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
                placeholder="recipient@example.com"
                className="bg-black/40 border-yellow-500/30 text-white mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email-subject" className="text-yellow-400/80">
                Subject
              </Label>
              <Input
                id="email-subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Demo Request"
                className="bg-black/40 border-yellow-500/30 text-white mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email-body" className="text-yellow-400/80">
                Message
              </Label>
              <Textarea
                id="email-body"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                placeholder="Enter your demo message..."
                rows={6}
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
              <Button onClick={handleSendEmail} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                Send Email
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="sms" className="space-y-4 mt-4">
            <div>
              <Label htmlFor="sms-phone" className="text-yellow-400/80">
                Phone Number
              </Label>
              <Input
                id="sms-phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="bg-black/40 border-yellow-500/30 text-white mt-1"
              />
            </div>

            <div>
              <Label htmlFor="sms-message" className="text-yellow-400/80">
                Message
              </Label>
              <Textarea
                id="sms-message"
                value={smsMessage}
                onChange={(e) => setSmsMessage(e.target.value)}
                placeholder="Enter your demo message..."
                rows={6}
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
              <Button onClick={handleSendSMS} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                Send SMS
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
