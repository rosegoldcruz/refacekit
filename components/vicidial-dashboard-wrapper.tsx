/**
 * VICIdial Dashboard Wrapper
 * Wraps the existing CRM dashboard with VICIdial auto-dial functionality
 */

"use client"

import { useEffect } from 'react'
import { useVicidialAgent } from '@/hooks/use-vicidial-agent'
import { CRMDashboard } from './crm-dashboard'
import { toast } from 'sonner'

interface VicidialDashboardWrapperProps {
  agentUser: string // Get this from auth/session
}

export function VicidialDashboardWrapper({ agentUser }: VicidialDashboardWrapperProps) {
  const {
    agentStatus,
    currentCall,
    campaigns,
    isReady,
    isPaused,
    isInCall,
    isQueue,
    error
  } = useVicidialAgent({
    agentUser,
    pollingInterval: 2000, // Poll every 2 seconds
    autoStart: true
  })

  /**
   * Monitor call state changes
   */
  useEffect(() => {
    if (isQueue) {
      toast.info('📞 Incoming call...', {
        description: 'Call is ringing'
      })
    }
    
    if (isInCall && currentCall) {
      toast.success('✅ Call connected!', {
        description: `${currentCall.first_name} ${currentCall.last_name} - ${currentCall.phone_number}`
      })
    }
  }, [isQueue, isInCall, currentCall])

  /**
   * Monitor errors
   */
  useEffect(() => {
    if (error) {
      toast.error('VICIdial Error', {
        description: error
      })
    }
  }, [error])

  /**
   * Log status for debugging
   */
  useEffect(() => {
    if (agentStatus) {
      console.log('[VICIdial] Agent Status:', {
        status: agentStatus.status,
        campaign: agentStatus.campaign_id,
        lead_id: agentStatus.lead_id,
        calls_today: agentStatus.calls_today
      })
    }
  }, [agentStatus])

  /**
   * Log current call for debugging
   */
  useEffect(() => {
    if (currentCall) {
      console.log('[VICIdial] Current Call:', {
        lead_id: currentCall.lead_id,
        customer: `${currentCall.first_name} ${currentCall.last_name}`,
        phone: currentCall.phone_number
      })
    }
  }, [currentCall])

  // Pass VICIdial data as props to the dashboard
  // The dashboard will use this data instead of mock data
  return (
    <CRMDashboard 
      vicidialData={{
        agentStatus,
        currentCall,
        campaigns,
        isReady,
        isPaused,
        isInCall,
        isQueue
      }}
    />
  )
}
