"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Calendar,
  Search,
  Plus,
  Phone,
  Mail,
  FileText,
  Filter,
  Download,
  PhoneCall,
  PhoneOff,
  Pause,
  PhoneForwarded,
  Mic,
  MicOff,
  Signal,
  Delete,
  ExternalLink,
  Tag,
  Video,
  Clock,
  User,
  Home,
} from "lucide-react"
import Image from "next/image"

import { AddContactModal } from "@/components/modals/add-contact-modal"
import { EmailModal } from "@/components/modals/email-modal"
import { NoteModal } from "@/components/modals/note-modal"
import { TransferModal } from "@/components/modals/transfer-modal"
import { AudioPlayerModal } from "@/components/modals/audio-player-modal"
import { SendDemoModal } from "@/components/modals/send-demo-modal"
import { ScheduleMeetingModal } from "@/components/modals/schedule-meeting-modal"
import { CallbackModal } from "@/components/modals/callback-modal"
import { TagStatusPopover } from "@/components/modals/tag-status-popover"
import { MandatoryDispositionModal } from "@/components/modals/mandatory-disposition-modal"
import { ScriptPanel } from "@/components/script-panel"
import { AIChatInterface } from "@/components/ai-chat-interface"
import AeonSoftphone from "@/components/AeonSoftphone"
import { manualDial } from "@/lib/vicidial-api"
import { toast } from "sonner"

export function CRMDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const hasProcessedDialParam = useRef(false)
  const [dialedNumber, setDialedNumber] = useState("")
  const [isMuted, setIsMuted] = useState(false)
  const [isAgentReady, setIsAgentReady] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Agent configuration - TODO: Get from Clerk user
  const agentUser = "agent001"
  const campaignId = "DEFAULT"

  // Modal states
  const [showAddContactModal, setShowAddContactModal] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [showAudioPlayerModal, setShowAudioPlayerModal] = useState(false)
  const [showSendDemoModal, setShowSendDemoModal] = useState(false)
  const [showScheduleMeetingModal, setShowScheduleMeetingModal] = useState(false)
  const [showCallbackModal, setShowCallbackModal] = useState(false)
  const [showDispositionModal, setShowDispositionModal] = useState(false)

  // NO PLACEHOLDER DATA - Will be populated when call is placed
  const [currentCustomer, setCurrentCustomer] = useState<{
    leadId?: string
    name?: string
    phone?: string
    email?: string
    company?: string
    address?: string
    customerTime?: string
    channel?: string
    customerInfo?: string
    recordingFile?: string
    recordId?: string
    dealValue?: string
    status?: string
  } | null>(null)


  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        document.getElementById("global-search")?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  useEffect(() => {
    const dialParam = searchParams.get("dial")
    if (dialParam && !hasProcessedDialParam.current) {
      console.log("[v0] Click-to-dial: Setting number from URL:", dialParam)
      hasProcessedDialParam.current = true
      setDialedNumber(dialParam)
      // Auto-focus the softphone input
      setTimeout(() => {
        document.getElementById("softphone-input")?.focus()
      }, 100)
      // Clear the URL parameter
      router.replace("/dashboard", { scroll: false })
    }
  }, [searchParams, router])


  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleKPIClick = (type: string) => {
    switch (type) {
      case "contacts":
        router.push("/contacts?sort=recent")
        break
      case "meetings":
        router.push("/meetings?range=today")
        break
      case "calls":
        router.push("/activity?type=calls&range=today")
        break
    }
  }

  const handleOpenContactProfile = () => {
    if (currentCustomer?.leadId) {
      window.open(`/contacts/${currentCustomer.leadId}`, "_blank")
    }
  }

  const handleCustomerNameClick = () => {
    if (currentCustomer?.leadId) {
      router.push(`/contacts/${currentCustomer.leadId}`)
    }
  }

  const handlePhoneClick = () => {
    if (currentCustomer?.phone) {
      setDialedNumber(currentCustomer.phone)
    }
    // Auto-focus softphone
    document.getElementById("softphone-input")?.focus()
  }

  const handleCompanyClick = () => {
    if (currentCustomer?.company) {
      router.push(`/contacts?company=${encodeURIComponent(currentCustomer.company)}`)
    }
  }

  const handleRecordingFileClick = () => {
    setShowAudioPlayerModal(true)
  }

  const handleRecordIdClick = () => {
    if (currentCustomer?.leadId && currentCustomer?.recordId) {
      router.push(`/contacts/${currentCustomer.leadId}#record=${currentCustomer.recordId}`)
    }
  }

  const handleDealValueClick = () => {
    if (currentCustomer?.leadId) {
      router.push(`/deals?lead=${currentCustomer.leadId}`)
    }
  }

  return (
    <div className="min-h-screen relative">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/neon-background.png')`,
        }}
      />
      <div className="bg-black/50 fixed inset-0" />

      {/* Sticky Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-yellow-500/20">
        <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-3">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            {/* Left: Logo + Home Button */}
            <div className="flex items-center gap-3">
              <Image
                src="/images/refacekit-logo.png"
                alt="RefaceKit"
                width={200}
                height={60}
                className="h-10 w-auto"
                priority
              />
              <Button
                onClick={handleOpenContactProfile}
                variant="ghost"
                className="text-yellow-400/80 hover:text-yellow-400 hover:bg-yellow-500/20 ml-2"
                title="Open profile in new tab"
                disabled={!currentCustomer?.leadId}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>

            {/* Center: Global Search */}
            <div className="w-full md:flex-1 md:max-w-md md:mx-8">
              <form onSubmit={handleGlobalSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400/60 h-4 w-4" />
                <Input
                  id="global-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search contacts... (Press / to focus)"
                  className="pl-10 bg-black/30 border border-yellow-500/30 rounded-xl text-white placeholder:text-white/50 focus:border-yellow-500/50 focus:bg-black/40"
                />
              </form>
            </div>

            {/* Right: Add Contact Button + User Profile */}
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowAddContactModal(true)}
                className="w-full md:w-auto bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold border-0 shadow-lg"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Contact
              </Button>
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center">
                <User className="h-5 w-5 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-[1920px] mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4">
          {/* Left Column - Quick Actions + AI Chat */}
          <div className="lg:col-span-3 xl:col-span-2 space-y-3 md:space-y-4">
            <Card className="backdrop-blur-md bg-black/30 border border-yellow-500/20 rounded-2xl p-4">
              <h3 className="text-base md:text-lg font-semibold text-white mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  onClick={() => setShowSendDemoModal(true)}
                  variant="ghost"
                  className="w-full justify-start text-white/90 hover:bg-yellow-500/20 hover:text-white transition-all text-sm md:text-base"
                  title="Send demo via Email or SMS"
                >
                  <Video className="mr-3 h-4 w-4" />
                  Send Demo
                </Button>
                <Button
                  onClick={() => setShowScheduleMeetingModal(true)}
                  variant="ghost"
                  className="w-full justify-start text-white/90 hover:bg-yellow-500/20 hover:text-white transition-all text-sm md:text-base"
                  title="Schedule a meeting"
                >
                  <Calendar className="mr-3 h-4 w-4" />
                  Schedule Meeting
                </Button>
                <Button
                  onClick={() => setShowCallbackModal(true)}
                  variant="ghost"
                  className="w-full justify-start text-white/90 hover:bg-yellow-500/20 hover:text-white transition-all text-sm md:text-base"
                  title="Create a callback reminder"
                >
                  <Clock className="mr-3 h-4 w-4" />
                  Create Callback
                </Button>
                <Button
                  onClick={handleOpenContactProfile}
                  disabled={!currentCustomer?.leadId}
                  variant="ghost"
                  className="w-full justify-start text-white/90 hover:bg-yellow-500/20 hover:text-white transition-all text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Open contact profile in new tab"
                >
                  <ExternalLink className="mr-3 h-4 w-4" />
                  Open Contact Profile
                </Button>
                <TagStatusPopover>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white/90 hover:bg-yellow-500/20 hover:text-white transition-all text-sm md:text-base"
                    title="Add tags and set status"
                  >
                    <Tag className="mr-3 h-4 w-4" />
                    Tag / Status
                  </Button>
                </TagStatusPopover>
              </div>
            </Card>

            <AIChatInterface />
          </div>

          {/* Center Column - KPI Tiles + Customer Information + Script */}
          <div className="lg:col-span-9 xl:col-span-7 space-y-3 md:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              {[
                {
                  title: "Total Contacts",
                  value: "-",
                  change: "No data",
                  icon: Users,
                  color: "text-blue-400",
                  type: "contacts",
                },
                {
                  title: "Meetings",
                  value: "-",
                  change: "No data",
                  icon: Calendar,
                  color: "text-purple-400",
                  type: "meetings",
                },
                {
                  title: "Calls Made Today",
                  value: "-",
                  change: "No data",
                  icon: Phone,
                  color: "text-green-400",
                  type: "calls",
                },
              ].map((stat, index) => (
                <Card
                  key={index}
                  onClick={() => handleKPIClick(stat.type)}
                  className="backdrop-blur-md bg-black/30 border border-yellow-500/20 rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-black/40 hover:border-yellow-500/40"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-400/70 text-sm mb-1">{stat.title}</p>
                      <p className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</p>
                      <p className={`text-sm font-medium text-white/40`}>{stat.change}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 md:h-10 md:w-10 ${stat.color}`} />
                  </div>
                </Card>
              ))}
            </div>

            <Card className="backdrop-blur-md bg-black/30 border border-yellow-500/20 rounded-2xl p-4 md:p-6">
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h3 className="text-lg md:text-xl font-semibold text-white">Customer Information</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  {currentCustomer?.status && (
                    <Badge
                      className={`text-xs ${
                        currentCustomer.status === "Active"
                          ? "bg-green-500/20 text-green-400 border-green-400/30"
                          : "bg-gray-500/20 text-gray-400 border-gray-400/30"
                      }`}
                    >
                      {currentCustomer.status}
                    </Badge>
                  )}
                  <Button size="sm" variant="ghost" className="text-white/90 hover:bg-yellow-500/20 hover:text-white">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white/90 hover:bg-yellow-500/20 hover:text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              {!currentCustomer ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <User className="h-16 w-16 text-white/20 mb-4" />
                  <p className="text-white/60 text-lg mb-2">No Customer Selected</p>
                  <p className="text-white/40 text-sm">Place a call to load customer information</p>
                </div>
              ) : (
              <div className="space-y-4">
                {/* Row 1: Name and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-yellow-400/70 text-sm mb-2 block">Customer Name</label>
                    <Input
                      value={currentCustomer.name || ""}
                      onChange={(e) => setCurrentCustomer({ ...currentCustomer, name: e.target.value })}
                      onClick={handleCustomerNameClick}
                      className="bg-black/40 border-yellow-500/30 text-white placeholder:text-white/40 focus:border-yellow-500/50 focus:bg-black/50 cursor-pointer hover:border-yellow-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-yellow-400/70 text-sm mb-2 block">Phone Number</label>
                    <Input
                      value={currentCustomer.phone || ""}
                      onChange={(e) => setCurrentCustomer({ ...currentCustomer, phone: e.target.value })}
                      onClick={handlePhoneClick}
                      className="bg-black/40 border-yellow-500/30 text-white placeholder:text-white/40 focus:border-yellow-500/50 focus:bg-black/50 cursor-pointer hover:border-yellow-500/50"
                    />
                  </div>
                </div>

                {/* Row 2: Email and Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-yellow-400/70 text-sm mb-2 block">Email</label>
                    <Input
                      value={currentCustomer.email || ""}
                      onChange={(e) => setCurrentCustomer({ ...currentCustomer, email: e.target.value })}
                      onClick={() => setShowEmailModal(true)}
                      className="w-full bg-black/40 border border-yellow-500/30 rounded-lg text-white placeholder:text-white/40 focus:border-yellow-500/50 focus:bg-black/50 p-3 resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-yellow-400/70 text-sm mb-2 block">Company</label>
                    <Input
                      value={currentCustomer.company || ""}
                      onChange={(e) => setCurrentCustomer({ ...currentCustomer, company: e.target.value })}
                      onClick={handleCompanyClick}
                      className="w-full bg-black/40 border border-yellow-500/30 rounded-lg text-white placeholder:text-white/40 focus:border-yellow-500/50 focus:bg-black/50 p-3 resize-none"
                    />
                  </div>
                </div>

                {/* Row 3: Address */}
                <div>
                  <label className="text-yellow-400/70 text-sm mb-2 block">Address</label>
                  <Input
                    value={currentCustomer.address || ""}
                    onChange={(e) => setCurrentCustomer({ ...currentCustomer, address: e.target.value })}
                    className="w-full bg-black/40 border border-yellow-500/30 rounded-lg text-white placeholder:text-white/40 focus:border-yellow-500/50 focus:bg-black/50 p-3 resize-none"
                  />
                </div>

                {/* Row 4: Customer Time and Channel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-yellow-400/70 text-sm mb-2 block">Customer Time</label>
                    <Input
                      value={currentCustomer.customerTime || ""}
                      onChange={(e) => setCurrentCustomer({ ...currentCustomer, customerTime: e.target.value })}
                      className="bg-black/40 border border-yellow-500/30 rounded-lg text-white placeholder:text-white/40 focus:border-yellow-500/50 focus:bg-black/50 p-3 resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-yellow-400/70 text-sm mb-2 block">Channel</label>
                    <Input
                      value={currentCustomer.channel || ""}
                      onChange={(e) => setCurrentCustomer({ ...currentCustomer, channel: e.target.value })}
                      className="bg-black/40 border border-yellow-500/30 rounded-lg text-white placeholder:text-white/40 focus:border-yellow-500/50 focus:bg-black/50 p-3 resize-none"
                    />
                  </div>
                </div>

                {/* Row 5: Customer Information (notes) */}
                <div>
                  <label className="text-yellow-400/70 text-sm mb-2 block">Customer Information</label>
                  <textarea
                    value={currentCustomer.customerInfo || ""}
                    onChange={(e) => setCurrentCustomer({ ...currentCustomer, customerInfo: e.target.value })}
                    rows={3}
                    className="w-full bg-black/40 border border-yellow-500/30 rounded-lg text-white placeholder:text-white/40 focus:border-yellow-500/50 focus:bg-black/50 p-3 resize-none"
                  />
                </div>

                {/* Row 6: Recording File and Record ID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-yellow-400/70 text-sm mb-2 block">Recording File</label>
                    <Input
                      value={currentCustomer.recordingFile || ""}
                      onChange={(e) => setCurrentCustomer({ ...currentCustomer, recordingFile: e.target.value })}
                      onClick={handleRecordingFileClick}
                      className="bg-black/40 border border-yellow-500/30 rounded-lg text-white placeholder:text-white/40 focus:border-yellow-500/50 focus:bg-black/50 p-3 resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-yellow-400/70 text-sm mb-2 block">Record ID</label>
                    <Input
                      value={currentCustomer.recordId || ""}
                      onChange={(e) => setCurrentCustomer({ ...currentCustomer, recordId: e.target.value })}
                      onClick={handleRecordIdClick}
                      className="bg-black/40 border border-yellow-500/30 rounded-lg text-white placeholder:text-white/40 focus:border-yellow-500/50 focus:bg-black/50 p-3 resize-none"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button onClick={handlePhoneClick} className="flex-1 bg-green-500 hover:bg-green-600 text-white">
                    <PhoneCall className="mr-2 h-4 w-4" />
                    Call Customer
                  </Button>
                  <Button
                    onClick={() => setShowEmailModal(true)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                  <Button
                    onClick={() => setShowNoteModal(true)}
                    variant="outline"
                    className="bg-black/40 border-yellow-500/30 text-white hover:bg-black/50 hover:border-yellow-500/50"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Add Note
                  </Button>
                </div>
              </div>
              )}
            </Card>

            {/* Script Panel - Only show if customer exists */}
            {currentCustomer && (
              <ScriptPanel
                leadId={currentCustomer.leadId || ""}
                customerData={{
                  firstName: currentCustomer.name?.split(" ")[0] || "",
                  lastName: currentCustomer.name?.split(" ")[1] || "",
                  company: currentCustomer.company || "",
                  amount: currentCustomer.dealValue || "",
                  city: currentCustomer.address?.split(",")[1]?.trim() || "",
                  phone: currentCustomer.phone || "",
                  email: currentCustomer.email || "",
                }}
              />
            )}
          </div>

          {/* Right Column - Softphone */}
          <div className="lg:col-span-12 xl:col-span-3">
            <AeonSoftphone />
          </div>
        </div>
      </div>

      <AddContactModal isOpen={showAddContactModal} onClose={() => setShowAddContactModal(false)} />

      <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        defaultEmail={currentCustomer?.email || ""}
      />

      <NoteModal isOpen={showNoteModal} onClose={() => setShowNoteModal(false)} contactName={currentCustomer?.name || ""} />

      <TransferModal isOpen={showTransferModal} onClose={() => setShowTransferModal(false)} />

      <AudioPlayerModal
        isOpen={showAudioPlayerModal}
        onClose={() => setShowAudioPlayerModal(false)}
        recordingFile={currentCustomer?.recordingFile || ""}
      />

      <SendDemoModal
        isOpen={showSendDemoModal}
        onClose={() => setShowSendDemoModal(false)}
        defaultEmail={currentCustomer?.email || ""}
        defaultPhone={currentCustomer?.phone || ""}
      />

      <ScheduleMeetingModal isOpen={showScheduleMeetingModal} onClose={() => setShowScheduleMeetingModal(false)} />

      <CallbackModal isOpen={showCallbackModal} onClose={() => setShowCallbackModal(false)} />

    </div>
  )
}
