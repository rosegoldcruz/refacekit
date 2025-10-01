/**
 * React Hook for VICIdial Agent Integration
 * Provides real-time agent status and call monitoring
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  getAgentStatus,
  setAgentStatus,
  getCurrentCall,
  submitDisposition,
  getCampaigns,
  getCampaignStats,
  type AgentStatus,
  type CurrentCall,
  type Campaign,
  type CampaignStats
} from '@/lib/vicidial-api'

export interface UseVicidialAgentOptions {
  agentUser: string
  pollingInterval?: number // milliseconds, default 2000
  autoStart?: boolean // start polling on mount, default true
}

export function useVicidialAgent(options: UseVicidialAgentOptions) {
  const { agentUser, pollingInterval = 2000, autoStart = true } = options
  
  const [agentStatus, setAgentStatusState] = useState<AgentStatus | null>(null)
  const [currentCall, setCurrentCall] = useState<CurrentCall | null>(null)
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null)
  const [campaignStats, setCampaignStats] = useState<CampaignStats | null>(null)
  const [isPolling, setIsPolling] = useState(autoStart)
  const [error, setError] = useState<string | null>(null)
  
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null)

  /**
   * Fetch agent status
   */
  const fetchAgentStatus = useCallback(async () => {
    try {
      const status = await getAgentStatus(agentUser)
      setAgentStatusState(status)
      setError(null)
      return status
    } catch (err) {
      setError('Failed to fetch agent status')
      console.error(err)
      return null
    }
  }, [agentUser])

  /**
   * Fetch current call
   */
  const fetchCurrentCall = useCallback(async () => {
    try {
      const call = await getCurrentCall(agentUser)
      setCurrentCall(call)
      setError(null)
      return call
    } catch (err) {
      setError('Failed to fetch current call')
      console.error(err)
      return null
    }
  }, [agentUser])

  /**
   * Fetch campaigns
   */
  const fetchCampaigns = useCallback(async () => {
    try {
      const camps = await getCampaigns()
      setCampaigns(camps)
      setError(null)
      return camps
    } catch (err) {
      setError('Failed to fetch campaigns')
      console.error(err)
      return []
    }
  }, [])

  /**
   * Fetch campaign stats
   */
  const fetchCampaignStats = useCallback(async (campaignId: string) => {
    try {
      const stats = await getCampaignStats(campaignId)
      setCampaignStats(stats)
      setError(null)
      return stats
    } catch (err) {
      setError('Failed to fetch campaign stats')
      console.error(err)
      return null
    }
  }, [])

  /**
   * Set agent to READY (start receiving calls)
   */
  const goReady = useCallback(async (campaignId: string) => {
    try {
      const success = await setAgentStatus(agentUser, 'READY', campaignId)
      if (success) {
        setSelectedCampaign(campaignId)
        await fetchAgentStatus()
        setError(null)
      }
      return success
    } catch (err) {
      setError('Failed to set agent ready')
      console.error(err)
      return false
    }
  }, [agentUser, fetchAgentStatus])

  /**
   * Set agent to PAUSED (stop receiving calls)
   */
  const goPaused = useCallback(async () => {
    try {
      const success = await setAgentStatus(agentUser, 'PAUSED')
      if (success) {
        await fetchAgentStatus()
        setError(null)
      }
      return success
    } catch (err) {
      setError('Failed to pause agent')
      console.error(err)
      return false
    }
  }, [agentUser, fetchAgentStatus])

  /**
   * Submit disposition after call
   */
  const disposition = useCallback(async (
    leadId: number,
    status: string,
    notes?: string
  ) => {
    try {
      const success = await submitDisposition(leadId, agentUser, status, notes)
      if (success) {
        // Clear current call after disposition
        setCurrentCall(null)
        await fetchAgentStatus()
        setError(null)
      }
      return success
    } catch (err) {
      setError('Failed to submit disposition')
      console.error(err)
      return false
    }
  }, [agentUser, fetchAgentStatus])

  /**
   * Start polling for updates
   */
  const startPolling = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current)
    }
    
    setIsPolling(true)
    
    pollIntervalRef.current = setInterval(async () => {
      await fetchAgentStatus()
      await fetchCurrentCall()
      
      // Update campaign stats if campaign is selected
      if (selectedCampaign) {
        await fetchCampaignStats(selectedCampaign)
      }
    }, pollingInterval)
  }, [fetchAgentStatus, fetchCurrentCall, fetchCampaignStats, selectedCampaign, pollingInterval])

  /**
   * Stop polling
   */
  const stopPolling = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current)
      pollIntervalRef.current = null
    }
    setIsPolling(false)
  }, [])

  /**
   * Auto-start polling on mount
   */
  useEffect(() => {
    if (autoStart) {
      startPolling()
    }

    // Cleanup on unmount
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
      }
    }
  }, [autoStart, startPolling])

  /**
   * Load campaigns on mount
   */
  useEffect(() => {
    fetchCampaigns()
  }, [fetchCampaigns])

  /**
   * Derived state
   */
  const isReady = agentStatus?.status === 'READY'
  const isPaused = agentStatus?.status === 'PAUSED'
  const isInCall = agentStatus?.status === 'INCALL'
  const isQueue = agentStatus?.status === 'QUEUE'

  return {
    // State
    agentStatus,
    currentCall,
    campaigns,
    selectedCampaign,
    campaignStats,
    isPolling,
    error,
    
    // Derived state
    isReady,
    isPaused,
    isInCall,
    isQueue,
    
    // Actions
    goReady,
    goPaused,
    disposition,
    
    // Manual fetching
    fetchAgentStatus,
    fetchCurrentCall,
    fetchCampaigns,
    fetchCampaignStats,
    
    // Polling control
    startPolling,
    stopPolling,
  }
}
