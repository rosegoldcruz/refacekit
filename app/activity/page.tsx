"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  Clock,
  Pause,
  Timer,
  FileText,
  LogIn,
  TrendingUp,
  Users,
  Calendar,
  PhoneForwarded,
  Target,
  Activity,
  ArrowLeft,
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

export default function ActivityPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type")
  const range = searchParams.get("range")

  // Mock data - replace with actual VICIdial API calls
  const activityMetrics = {
    totalCalls: 47,
    totalTalkTime: "3h 24m",
    totalTalkTimeSec: 12240,
    totalPauseTime: "45m",
    totalPauseTimeSec: 2700,
    totalWaitTime: "1h 12m",
    totalWaitTimeSec: 4320,
    totalWrapUpTime: "38m",
    totalWrapUpTimeSec: 2280,
    loginTime: "8h 15m",
    loginTimeSec: 29700,
    activeCallsToday: 47,
    sales: 8,
    callbacksSet: 12,
    meetingsBooked: 5,
    transferCount: 3,
    averageTalkTime: "4m 20s",
    averageHandleTime: "5m 8s",
    conversionRate: 17.0,
    contactsReached: 42,
    callsPerHour: 5.7,
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/crm-background.png')`,
        }}
      />
      <div className="bg-black/50 fixed inset-0" />

      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-yellow-500/20">
        <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => router.push("/")}
                variant="ghost"
                size="sm"
                className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/20"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <Image
                src="/images/refacekit-logo.png"
                alt="RefaceKit"
                width={150}
                height={45}
                className="h-8 w-auto"
                priority
              />
            </div>
            <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
              {range === "today" ? "Today" : "All Time"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-[1920px] mx-auto px-4 md:px-6 py-6">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Agent Activity Metrics</h1>
          <p className="text-white/60">Comprehensive call center performance dashboard</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="backdrop-blur-md bg-black/60 border border-yellow-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-400/70 text-sm mb-1">Total Calls Made</p>
                <p className="text-4xl font-bold text-white mb-1">{activityMetrics.totalCalls}</p>
                <p className="text-sm text-green-400">Active Today</p>
              </div>
              <Phone className="h-12 w-12 text-green-400" />
            </div>
          </Card>

          <Card className="backdrop-blur-md bg-black/60 border border-yellow-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-400/70 text-sm mb-1">Total Talk Time</p>
                <p className="text-4xl font-bold text-white mb-1">{activityMetrics.totalTalkTime}</p>
                <p className="text-sm text-blue-400">{activityMetrics.totalTalkTimeSec.toLocaleString()} seconds</p>
              </div>
              <Clock className="h-12 w-12 text-blue-400" />
            </div>
          </Card>

          <Card className="backdrop-blur-md bg-black/60 border border-yellow-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-400/70 text-sm mb-1">Login Time</p>
                <p className="text-4xl font-bold text-white mb-1">{activityMetrics.loginTime}</p>
                <p className="text-sm text-purple-400">{activityMetrics.loginTimeSec.toLocaleString()} seconds</p>
              </div>
              <LogIn className="h-12 w-12 text-purple-400" />
            </div>
          </Card>
        </div>

        {/* Time Breakdown Section */}
        <Card className="backdrop-blur-md bg-black/60 border border-yellow-500/20 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Timer className="h-5 w-5 mr-2 text-yellow-400" />
            Time Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-black/40 border border-yellow-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-yellow-400/70 text-sm">Talk Time</p>
                <Clock className="h-5 w-5 text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-white">{activityMetrics.totalTalkTime}</p>
              <p className="text-xs text-white/50 mt-1">{activityMetrics.totalTalkTimeSec.toLocaleString()} sec</p>
            </div>

            <div className="bg-black/40 border border-yellow-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-yellow-400/70 text-sm">Pause Time</p>
                <Pause className="h-5 w-5 text-orange-400" />
              </div>
              <p className="text-2xl font-bold text-white">{activityMetrics.totalPauseTime}</p>
              <p className="text-xs text-white/50 mt-1">{activityMetrics.totalPauseTimeSec.toLocaleString()} sec</p>
            </div>

            <div className="bg-black/40 border border-yellow-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-yellow-400/70 text-sm">Wait Time</p>
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <p className="text-2xl font-bold text-white">{activityMetrics.totalWaitTime}</p>
              <p className="text-xs text-white/50 mt-1">{activityMetrics.totalWaitTimeSec.toLocaleString()} sec</p>
            </div>

            <div className="bg-black/40 border border-yellow-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-yellow-400/70 text-sm">Wrap-Up Time</p>
                <FileText className="h-5 w-5 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white">{activityMetrics.totalWrapUpTime}</p>
              <p className="text-xs text-white/50 mt-1">{activityMetrics.totalWrapUpTimeSec.toLocaleString()} sec</p>
            </div>
          </div>
        </Card>

        {/* Performance Metrics Section */}
        <Card className="backdrop-blur-md bg-black/60 border border-yellow-500/20 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-yellow-400" />
            Performance Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-black/40 border border-yellow-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-yellow-400/70 text-sm">Average Talk Time</p>
                <Activity className="h-5 w-5 text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-white">{activityMetrics.averageTalkTime}</p>
              <p className="text-xs text-white/50 mt-1">Per call</p>
            </div>

            <div className="bg-black/40 border border-yellow-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-yellow-400/70 text-sm">Average Handle Time</p>
                <Timer className="h-5 w-5 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white">{activityMetrics.averageHandleTime}</p>
              <p className="text-xs text-white/50 mt-1">Talk + Dispo</p>
            </div>

            <div className="bg-black/40 border border-yellow-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-yellow-400/70 text-sm">Calls per Hour</p>
                <Phone className="h-5 w-5 text-green-400" />
              </div>
              <p className="text-2xl font-bold text-white">{activityMetrics.callsPerHour}</p>
              <p className="text-xs text-white/50 mt-1">CPH rate</p>
            </div>

            <div className="bg-black/40 border border-yellow-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-yellow-400/70 text-sm">Conversion Rate</p>
                <Target className="h-5 w-5 text-yellow-400" />
              </div>
              <p className="text-2xl font-bold text-white">{formatPercentage(activityMetrics.conversionRate)}</p>
              <p className="text-xs text-white/50 mt-1">Sales / Total Calls</p>
            </div>
          </div>
        </Card>

        {/* Activity Metrics Section */}
        <Card className="backdrop-blur-md bg-black/60 border border-yellow-500/20 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-yellow-400" />
            Activity Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-black/40 border border-yellow-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-yellow-400/70 text-sm">Sales</p>
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <p className="text-3xl font-bold text-white">{activityMetrics.sales}</p>
              <p className="text-xs text-green-400 mt-1">Positive Dispositions</p>
            </div>

            <div className="bg-black/40 border border-yellow-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-yellow-400/70 text-sm">Callbacks Set</p>
                <Phone className="h-5 w-5 text-blue-400" />
              </div>
              <p className="text-3xl font-bold text-white">{activityMetrics.callbacksSet}</p>
              <p className="text-xs text-blue-400 mt-1">Scheduled</p>
            </div>

            <div className="bg-black/40 border border-yellow-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-yellow-400/70 text-sm">Meetings Booked</p>
                <Calendar className="h-5 w-5 text-purple-400" />
              </div>
              <p className="text-3xl font-bold text-white">{activityMetrics.meetingsBooked}</p>
              <p className="text-xs text-purple-400 mt-1">Appointments</p>
            </div>

            <div className="bg-black/40 border border-yellow-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-yellow-400/70 text-sm">Transfers</p>
                <PhoneForwarded className="h-5 w-5 text-orange-400" />
              </div>
              <p className="text-3xl font-bold text-white">{activityMetrics.transferCount}</p>
              <p className="text-xs text-orange-400 mt-1">Call transfers</p>
            </div>

            <div className="bg-black/40 border border-yellow-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-yellow-400/70 text-sm">Contacts Reached</p>
                <Users className="h-5 w-5 text-cyan-400" />
              </div>
              <p className="text-3xl font-bold text-white">{activityMetrics.contactsReached}</p>
              <p className="text-xs text-cyan-400 mt-1">Connected calls</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
