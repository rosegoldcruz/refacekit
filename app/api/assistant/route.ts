import { NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    console.log("[v0] Assistant API called")

    const { messages } = await request.json()
    console.log("[v0] Received messages:", messages?.length || 0)

    if (!messages || !Array.isArray(messages)) {
      console.log("[v0] Invalid messages format")
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 })
    }

    console.log("[v0] Calling AI SDK with model: openai/gpt-4o-mini")

    // Convert messages to a single prompt for generateText
    const prompt = messages.map((msg: { role: string; content: string }) => `${msg.role}: ${msg.content}`).join("\n")

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt: prompt,
    })

    console.log("[v0] Got reply from AI:", text?.substring(0, 50) + "...")

    return NextResponse.json({ reply: text })
  } catch (error) {
    console.error("[v0] Error calling AI API:", error)
    console.error("[v0] Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      name: error instanceof Error ? error.name : "Unknown",
      stack: error instanceof Error ? error.stack : "No stack trace",
    })
    return NextResponse.json(
      {
        error: "Failed to get AI response",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
