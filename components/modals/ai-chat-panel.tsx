"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Send, Bot } from "lucide-react"

interface AIChatPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function AIChatPanel({ isOpen, onClose }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; content: string }>>([
    { role: "ai", content: "Hello! I'm your AI assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState("")

  if (!isOpen) return null

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages([...messages, { role: "user", content: input }])
    setInput("")

    // Mock AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "I'm processing your request. This is a placeholder response." },
      ])
    }, 1000)
  }

  return (
    <div className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-black border-l border-yellow-500/30 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-yellow-500/20">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-yellow-400" />
          <h2 className="text-lg font-bold text-white">AI Assistant</h2>
        </div>
        <Button onClick={onClose} variant="ghost" size="sm" className="text-white/60 hover:text-white">
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl p-3 ${
                message.role === "user"
                  ? "bg-yellow-500 text-black"
                  : "bg-black/60 border border-yellow-500/30 text-white"
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t border-yellow-500/20">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-black/40 border-yellow-500/30 text-white placeholder:text-white/40"
          />
          <Button type="submit" size="icon" className="bg-yellow-500 hover:bg-yellow-600 text-black">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
