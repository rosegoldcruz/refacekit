"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Phone, Mail, Building2, MapPin, Calendar, Clock, Tag, FileText } from "lucide-react"

// Mock data - replace with actual API call
const mockContactData: Record<string, any> = {
  "lead-001": {
    id: "lead-001",
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Inc.",
    title: "VP of Sales",
    address: "123 Main St, San Francisco, CA 94102",
    created: "2024-01-10",
    lastActivity: "10 minutes ago",
    status: "Active",
    tags: ["Enterprise", "Hot Lead"],
    notes: "Interested in enterprise plan. Previous customer with positive experience.",
    timezone: "PST (GMT-8)",
    leadSource: "Inbound Call",
    dealValue: "$12,500",
  },
  "lead-002": {
    id: "lead-002",
    name: "Michael Chen",
    email: "mchen@innovate.io",
    phone: "+1 (555) 234-5678",
    company: "Innovate.io",
    title: "CTO",
    address: "456 Tech Ave, Austin, TX 78701",
    created: "2024-01-08",
    lastActivity: "2 hours ago",
    status: "Active",
    tags: ["SMB", "Warm"],
    notes: "Looking for integration solutions. Needs demo.",
    timezone: "CST (GMT-6)",
    leadSource: "Website Form",
    dealValue: "$8,000",
  },
}

export default function ContactDetailPage({ params }: { params: { leadId: string } }) {
  const router = useRouter()
  const contact = mockContactData[params.leadId] || {
    id: params.leadId,
    name: "Unknown Contact",
    email: "N/A",
    phone: "N/A",
    company: "N/A",
    title: "N/A",
    address: "N/A",
    created: "N/A",
    lastActivity: "N/A",
    status: "Unknown",
    tags: [],
    notes: "No information available",
    timezone: "N/A",
    leadSource: "N/A",
    dealValue: "N/A",
  }

  const handleCallClick = () => {
    router.push(`/dashboard?dial=${encodeURIComponent(contact.phone)}`)
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <Button
          onClick={() => router.push("/contacts")}
          variant="ghost"
          className="mb-4 text-gray-400 hover:text-white hover:bg-white/5"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Contacts
        </Button>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {contact.name}
            </h1>
            <p className="text-gray-400">
              {contact.title} at {contact.company}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              className={`${
                contact.status === "Active"
                  ? "bg-green-500/20 text-green-400 border-green-400/30"
                  : "bg-gray-500/20 text-gray-400 border-gray-400/30"
              }`}
            >
              {contact.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Contact Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Details Card */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-blue-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <button
                    onClick={handleCallClick}
                    className="text-white hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    {contact.phone}
                  </button>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a href={`mailto:${contact.email}`} className="text-white hover:text-blue-400 transition-colors">
                    {contact.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-blue-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400">Company</p>
                  <p className="text-white">{contact.company}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400">Address</p>
                  <p className="text-white">{contact.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400">Timezone</p>
                  <p className="text-white">{contact.timezone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-blue-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400">Lead Source</p>
                  <p className="text-white">{contact.leadSource}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Notes Card */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Notes</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">{contact.notes}</p>
          </Card>

          {/* Activity Timeline Card */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-4 border-b border-white/10">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2" />
                <div>
                  <p className="text-white font-medium">Last Activity</p>
                  <p className="text-sm text-gray-400">{contact.lastActivity}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-4 border-b border-white/10">
                <div className="w-2 h-2 rounded-full bg-green-400 mt-2" />
                <div>
                  <p className="text-white font-medium">Contact Created</p>
                  <p className="text-sm text-gray-400">{contact.created}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Quick Actions & Tags */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Quick Actions</h2>
            <div className="space-y-2">
              <Button onClick={handleCallClick} className="w-full bg-green-500 hover:bg-green-600 text-white">
                <Phone className="mr-2 h-4 w-4" />
                Call Contact
              </Button>
              <Button
                onClick={() => (window.location.href = `mailto:${contact.email}`)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Button>
              <Button
                onClick={() => router.push("/dashboard")}
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/5"
              >
                View in Dashboard
              </Button>
            </div>
          </Card>

          {/* Tags Card */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-5 w-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Tags</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {contact.tags.map((tag: string) => (
                <Badge key={tag} className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                  {tag}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Lead Info Card */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Lead Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Lead ID</p>
                <p className="text-white font-mono">{contact.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Deal Value</p>
                <p className="text-white font-semibold text-lg">{contact.dealValue}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
