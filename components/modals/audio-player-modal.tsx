"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { X, Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"

interface AudioPlayerModalProps {
  isOpen: boolean
  onClose: () => void
  recordingFile?: string
}

export function AudioPlayerModal({ isOpen, onClose, recordingFile = "" }: AudioPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(180) // Mock duration
  const audioRef = useRef<HTMLAudioElement>(null)

  if (!isOpen) return null

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    // TODO: Wire to actual audio element
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseInt(e.target.value)
    setCurrentTime(newTime)
    // TODO: Update audio element currentTime
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-black border border-yellow-500/30 rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Audio Player</h2>
          <Button onClick={onClose} variant="ghost" size="sm" className="text-white/60 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="bg-black/40 border border-yellow-500/30 rounded-xl p-4">
            <p className="text-yellow-400/70 text-sm mb-2">Recording File</p>
            <p className="text-white font-mono text-sm">{recordingFile || "No file selected"}</p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-yellow-500"
            />
            <div className="flex justify-between text-xs text-yellow-400/60">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              size="sm"
              variant="ghost"
              className="text-yellow-400/80 hover:text-yellow-400 hover:bg-yellow-500/20"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              onClick={togglePlay}
              size="lg"
              className="rounded-full bg-yellow-500 hover:bg-yellow-600 text-black w-14 h-14"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-yellow-400/80 hover:text-yellow-400 hover:bg-yellow-500/20"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3">
            <Volume2 className="h-4 w-4 text-yellow-400/60" />
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="70"
              className="flex-1 h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-yellow-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
