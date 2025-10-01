"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Bookmark, Copy, Maximize2, ZoomIn, ZoomOut } from "lucide-react"

interface ScriptPanelProps {
  leadId: string
  customerData: {
    firstName: string
    lastName: string
    company: string
    amount: string
    city: string
    phone: string
    email: string
  }
}

interface ScriptStep {
  id: string
  title: string
  content: string
  done: boolean
}

export function ScriptPanel({ leadId, customerData }: ScriptPanelProps) {
  const [scriptVariant, setScriptVariant] = useState("A")
  const [fontSize, setFontSize] = useState(14)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [scriptRead, setScriptRead] = useState(false)
  const [steps, setSteps] = useState<ScriptStep[]>([
    {
      id: "step-1",
      title: "Step 1: Introduction",
      content: `Hi {{first_name}}, this is [Your Name] from {{company}}. How are you doing today?\n\nI'm reaching out because I noticed your company is based in {{city}}, and we've been helping businesses like yours increase their revenue by an average of {{amount}}.`,
      done: false,
    },
    {
      id: "step-2",
      title: "Step 2: Value Proposition",
      content: `{{first_name}}, I wanted to share how we've helped similar companies in {{city}} achieve their goals. Our solution is specifically designed for businesses like {{company}}.\n\nWould you be interested in learning more about how we can help you reach {{amount}} in additional revenue?`,
      done: false,
    },
    {
      id: "step-3",
      title: "Step 3: Discovery Questions",
      content: `Great! Let me ask you a few quick questions:\n\n1. What are your current challenges with [relevant topic]?\n2. How are you currently handling [specific process]?\n3. What would success look like for {{company}} in the next 6 months?`,
      done: false,
    },
    {
      id: "objection-a",
      title: "Objection A: Price Concern",
      content: `I understand budget is always a consideration, {{first_name}}. Let me put this in perspective:\n\nOur clients typically see ROI within 3 months, and the average return is {{amount}}. When you compare that to the investment, it becomes clear why companies like {{company}} choose to move forward.`,
      done: false,
    },
    {
      id: "objection-b",
      title: "Objection B: Need to Think",
      content: `{{first_name}}, I completely understand wanting to think it over. That's a smart approach.\n\nWhat specific aspects would you like to consider? I'm happy to provide any additional information about how this would work for {{company}} in {{city}}.`,
      done: false,
    },
    {
      id: "step-4",
      title: "Step 4: Close",
      content: `Based on what you've shared, {{first_name}}, I think we can definitely help {{company}} achieve your goals.\n\nI'd like to schedule a demo for you. I have availability this week - would Tuesday or Thursday work better for you?\n\nYou can reach me at {{phone}} or {{email}} if you have any questions.`,
      done: false,
    },
  ])

  // Replace merge fields with actual data
  const replaceMergeFields = (text: string): string => {
    return text
      .replace(/\{\{first_name\}\}/g, customerData.firstName)
      .replace(/\{\{last_name\}\}/g, customerData.lastName)
      .replace(/\{\{company\}\}/g, customerData.company)
      .replace(/\{\{amount\}\}/g, customerData.amount)
      .replace(/\{\{city\}\}/g, customerData.city)
      .replace(/\{\{phone\}\}/g, customerData.phone)
      .replace(/\{\{email\}\}/g, customerData.email)
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if not typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      if (e.key === "s" || e.key === "S") {
        e.preventDefault()
        document.getElementById("script-panel")?.scrollIntoView({ behavior: "smooth" })
      } else if (e.key === "n" || e.key === "N") {
        e.preventDefault()
        handleNextStep()
      } else if (e.key === "p" || e.key === "P") {
        e.preventDefault()
        handlePreviousStep()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [currentStepIndex, steps])

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const handleStepDone = (stepId: string, done: boolean) => {
    setSteps(steps.map((step) => (step.id === stepId ? { ...step, done } : step)))
    // In real app: POST /agent/script/progress
    console.log("[v0] Script progress:", { leadId, stepId, done })
  }

  const handleCopyAll = () => {
    const allText = steps.map((step) => `${step.title}\n${replaceMergeFields(step.content)}`).join("\n\n---\n\n")
    navigator.clipboard.writeText(allText)
    console.log("[v0] Copied all script content")
  }

  const handlePopOut = () => {
    // In real app: open in new window
    console.log("[v0] Pop-out script window")
    alert("Pop-out feature would open script in a floating window")
  }

  const handleBookmark = () => {
    // In real app: save bookmark to server
    console.log("[v0] Bookmarked step:", currentStepIndex, "for lead:", leadId)
    alert(`Bookmarked: ${steps[currentStepIndex].title}`)
  }

  const currentStep = steps[currentStepIndex]

  return (
    <Card
      id="script-panel"
      className="backdrop-blur-md bg-black/60 border border-yellow-500/20 rounded-2xl p-4 md:p-6 mt-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg md:text-xl font-semibold text-white">Script</h3>
        <div className="flex items-center gap-2">
          {/* Version Dropdown */}
          <Select value={scriptVariant} onValueChange={setScriptVariant}>
            <SelectTrigger className="w-[100px] bg-black/40 border-yellow-500/30 text-white text-sm">
              <SelectValue placeholder="Version" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-yellow-500/30">
              <SelectItem value="A" className="text-white">
                Script A
              </SelectItem>
              <SelectItem value="B" className="text-white">
                Script B
              </SelectItem>
              <SelectItem value="C" className="text-white">
                Script C
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Font Size Controls */}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setFontSize(Math.max(12, fontSize - 2))}
            className="text-yellow-400/80 hover:text-yellow-400 hover:bg-yellow-500/20"
            title="Decrease font size"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setFontSize(Math.min(20, fontSize + 2))}
            className="text-yellow-400/80 hover:text-yellow-400 hover:bg-yellow-500/20"
            title="Increase font size"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>

          {/* Pop-out */}
          <Button
            size="sm"
            variant="ghost"
            onClick={handlePopOut}
            className="text-yellow-400/80 hover:text-yellow-400 hover:bg-yellow-500/20"
            title="Pop-out script"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>

          {/* Copy All */}
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopyAll}
            className="text-yellow-400/80 hover:text-yellow-400 hover:bg-yellow-500/20"
            title="Copy all script content"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Script Body - Fixed height with scroll */}
      <div
        className="bg-black/40 border border-yellow-500/30 rounded-xl p-4 mb-4 overflow-y-auto"
        style={{ height: "380px", fontSize: `${fontSize}px` }}
      >
        {/* Step Title */}
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-yellow-400 font-semibold">{currentStep.title}</h4>
          <div className="flex items-center gap-2">
            <Checkbox
              id={`step-done-${currentStep.id}`}
              checked={currentStep.done}
              onCheckedChange={(checked) => handleStepDone(currentStep.id, checked as boolean)}
              className="border-yellow-500/50 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
            />
            <label htmlFor={`step-done-${currentStep.id}`} className="text-white/70 text-sm cursor-pointer">
              Mark Done
            </label>
          </div>
        </div>

        {/* Step Content with merge fields replaced */}
        <div className="text-white/90 whitespace-pre-wrap leading-relaxed">
          {replaceMergeFields(currentStep.content)}
        </div>

        {/* Progress Indicator */}
        <div className="mt-4 pt-4 border-t border-yellow-500/20">
          <div className="flex items-center justify-between text-sm text-white/60">
            <span>
              Step {currentStepIndex + 1} of {steps.length}
            </span>
            <span>
              {steps.filter((s) => s.done).length} / {steps.length} completed
            </span>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handlePreviousStep}
            disabled={currentStepIndex === 0}
            className="bg-black/40 border border-yellow-500/30 text-white hover:bg-yellow-500/20 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            size="sm"
            onClick={handleNextStep}
            disabled={currentStepIndex === steps.length - 1}
            className="bg-black/40 border border-yellow-500/30 text-white hover:bg-yellow-500/20 disabled:opacity-50"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleBookmark}
            className="text-yellow-400/80 hover:text-yellow-400 hover:bg-yellow-500/20"
            title="Bookmark current step"
          >
            <Bookmark className="h-4 w-4 mr-1" />
            Bookmark
          </Button>

          <div className="flex items-center gap-2">
            <Checkbox
              id="script-read"
              checked={scriptRead}
              onCheckedChange={(checked) => {
                setScriptRead(checked as boolean)
                console.log("[v0] Script read status:", checked)
              }}
              className="border-yellow-500/50 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
            />
            <label htmlFor="script-read" className="text-white/70 text-sm cursor-pointer">
              Mark Script Read
            </label>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="mt-3 pt-3 border-t border-yellow-500/20 text-xs text-white/50 text-center">
        Shortcuts: <kbd className="px-1 py-0.5 bg-black/40 rounded">S</kbd> focus script,{" "}
        <kbd className="px-1 py-0.5 bg-black/40 rounded">N</kbd> next step,{" "}
        <kbd className="px-1 py-0.5 bg-black/40 rounded">P</kbd> previous step
      </div>
    </Card>
  )
}
