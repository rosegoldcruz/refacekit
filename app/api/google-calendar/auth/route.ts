import { NextResponse } from "next/server"

// Google Calendar OAuth configuration
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const REDIRECT_URI = process.env.NEXT_PUBLIC_APP_URL + "/api/google-calendar/callback"

export async function GET() {
  // TODO: Implement Google OAuth flow
  // 1. Generate authorization URL
  // 2. Redirect user to Google consent screen

  const authUrl =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${REDIRECT_URI}&` +
    `response_type=code&` +
    `scope=https://www.googleapis.com/auth/calendar.readonly&` +
    `access_type=offline&` +
    `prompt=consent`

  return NextResponse.json({
    message: "Implement OAuth flow",
    authUrl,
    instructions: [
      "Add GOOGLE_CLIENT_ID to environment variables",
      "Add GOOGLE_CLIENT_SECRET to environment variables",
      "Add NEXT_PUBLIC_APP_URL to environment variables",
      "Implement callback handler at /api/google-calendar/callback",
      "Store access tokens securely (database or session)",
    ],
  })
}
