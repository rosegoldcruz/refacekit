"use client"

import { Suspense, useEffect, useState } from 'react'
import { useVicidialAgent } from '@/hooks/use-vicidial-agent'
import { getContacts, getRealtimeStats } from '@/lib/vicidial-api'
import { CRMDashboard } from "@/components/crm-dashboard"
import { toast } from 'sonner'

// Prevent static generation since we use real-time data
export const dynamic = 'force-dynamic'

function DashboardContent() {
  // TODO: Get agent user from Clerk auth
  const [agentUser] = useState('agent001')
  const [contacts, setContacts] = useState([])
  const [realtimeStats, setRealtimeStats] = useState(null)

  const vicidialAgent = useVicidialAgent({
    agentUser,
    pollingInterval: 2000,
    autoStart: true
  })

  // Load contacts when campaign changes
  useEffect(() => {
    const loadContacts = async () => {
      const campaignId = vicidialAgent.agentStatus?.campaign_id
      const data = await getContacts(campaignId, 50)
      setContacts(data)
    }
    loadContacts()
  }, [vicidialAgent.agentStatus?.campaign_id])

  // Load real-time stats every 5 seconds
  useEffect(() => {
    const loadStats = async () => {
      const stats = await getRealtimeStats()
      setRealtimeStats(stats)
    }
    
    loadStats()
    const interval = setInterval(loadStats, 5000)
    return () => clearInterval(interval)
  }, [])

  // Show notifications for call events
  useEffect(() => {
    if (vicidialAgent.isQueue) {
      toast.info('📞 Incoming call...', { duration: 2000 })
    }
    if (vicidialAgent.isInCall && vicidialAgent.currentCall) {
      const call = vicidialAgent.currentCall
      toast.success(`✅ Connected: ${call.first_name} ${call.last_name}`)
    }
  }, [vicidialAgent.isQueue, vicidialAgent.isInCall, vicidialAgent.currentCall])

  return (
    <CRMDashboard 
      agentUser={agentUser}
      vicidialAgent={vicidialAgent}
      contacts={contacts}
      realtimeStats={realtimeStats}
    />
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  )
}
