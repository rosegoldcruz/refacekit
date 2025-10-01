"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Phone, Mail, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Mock data - replace with actual API call
const mockLeads = [
  {
    id: "lead-001",
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    phone: "+1 (555) 123-4567",
    created: "2024-01-10",
    lastActivity: "10 minutes ago",
    tags: ["Enterprise", "Hot Lead"],
  },
  {
    id: "lead-002",
    name: "Michael Chen",
    email: "mchen@innovate.io",
    phone: "+1 (555) 234-5678",
    created: "2024-01-08",
    lastActivity: "2 hours ago",
    tags: ["SMB", "Warm"],
  },
  {
    id: "lead-003",
    name: "Emily Rodriguez",
    email: "emily.r@globaltech.com",
    phone: "+1 (555) 345-6789",
    created: "2024-01-12",
    lastActivity: "5 minutes ago",
    tags: ["Enterprise", "Decision Maker"],
  },
  {
    id: "lead-004",
    name: "David Kim",
    email: "dkim@startupxyz.com",
    phone: "+1 (555) 456-7890",
    created: "2023-12-15",
    lastActivity: "3 days ago",
    tags: ["Startup", "Cold"],
  },
  {
    id: "lead-005",
    name: "Jessica Martinez",
    email: "jmartinez@enterprise.com",
    phone: "+1 (555) 567-8901",
    created: "2024-01-15",
    lastActivity: "1 hour ago",
    tags: ["Enterprise", "Hot Lead", "C-Level"],
  },
]

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function getAvatarColor(name: string) {
  const colors = [
    "bg-pink-500",
    "bg-red-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-green-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-sky-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-purple-500",
    "bg-fuchsia-500",
  ]
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

export default function ContactsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [leads, setLeads] = useState(mockLeads)

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const handleRowClick = (leadId: string) => {
    router.push(`/contacts/${leadId}`)
  }

  const handlePhoneClick = (phone: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent row click
    router.push(`/dashboard?dial=${encodeURIComponent(phone)}`)
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard")}
          className="mb-4 text-gray-400 hover:text-white hover:bg-white/5"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Contacts
        </h1>
        <p className="text-gray-400">Manage and view all your leads</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left p-4 text-sm font-semibold text-gray-300">Name</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-300">Phone</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-300">Email</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-300">Created</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-300">Last Activity</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-300">Tags</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => handleRowClick(lead.id)}
                  className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${getAvatarColor(lead.name)} flex items-center justify-center text-white font-semibold text-sm`}
                      >
                        {getInitials(lead.name)}
                      </div>
                      <span className="font-medium text-white">{lead.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div
                      onClick={(e) => handlePhoneClick(lead.phone, e)}
                      className="flex items-center gap-2 text-gray-300 hover:text-blue-400 cursor-pointer transition-colors"
                      title="Click to dial"
                    >
                      <Phone className="h-4 w-4 text-blue-400" />
                      {lead.phone}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Mail className="h-4 w-4 text-blue-400" />
                      {lead.email}
                    </div>
                  </td>
                  <td className="p-4 text-gray-300 text-sm">{lead.created}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-blue-400 text-sm">
                      <Phone className="h-3 w-3" />
                      {lead.lastActivity}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {lead.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-blue-500/20 text-blue-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLeads.length === 0 && (
          <div className="p-12 text-center text-gray-400">
            <p>No leads found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="mt-6 text-sm text-gray-400">
        Total Leads: <span className="text-white font-medium">{filteredLeads.length}</span>
      </div>
    </div>
  )
}
