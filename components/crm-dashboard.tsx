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
import { useSoftphone } from "@/hooks/use-softphone"
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

  // Initialize WebRTC softphone
  const softphone = useSoftphone({
    sipServer: process.env.NEXT_PUBLIC_SIP_SERVER || "147.182.253.110",
    sipUsername: agentUser,
    sipPassword: process.env.NEXT_PUBLIC_SIP_PASSWORD || "1234",
    sipExtension: agentUser,
    autoRegister: true
  })

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

  const [currentCustomer, setCurrentCustomer] = useState({
    leadId: "lead-12345",
    name: "Sarah Johnson",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@techcorp.com",
    company: "TechCorp Inc.",
    address: "123 Main St, San Francisco, CA 94102",
    customerTime: "PST (GMT-8)",
    channel: "Inbound Call",
    customerInfo: "Interested in enterprise plan, previous customer",
    recordingFile: "REC-2024-001234.mp3",
    recordId: "CRM-2024-5678",
    dealValue: "$12,500",
    status: "Active",
  })

  // Auto-launch disposition modal when call ends
  useEffect(() => {
    if (softphone.callState === 'ended' && softphone.currentCall) {
      setShowDispositionModal(true)
    }
  }, [softphone.callState, softphone.currentCall])

  // Manual dial handler - REAL INTEGRATION
  const handleManualDial = async () => {
    if (!dialedNumber) {
      toast.error("Please enter a phone number")
      return
    }

    try {
      toast.info("Placing call...")
      
      // Step 1: Trigger VICIdial external_dial
      const result = await manualDial(dialedNumber, agentUser, campaignId)
      
      if (result.success) {
        // Step 2: Connect softphone
        await softphone.call(dialedNumber, undefined, currentCustomer.name)
        toast.success("Call initiated")
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.error("[Manual Dial] Error:", error)
      toast.error("Failed to place call")
    }
  }

  // Hangup handler
  const handleHangup = async () => {
    await softphone.hangup()
    toast.info("Call ended")
  }

  // Use real softphone state instead of fake state
  const callStatus = softphone.callState
  const callDuration = softphone.callDuration
  const isRegistered = softphone.isRegistered

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

  const handleDialpadClick = (digit: string) => {
    setDialedNumber((prev) => prev + digit)
  }

  const handleCall = () => {
    if (dialedNumber && callStatus === "idle") {
      setCallStatus("dialing")
      setTimeout(() => setCallStatus("active"), 1500)
      setCallDuration(0)
    }
  }

  const handleHangup = () => {
    setCallStatus("idle")
    setDialedNumber("")
    setCallDuration(0)
    setIsMuted(false)
  }

  const handleHold = () => {
    if (callStatus === "active") {
      setCallStatus("hold")
    } else if (callStatus === "hold") {
      setCallStatus("active")
    }
  }

  const handleClear = () => {
    if (dialedNumber.length > 0) {
      setDialedNumber((prev) => prev.slice(0, -1))
    }
  }

  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getStatusText = () => {
    switch (callStatus) {
      case "dialing":
        return "DIALING..."
      case "ringing":
        return "RINGING"
      case "active":
        return "ACTIVE"
      case "hold":
        return "ON HOLD"
      default:
        return "NO ACTIVE CALL"
    }
  }

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

  const handleManualDial = () => {
    document.getElementById("softphone-input")?.focus()
  }

  const handleOpenContactProfile = () => {
    if (currentCustomer.leadId) {
      window.open(`/contacts/${currentCustomer.leadId}`, "_blank")
    }
  }

  const handleCustomerNameClick = () => {
    router.push(`/contacts/${currentCustomer.leadId}`)
  }

  const handlePhoneClick = () => {
    setDialedNumber(currentCustomer.phone)
    // Auto-focus softphone
    document.getElementById("softphone-input")?.focus()
  }

  const handleCompanyClick = () => {
    router.push(`/contacts?company=${encodeURIComponent(currentCustomer.company)}`)
  }

  const handleRecordingFileClick = () => {
    setShowAudioPlayerModal(true)
  }

  const handleRecordIdClick = () => {
    router.push(`/contacts/${currentCustomer.leadId}#record=${currentCustomer.recordId}`)
  }

  const handleDealValueClick = () => {
    router.push(`/deals?lead=${currentCustomer.leadId}`)
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
                onClick={() => router.push("/")}
                variant="ghost"
                className="text-yellow-400/80 hover:text-yellow-400 hover:bg-yellow-500/20"
                title="Back to Home"
              >
                <Home className="h-5 w-5" />
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
                  onClick={handleManualDial}
                  variant="ghost"
                  className="w-full justify-start text-white/90 hover:bg-yellow-500/20 hover:text-white transition-all text-sm md:text-base"
                  title="Focus the softphone number input"
                >
                  <Phone className="mr-3 h-4 w-4" />
                  Manual Dial
                </Button>
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
                  disabled={!currentCustomer.leadId}
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
                  value: "2,847",
                  change: "+12%",
                  icon: Users,
                  color: "text-blue-400",
                  type: "contacts",
                },
                {
                  title: "Meetings",
                  value: "24",
                  change: "+5%",
                  icon: Calendar,
                  color: "text-purple-400",
                  type: "meetings",
                },
                {
                  title: "Calls Made Today",
                  value: "47",
                  change: "+18%",
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
                      <p className={`text-sm font-medium ${stat.color}`}>{stat.change}</p>
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
                  <Badge
                    className={`text-xs ${
                      currentCustomer.status === "Active"
                        ? "bg-green-500/20 text-green-400 border-green-400/30"
                        : "bg-gray-500/20 text-gray-400 border-gray-400/30"
                    }`}
                  >
                    {currentCustomer.status}
                  </Badge>
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

              <div className="space-y-4">
                {/* Row 1: Name and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-yellow-400/70 text-sm mb-2 block">Customer Name</label>
                    <Input
                      value={currentCustomer.name}
                      onChange={(e) => setCurrentCustomer({ ...currentCustomer, name: e.target.value })}
                      onClick={handleCustomerNameClick}
                      className="bg-black/40 border-yellow-500/30 text-white placeholder:text-white/40 focus:border-yellow-500/50 focus:bg-black/50 cursor-pointer hover:border-yellow-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-yellow-400/70 text-sm mb-2 block">Phone Number</label>
                    <Input
                      value={currentCustomer.phone}
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
                      value={currentCustomer.email}
                      onChange={(e) => setCurrentCustomer({ ...currentCustomer, email: e.target.value })}
                      onClick={() => setShowEmailModal(true)}
                      className="w-full bg-black/40 border border-yellow-500/30 rounded-lg text-white placeholder:text-white/40 focus:border-yellow-500/50 focus:bg-black/50 p-3 resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-yellow-400/70 text-sm mb-2 block">Company</label>
                    <Input
                      value={currentCustomer.company}
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
                    value={currentCustomer.address}
                    onChange={(e) => setCurrentCustomer({ ...currentCustomer, address: e.target.value })}
                    className="w-full bg-black/40 border border-yellow-500/30 rounded-lg text-white placeholder:text-white/40 focus:border-yellow-500/50 focus:bg-black/50 p-3 resize-none"
                  />
                </div>

                {/* Row 4: Customer Time and Channel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-yellow-400/70 text-sm mb-2 block">Customer Time</label>
                    <Input
                      value={currentCustomer.customerTime}
                      onChange={(e) => setCurrentCustomer({ ...currentCustomer, customerTime: e.target.value })}
                      className="bg-black/40 border border-yellow-500/30 rounded-lg text-white placeholder:text-white/40 focus:border-yellow-500/50 focus:bg-black/50 p-3 resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-yellow-400/70 text-sm mb-2 block">Channel</label>
                    <Input
                      value={currentCustomer.channel}
                      onChange={(e) => setCurrentCustomer({ ...currentCustomer, channel: e.target.value })}
                      className="bg-black/40 border border-yellow-500/30 rounded-lg text-white placeholder:text-white/40 focus:border-yellow-500/50 focus:bg-black/50 p-3 resize-none"
                    />
                  </div>
                </div>

                {/* Row 5: Customer Information (notes) */}
                <div>
                  <label className="text-yellow-400/70 text-sm mb-2 block">Customer Information</label>
                  <textarea
                    value={currentCustomer.customerInfo}
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
                      value={currentCustomer.recordingFile}
                      onChange={(e) => setCurrentCustomer({ ...currentCustomer, recordingFile: e.target.value })}
                      onClick={handleRecordingFileClick}
                      className="bg-black/40 border border-yellow-500/30 rounded-lg text-white placeholder:text-white/40 focus:border-yellow-500/50 focus:bg-black/50 p-3 resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-yellow-400/70 text-sm mb-2 block">Record ID</label>
                    <Input
                      value={currentCustomer.recordId}
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
            </Card>

            {/* Script Panel */}
            <ScriptPanel
              leadId={currentCustomer.leadId}
              customerData={{
                firstName: currentCustomer.name.split(" ")[0],
                lastName: currentCustomer.name.split(" ")[1] || "",
                company: currentCustomer.company,
                amount: currentCustomer.dealValue,
                city: currentCustomer.address.split(",")[1]?.trim() || "San Francisco",
                phone: currentCustomer.phone,
                email: currentCustomer.email,
              }}
            />
          </div>

          {/* Right Column - Softphone */}
          <div className="lg:col-span-12 xl:col-span-3">
            <Card className="backdrop-blur-md bg-black/30 border border-yellow-500/20 rounded-2xl p-4">
              {/* Softphone Header */}
              <div className="text-center mb-6">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Softphone</h3>
                <Badge
                  className={`${
                    callStatus === "idle"
                      ? "bg-gray-500/20 text-gray-400 border-gray-400/30"
                      : callStatus === "active"
                        ? "bg-green-500/20 text-green-400 border-green-400/30"
                        : callStatus === "hold"
                          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          : "bg-blue-500/20 text-blue-400 border-blue-400/30"
                  }`}
                >
                  {getStatusText()}
                </Badge>
                <div className="flex items-center justify-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${isRegistered ? "bg-green-400" : "bg-gray-400"}`} />
                    <span className="text-xs text-white/60">{isRegistered ? "Active" : "Inactive"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Signal className="h-3 w-3 text-white/60" />
                    <span className="text-xs text-white/60">Strong</span>
                  </div>
                </div>
              </div>

              {/* Ready/Not Ready toggle for automatic dialer */}
              <div className="mb-4">
                <Button
                  onClick={() => setIsAgentReady(!isAgentReady)}
                  className={`w-full ${
                    isAgentReady ? "bg-green-500 hover:bg-green-600" : "bg-gray-600 hover:bg-gray-700"
                  } text-white transition-all`}
                >
                  {isAgentReady ? "Ready" : "Not Ready"}
                </Button>
              </div>

              {/* Display Screen */}
              <Card className="bg-black/50 border border-yellow-500/30 rounded-xl p-4 mb-6">
                <div className="text-center">
                  <input
                    id="softphone-input"
                    type="text"
                    value={dialedNumber}
                    onChange={(e) => setDialedNumber(e.target.value)}
                    className="text-xl md:text-2xl font-mono text-white tracking-wider min-h-[28px] md:min-h-[32px] bg-transparent border-none outline-none text-center w-full"
                    placeholder="---"
                  />
                  {callStatus === "active" && (
                    <p className="text-sm text-white/60 mt-2">{formatCallDuration(callDuration)}</p>
                  )}
                </div>
              </Card>

              {/* Keypad */}
              <div className="mb-6">
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((digit) => (
                    <Button
                      key={digit}
                      onClick={() => handleDialpadClick(digit)}
                      className="h-10 md:h-12 rounded-full bg-black/40 hover:bg-yellow-500/20 border border-yellow-500/30 text-white text-base md:text-lg font-semibold transition-all hover:scale-105 hover:border-yellow-500/50"
                    >
                      {digit}
                    </Button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleClear}
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-yellow-400/80 hover:text-yellow-400 hover:bg-yellow-500/20"
                  >
                    <Delete className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                </div>
              </div>

              {/* Call Controls */}
              <div className="space-y-2 mb-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={handleCall}
                    disabled={!dialedNumber || callStatus !== "idle" || !isAgentReady}
                    className="bg-green-500 hover:bg-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                  >
                    <PhoneCall className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button
                    onClick={handleHangup}
                    disabled={callStatus === "idle"}
                    className="bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                  >
                    <PhoneOff className="h-4 w-4 mr-2" />
                    Hangup
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={handleHold}
                    disabled={callStatus !== "active" && callStatus !== "hold"}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                  >
                    <Pause className="h-4 w-4 mr-2" />
                    {callStatus === "hold" ? "Resume" : "Hold"}
                  </Button>
                  <Button
                    onClick={() => setShowTransferModal(true)}
                    disabled={callStatus !== "active"}
                    className="bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                  >
                    <PhoneForwarded className="h-4 w-4 mr-2" />
                    Transfer
                  </Button>
                </div>
              </div>

              {/* Utility Row */}
              <div className="flex items-center justify-center gap-4 pt-4 border-t border-yellow-500/20">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsMuted(!isMuted)}
                  disabled={callStatus !== "active"}
                  className="text-yellow-400/80 hover:text-yellow-400 hover:bg-yellow-500/20 disabled:opacity-50"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  <span className="ml-1 text-xs">{isMuted ? "Muted" : "Mute"}</span>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <AddContactModal isOpen={showAddContactModal} onClose={() => setShowAddContactModal(false)} />

      <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        defaultEmail={currentCustomer.email}
      />

      <NoteModal isOpen={showNoteModal} onClose={() => setShowNoteModal(false)} contactName={currentCustomer.name} />

      <TransferModal isOpen={showTransferModal} onClose={() => setShowTransferModal(false)} />

      <AudioPlayerModal
        isOpen={showAudioPlayerModal}
        onClose={() => setShowAudioPlayerModal(false)}
        recordingFile={currentCustomer.recordingFile}
      />

      <SendDemoModal
        isOpen={showSendDemoModal}
        onClose={() => setShowSendDemoModal(false)}
        defaultEmail={currentCustomer.email}
        defaultPhone={currentCustomer.phone}
      />

      <ScheduleMeetingModal isOpen={showScheduleMeetingModal} onClose={() => setShowScheduleMeetingModal(false)} />

      <CallbackModal isOpen={showCallbackModal} onClose={() => setShowCallbackModal(false)} />

      {/* MANDATORY DISPOSITION MODAL - BLOCKS UI AFTER CALL */}
      <MandatoryDispositionModal
        isOpen={showDispositionModal}
        onClose={(disposition) => {
          if (disposition) {
            // Disposition submitted successfully
            setShowDispositionModal(false)
            toast.success("Disposition submitted")
            // Clear call data
            setDialedNumber("")
          }
        }}
        phoneNumber={softphone.currentCall?.phoneNumber || dialedNumber}
        contactName={softphone.currentCall?.contactName || currentCustomer.name}
        leadId={softphone.currentCall?.leadId || parseInt(currentCustomer.leadId.replace("lead-", ""))}
        campaignId={campaignId}
        agentUser={agentUser}
      />
    </div>
  )
}
