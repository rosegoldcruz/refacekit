/**
 * VICIdial API Integration Layer
 * Connects frontend to backend VICIdial endpoints
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8001'

export interface AgentStatus {
  user: string
  status: 'READY' | 'PAUSED' | 'INCALL' | 'QUEUE' | 'CLOSER'
  lead_id: number | null
  campaign_id: string | null
  callerid: string | null
  last_call_time: string | null
  last_call_finish: string | null
  calls_today: number
  extension: string | null
}

export interface LeadInfo {
  lead_id: number
  first_name: string
  last_name: string
  phone_number: string
  alt_phone: string | null
  address1: string | null
  address2: string | null
  city: string | null
  state: string | null
  postal_code: string | null
  email: string | null
  comments: string | null
  status: string
  called_count: number
  last_local_call_time: string | null
}

export interface CurrentCall {
  user: string
  status: string
  lead_id: number
  campaign_id: string
  callerid: string
  last_call_time: string
  first_name: string
  last_name: string
  phone_number: string
  address1: string | null
  address2: string | null
  city: string | null
  state: string | null
  postal_code: string | null
  email: string | null
  comments: string | null
  lead_status: string
}

export interface Campaign {
  campaign_id: string
  campaign_name: string
  dial_method: string
  auto_dial_level: string
  active: string
}

export interface CampaignStats {
  campaign_id: string
  active_agents: number
  hopper_count: number
  total_calls_today: number
  sales_today: number
  total_talk_time: number
}

/**
 * Get current agent status
 */
export async function getAgentStatus(agentUser: string): Promise<AgentStatus | null> {
  try {
    const response = await fetch(`${API_BASE}/agent/${agentUser}/status`)
    const data = await response.json()
    return data.status === 'ok' ? data.data : null
  } catch (error) {
    console.error('[VICIdial API] getAgentStatus error:', error)
    return null
  }
}

/**
 * Set agent status (READY, PAUSED, etc.)
 */
export async function setAgentStatus(
  agentUser: string,
  status: string,
  campaignId?: string
): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/agent/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        agent_user: agentUser,
        status,
        campaign_id: campaignId
      })
    })
    const data = await response.json()
    return data.status === 'ok'
  } catch (error) {
    console.error('[VICIdial API] setAgentStatus error:', error)
    return false
  }
}

/**
 * Get current active call with lead info
 */
export async function getCurrentCall(agentUser: string): Promise<CurrentCall | null> {
  try {
    const response = await fetch(`${API_BASE}/agent/${agentUser}/current-call`)
    const data = await response.json()
    return data.status === 'ok' ? data.data : null
  } catch (error) {
    console.error('[VICIdial API] getCurrentCall error:', error)
    return null
  }
}

/**
 * Get detailed lead information
 */
export async function getLeadInfo(leadId: number): Promise<LeadInfo | null> {
  try {
    const response = await fetch(`${API_BASE}/lead/${leadId}`)
    const data = await response.json()
    return data.status === 'ok' ? data.data : null
  } catch (error) {
    console.error('[VICIdial API] getLeadInfo error:', error)
    return null
  }
}

/**
 * Submit call disposition
 */
export async function submitDisposition(
  leadId: number,
  agentUser: string,
  status: string,
  notes?: string
): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/disposition`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lead_id: leadId,
        agent_user: agentUser,
        status,
        notes
      })
    })
    const data = await response.json()
    return data.status === 'ok'
  } catch (error) {
    console.error('[VICIdial API] submitDisposition error:', error)
    return false
  }
}

/**
 * Get all active campaigns
 */
export async function getCampaigns(): Promise<Campaign[]> {
  try {
    const response = await fetch(`${API_BASE}/campaigns`)
    const data = await response.json()
    return data.status === 'ok' ? data.data : []
  } catch (error) {
    console.error('[VICIdial API] getCampaigns error:', error)
    return []
  }
}

/**
 * Get campaign statistics
 */
export async function getCampaignStats(campaignId: string): Promise<CampaignStats | null> {
  try {
    const response = await fetch(`${API_BASE}/campaigns/${campaignId}/stats`)
    const data = await response.json()
    return data.status === 'ok' ? data.data : null
  } catch (error) {
    console.error('[VICIdial API] getCampaignStats error:', error)
    return null
  }
}

/**
 * Get hopper count for campaign
 */
export async function getHopperCount(campaignId: string): Promise<number> {
  try {
    const response = await fetch(`${API_BASE}/hopper/${campaignId}/count`)
    const data = await response.json()
    return data.status === 'ok' ? data.count : 0
  } catch (error) {
    console.error('[VICIdial API] getHopperCount error:', error)
    return 0
  }
}

/**
 * Polling utility - continuously check for call updates
 */
export function startCallPolling(
  agentUser: string,
  onUpdate: (callData: CurrentCall | null) => void,
  intervalMs: number = 2000
): () => void {
  const pollInterval = setInterval(async () => {
    const callData = await getCurrentCall(agentUser)
    onUpdate(callData)
  }, intervalMs)

  // Return cleanup function
  return () => clearInterval(pollInterval)
}

/**
 * Get recent contacts/leads
 */
export async function getContacts(campaignId?: string, limit: number = 50): Promise<any[]> {
  try {
    const params = new URLSearchParams()
    if (campaignId) params.append('campaign_id', campaignId)
    params.append('limit', limit.toString())
    
    const response = await fetch(`${API_BASE}/contacts?${params}`)
    const data = await response.json()
    return data.status === 'ok' ? data.data : []
  } catch (error) {
    console.error('[VICIdial API] getContacts error:', error)
    return []
  }
}

/**
 * Search contacts
 */
export async function searchContacts(query: string, limit: number = 50): Promise<any[]> {
  try {
    const params = new URLSearchParams({ q: query, limit: limit.toString() })
    const response = await fetch(`${API_BASE}/contacts/search?${params}`)
    const data = await response.json()
    return data.status === 'ok' ? data.data : []
  } catch (error) {
    console.error('[VICIdial API] searchContacts error:', error)
    return []
  }
}

/**
 * Get agent call history
 */
export async function getCallHistory(agentUser: string, limit: number = 50): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE}/agent/${agentUser}/call-history?limit=${limit}`)
    const data = await response.json()
    return data.status === 'ok' ? data.data : []
  } catch (error) {
    console.error('[VICIdial API] getCallHistory error:', error)
    return []
  }
}

/**
 * Get real-time system statistics
 */
export async function getRealtimeStats(): Promise<any> {
  try {
    const response = await fetch(`${API_BASE}/stats/realtime`)
    const data = await response.json()
    return data.status === 'ok' ? data.data : null
  } catch (error) {
    console.error('[VICIdial API] getRealtimeStats error:', error)
    return null
  }
}

/**
 * Place manual dial call through VICIdial
 */
export async function manualDial(
  phoneNumber: string,
  agentUser: string,
  campaignId: string,
  leadId?: number
): Promise<{ success: boolean; message: string; call_id?: string }> {
  try {
    const params = new URLSearchParams({
      phone_number: phoneNumber,
      agent_user: agentUser,
      campaign_id: campaignId,
    })
    
    if (leadId) {
      params.append('lead_id', leadId.toString())
    }

    const response = await fetch(`${API_BASE}/dial/manual?${params.toString()}`, {
      method: 'POST',
    })
    
    const data = await response.json()
    
    if (data.status === 'ok') {
      return {
        success: true,
        message: data.data.message,
        call_id: data.data.call_id
      }
    } else {
      return {
        success: false,
        message: data.data?.message || 'Failed to place call'
      }
    }
  } catch (error) {
    console.error('[VICIdial API] manualDial error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to place call'
    }
  }
}
