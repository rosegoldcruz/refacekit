"use client"

import Link from "next/link"
import { Phone, ArrowLeft, BookOpen, FileText, Rocket, Settings, Code, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const docCategories = [
  {
    title: "Getting Started",
    icon: Rocket,
    docs: [
      "Quick Start Guide",
      "Installation & Setup",
      "First Time Configuration",
      "Understanding the Dashboard",
      "Making Your First Call",
    ],
  },
  {
    title: "Integrations",
    icon: Zap,
    docs: [
      "GoHighLevel Integration",
      "VICIdial Setup",
      "Twilio Configuration",
      "HubSpot Connection",
      "Salesforce Integration",
      "Custom API Integration",
    ],
  },
  {
    title: "Features",
    icon: Settings,
    docs: [
      "WebRTC Browser Calling",
      "Automatic Lead Sync",
      "Call Recording & Playback",
      "Real-Time Analytics",
      "Custom Dispositions",
      "Callback Scheduling",
      "Team Management",
    ],
  },
  {
    title: "API Reference",
    icon: Code,
    docs: ["Authentication", "REST API Endpoints", "Webhooks", "Rate Limits", "Error Handling", "SDK Libraries"],
  },
  {
    title: "Compliance",
    icon: FileText,
    docs: [
      "TCPA Compliance Guide",
      "DNC List Management",
      "Call Recording Laws",
      "Data Privacy & Security",
      "GDPR Compliance",
    ],
  },
  {
    title: "Troubleshooting",
    icon: BookOpen,
    docs: [
      "Common Issues & Solutions",
      "Audio Quality Problems",
      "Connection Errors",
      "Integration Sync Issues",
      "Browser Compatibility",
    ],
  },
]

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Phone className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Aeon Ops</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 md:px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Documentation</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance mb-6">
            Everything You Need to Know
          </h1>
          <p className="text-xl text-muted-foreground text-balance leading-relaxed">
            Comprehensive guides, API references, and tutorials to help you get the most out of Aeon Ops
          </p>
        </div>

        {/* Coming Soon Notice */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-8 md:p-12 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Documentation Coming Soon</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're currently working on comprehensive documentation to help you get started quickly and make the most
              of our platform. Check back soon for detailed guides, tutorials, and API references.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Contact Support
                </Button>
              </Link>
              <Link href="/support">
                <Button size="lg" variant="outline">
                  Visit Support Center
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Documentation Categories Preview */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What's Coming</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {docCategories.map((category) => {
              const Icon = category.icon
              return (
                <div
                  key={category.title}
                  className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">{category.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.docs.map((doc) => (
                      <li key={doc} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Start Preview */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold mb-6">Quick Start Preview</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Connect Your CRM</h3>
                  <p className="text-muted-foreground">
                    Link your GoHighLevel, HubSpot, or Salesforce account to automatically sync leads
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Configure Your Dialer</h3>
                  <p className="text-muted-foreground">
                    Set up VICIdial, Twilio, or your preferred dialing platform integration
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Add Your Team</h3>
                  <p className="text-muted-foreground">
                    Invite agents, set permissions, and configure call routing rules
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Start Calling</h3>
                  <p className="text-muted-foreground">
                    Launch the browser-based dialer and start connecting with leads immediately
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help Right Away?</h2>
          <p className="text-muted-foreground mb-6">
            While we're building out our documentation, our support team is here to help you with any questions
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                Try Demo Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
