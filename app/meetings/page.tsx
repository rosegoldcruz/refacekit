"use client"

import { useState } from "react"
import { Calendar, Clock, Video, Users, Plus, RefreshCw, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock data - replace with Google Calendar API
const mockMeetings = [
  {
    id: "1",
    title: "Demo Call - TechCorp",
    start: "2024-01-18T10:00:00",
    end: "2024-01-18T11:00:00",
    attendees: ["sarah.johnson@techcorp.com"],
    location: "Zoom",
    description: "Product demo for enterprise plan",
    status: "upcoming",
  },
  {
    id: "2",
    title: "Follow-up - Innovate Solutions",
    start: "2024-01-18T14:00:00",
    end: "2024-01-18T14:30:00",
    attendees: ["mchen@innovate.io"],
    location: "Google Meet",
    description: "Discuss pricing and implementation timeline",
    status: "upcoming",
  },
  {
    id: "3",
    title: "Discovery Call - GlobalTech",
    start: "2024-01-17T15:00:00",
    end: "2024-01-17T16:00:00",
    attendees: ["emily.r@globaltech.com", "john.doe@globaltech.com"],
    location: "Phone",
    description: "Initial discovery and needs assessment",
    status: "completed",
  },
]

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState(mockMeetings)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Function to connect to Google Calendar
  const connectGoogleCalendar = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement Google Calendar OAuth flow
      // 1. Redirect to Google OAuth consent screen
      // 2. Handle callback with authorization code
      // 3. Exchange code for access token
      // 4. Store token securely
      console.log("[v0] Initiating Google Calendar connection...")

      // For now, simulate connection
      setTimeout(() => {
        setIsConnected(true)
        setIsLoading(false)
        alert("Google Calendar connected! (Demo mode - implement OAuth in production)")
      }, 1500)
    } catch (error) {
      console.error("[v0] Error connecting to Google Calendar:", error)
      setIsLoading(false)
    }
  }

  // Function to fetch meetings from Google Calendar
  const fetchMeetings = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement Google Calendar API call
      // const response = await fetch('/api/google-calendar/events')
      // const data = await response.json()
      // setMeetings(data.events)

      console.log("[v0] Fetching meetings from Google Calendar...")
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("[v0] Error fetching meetings:", error)
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  }

  const upcomingMeetings = meetings.filter((m) => m.status === "upcoming")
  const completedMeetings = meetings.filter((m) => m.status === "completed")

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Meetings
          </h1>
          <p className="text-gray-400">Manage your calendar and upcoming meetings</p>
        </div>
        <div className="flex gap-3">
          {!isConnected ? (
            <Button
              onClick={connectGoogleCalendar}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Calendar className="h-4 w-4 mr-2" />
              {isLoading ? "Connecting..." : "Connect Google Calendar"}
            </Button>
          ) : (
            <>
              <Button
                onClick={fetchMeetings}
                disabled={isLoading}
                variant="outline"
                className="border-white/10 bg-white/5 hover:bg-white/10"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Plus className="h-4 w-4 mr-2" />
                New Meeting
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Google Calendar Setup Instructions */}
      {!isConnected && (
        <div className="mb-8 rounded-xl border border-blue-500/20 bg-blue-500/10 p-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-300">Google Calendar Integration Setup</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>To connect your Google Calendar, you'll need to:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Create a Google Cloud Project and enable the Google Calendar API</li>
              <li>Set up OAuth 2.0 credentials (Client ID and Secret)</li>
              <li>Add authorized redirect URIs to your OAuth consent screen</li>
              <li>Store credentials in environment variables: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET</li>
              <li>Implement the OAuth flow in /api/google-calendar/auth route</li>
            </ol>
            <p className="mt-3 text-blue-300">
              <a
                href="https://developers.google.com/calendar/api/quickstart/nodejs"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-200 inline-flex items-center gap-1"
              >
                View Google Calendar API Documentation
                <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Upcoming Meetings */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-purple-300">Upcoming Meetings</h2>
        <div className="space-y-4">
          {upcomingMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{meeting.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(meeting.start)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {formatTime(meeting.start)} - {formatTime(meeting.end)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      {meeting.location}
                    </div>
                  </div>
                </div>
                <Button size="sm" className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30">
                  Join Meeting
                </Button>
              </div>
              <p className="text-gray-300 mb-3">{meeting.description}</p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Users className="h-4 w-4" />
                <span>Attendees: {meeting.attendees.join(", ")}</span>
              </div>
            </div>
          ))}
          {upcomingMeetings.length === 0 && (
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-12 text-center text-gray-400">
              <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No upcoming meetings scheduled.</p>
            </div>
          )}
        </div>
      </div>

      {/* Completed Meetings */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-300">Recent Meetings</h2>
        <div className="space-y-3">
          {completedMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className="rounded-xl border border-white/5 bg-white/5 backdrop-blur-xl p-4 opacity-75"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white mb-1">{meeting.title}</h3>
                  <div className="flex gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(meeting.start)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTime(meeting.start)}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">Completed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
