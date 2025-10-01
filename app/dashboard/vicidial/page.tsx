/**
 * VICIdial-Connected Dashboard Page
 * This demonstrates the auto-dial integration
 */

"use client"

import { useEffect, useState } from 'react'
import { useVicidialAgent } from '@/hooks/use-vicidial-agent'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Phone, PhoneOff, Pause, Play } from 'lucide-react'
import { toast } from 'sonner'

export default function VicidialDashboardPage() {
  // In production, get this from auth/Clerk
  const [agentUser] = useState('agent001') // Replace with actual agent user from auth
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>('')

  const {
    agentStatus,
    currentCall,
    campaigns,
    campaignStats,
    isReady,
    isPaused,
    isInCall,
    isQueue,
    goReady,
    goPaused,
    disposition,
    error
  } = useVicidialAgent({
    agentUser,
    pollingInterval: 2000,
    autoStart: true
  })

  /**
   * Handle GO READY button click
   */
  const handleGoReady = async () => {
    if (!selectedCampaignId) {
      toast.error('Please select a campaign first')
      return
    }

    const success = await goReady(selectedCampaignId)
    if (success) {
      toast.success('✅ You are now READY for calls', {
        description: 'Auto-dial is active'
      })
    } else {
      toast.error('Failed to set status to READY')
    }
  }

  /**
   * Handle PAUSE button click
   */
  const handlePause = async () => {
    const success = await goPaused()
    if (success) {
      toast.info('⏸️ You are now PAUSED', {
        description: 'No calls will be sent to you'
      })
    } else {
      toast.error('Failed to pause')
    }
  }

  /**
   * Handle disposition submission
   */
  const handleDisposition = async (dispositionStatus: string) => {
    if (!currentCall) return

    const success = await disposition(
      currentCall.lead_id,
      dispositionStatus,
      'Call completed' // You can add notes from UI
    )

    if (success) {
      toast.success('✅ Disposition submitted', {
        description: `Status: ${dispositionStatus}`
      })
    } else {
      toast.error('Failed to submit disposition')
    }
  }

  /**
   * Monitor call state
   */
  useEffect(() => {
    if (isQueue) {
      toast.info('📞 Call incoming...', { duration: 2000 })
    }
    if (isInCall && currentCall) {
      toast.success(`✅ Connected: ${currentCall.first_name} ${currentCall.last_name}`)
    }
  }, [isQueue, isInCall, currentCall])

  /**
   * Show errors
   */
  useEffect(() => {
    if (error) {
      toast.error('VICIdial Error', { description: error })
    }
  }, [error])

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Agent Dashboard</h1>
            <p className="text-muted-foreground">
              VICIdial Auto-Dialer - Agent: {agentUser}
            </p>
          </div>
          
          {/* Agent Status Badge */}
          <Badge 
            variant={isReady ? 'default' : isPaused ? 'secondary' : 'outline'}
            className="text-lg px-4 py-2"
          >
            {agentStatus?.status || 'OFFLINE'}
          </Badge>
        </div>

        {/* Campaign Selection & Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Controls</CardTitle>
            <CardDescription>Select a campaign and go ready to start receiving calls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Select value={selectedCampaignId} onValueChange={setSelectedCampaignId}>
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Select Campaign" />
                </SelectTrigger>
                <SelectContent>
                  {campaigns.map((campaign) => (
                    <SelectItem key={campaign.campaign_id} value={campaign.campaign_id}>
                      {campaign.campaign_name} ({campaign.dial_method})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                onClick={handleGoReady}
                disabled={isReady || !selectedCampaignId}
                className="bg-green-600 hover:bg-green-700"
              >
                <Play className="mr-2 h-4 w-4" />
                GO READY
              </Button>

              <Button
                onClick={handlePause}
                disabled={isPaused || !isReady}
                variant="outline"
              >
                <Pause className="mr-2 h-4 w-4" />
                PAUSE
              </Button>
            </div>

            {/* Campaign Stats */}
            {campaignStats && (
              <div className="grid grid-cols-4 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Active Agents</p>
                  <p className="text-2xl font-bold">{campaignStats.active_agents}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">In Queue</p>
                  <p className="text-2xl font-bold">{campaignStats.hopper_count}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Calls Today</p>
                  <p className="text-2xl font-bold">{campaignStats.total_calls_today}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sales</p>
                  <p className="text-2xl font-bold">{campaignStats.sales_today}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Current Call Info */}
        {currentCall && isInCall && (
          <Card className="border-green-500 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-green-500 animate-pulse" />
                Active Call
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="text-xl font-bold">
                    {currentCall.first_name} {currentCall.last_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-xl font-bold">{currentCall.phone_number}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="text-sm">
                    {currentCall.address1}, {currentCall.city}, {currentCall.state} {currentCall.postal_code}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-sm">{currentCall.email || 'N/A'}</p>
                </div>
              </div>

              {currentCall.comments && (
                <div>
                  <p className="text-sm text-muted-foreground">Notes</p>
                  <p className="text-sm">{currentCall.comments}</p>
                </div>
              )}

              {/* Disposition Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={() => handleDisposition('SALE')} variant="default">
                  Sale
                </Button>
                <Button onClick={() => handleDisposition('NI')} variant="outline">
                  Not Interested
                </Button>
                <Button onClick={() => handleDisposition('CB')} variant="outline">
                  Callback
                </Button>
                <Button onClick={() => handleDisposition('DNC')} variant="destructive">
                  Do Not Call
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Agent Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Your Stats Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Calls Today</p>
                <p className="text-3xl font-bold">{agentStatus?.calls_today || 0}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Campaign</p>
                <p className="text-lg font-semibold">{agentStatus?.campaign_id || 'None'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Extension</p>
                <p className="text-lg font-semibold">{agentStatus?.extension || 'N/A'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
