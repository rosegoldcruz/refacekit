"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { Search, Phone, Mail, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getContacts, searchContacts } from "@/lib/vicidial-api"

export const dynamic = 'force-dynamic'

interface Lead {
  lead_id: number
  first_name: string
  last_name: string
  phone_number: string
  email: string | null
  city: string | null
  state: string | null
  status: string
  called_count: number
  last_local_call_time: string | null
  entry_date?: string
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function getAvatarColor(index: number) {
  const colors = [
    "bg-pink-500", "bg-red-500", "bg-orange-500", "bg-amber-500",
    "bg-yellow-500", "bg-lime-500", "bg-green-500", "bg-emerald-500",
    "bg-teal-500", "bg-cyan-500", "bg-sky-500", "bg-blue-500",
    "bg-indigo-500", "bg-violet-500", "bg-purple-500", "bg-fuchsia-500",
  ]
  return colors[index % colors.length]
}

function ContactsContent() {
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/sign-in')
      return
    }

    const loadContacts = async () => {
      setLoading(true)
      try {
        const data = await getContacts(undefined, 100)
        setLeads(data)
      } catch (error) {
        console.error('Failed to load contacts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadContacts()
  }, [isSignedIn, router])

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.trim().length > 0) {
      setLoading(true)
      try {
        const data = await searchContacts(query, 100)
        setLeads(data)
      } catch (error) {
        console.error('Search failed:', error)
      } finally {
        setLoading(false)
      }
    } else {
      const data = await getContacts(undefined, 100)
      setLeads(data)
    }
  }

  if (!isSignedIn) {
    return null
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold mb-2">Contacts</h1>
        <p className="text-muted-foreground mb-6">Manage and view all your leads</p>

        <div className="bg-card rounded-lg border shadow-sm">
          <div className="p-6 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="divide-y">
            <div className="grid grid-cols-[auto,1fr,1fr,1fr,auto,auto,auto] gap-4 p-4 text-sm font-medium text-muted-foreground bg-muted/50">
              <div></div>
              <div>Name</div>
              <div>Phone</div>
              <div>Email</div>
              <div>Created</div>
              <div>Last Activity</div>
              <div>Tags</div>
            </div>

            {loading ? (
              <div className="p-8 text-center text-muted-foreground">
                Loading contacts...
              </div>
            ) : leads.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No contacts found
              </div>
            ) : (
              leads.map((lead, index) => {
                const fullName = `${lead.first_name} ${lead.last_name}`.trim()
                const lastActivity = lead.last_local_call_time
                  ? new Date(lead.last_local_call_time).toLocaleString()
                  : 'Never'
                const created = lead.entry_date
                  ? new Date(lead.entry_date).toLocaleDateString()
                  : 'N/A'

                return (
                  <div
                    key={lead.lead_id}
                    className="grid grid-cols-[auto,1fr,1fr,1fr,auto,auto,auto] gap-4 p-4 items-center hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => router.push(`/contacts/${lead.lead_id}`)}
                  >
                    <div className={`w-10 h-10 rounded-full ${getAvatarColor(index)} flex items-center justify-center text-white font-medium`}>
                      {getInitials(fullName || 'NA')}
                    </div>
                    <div>
                      <div className="font-medium">{fullName || 'No Name'}</div>
                      <div className="text-sm text-muted-foreground">
                        {lead.city && lead.state ? `${lead.city}, ${lead.state}` : 'No location'}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{lead.phone_number}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{lead.email || 'No email'}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{created}</div>
                    <div className="text-sm text-muted-foreground">{lastActivity}</div>
                    <div className="flex gap-1">
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                        {lead.status}
                      </span>
                      {lead.called_count > 0 && (
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-500">
                          {lead.called_count} calls
                        </span>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {!loading && leads.length > 0 && (
            <div className="p-4 border-t bg-muted/30 text-sm text-muted-foreground">
              Total Leads: <span className="font-medium text-foreground">{leads.length}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ContactsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <ContactsContent />
    </Suspense>
  )
}
