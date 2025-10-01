"use client"

import Link from "next/link"
import { Phone, ArrowLeft, MessageCircle, Mail, BookOpen, Search, HelpCircle, Zap, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const faqs = [
  {
    question: "How do I connect my CRM to Aeon Ops?",
    answer:
      "Navigate to Settings > Integrations and select your CRM platform (GoHighLevel, HubSpot, or Salesforce). Follow the authentication flow to grant access, and your leads will automatically sync within minutes.",
  },
  {
    question: "What browsers are supported for WebRTC calling?",
    answer:
      "We support the latest versions of Chrome, Firefox, Edge, and Safari. For the best experience, we recommend using Chrome or Edge with a stable internet connection of at least 1 Mbps.",
  },
  {
    question: "How does TCPA compliance work?",
    answer:
      "Our platform includes built-in DNC scrubbing, call recording consent management, and automatic compliance logging. All calls are timestamped and recorded according to federal regulations.",
  },
  {
    question: "Can I use my existing phone numbers?",
    answer:
      "Yes! You can port your existing numbers or purchase new ones through our integrated providers like Twilio and DID For Sale. Number porting typically takes 7-10 business days.",
  },
  {
    question: "What happens if my internet connection drops during a call?",
    answer:
      "Our system automatically attempts to reconnect within 5 seconds. If reconnection fails, the call is logged with the disconnection reason, and you can call back the lead with one click.",
  },
  {
    question: "How do I add new team members?",
    answer:
      "Go to Settings > Team Management and click 'Invite Agent'. Enter their email address and assign permissions. They'll receive an invitation to create their account and start making calls.",
  },
]

const supportChannels = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help via email within 24 hours",
    action: "dcruz@snrglabs.com",
    link: "mailto:dcruz@snrglabs.com",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak with our team directly",
    action: "480-364-8205",
    link: "tel:480-364-8205",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with support in real-time",
    action: "Start Chat",
    link: "#",
  },
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Browse guides and tutorials",
    action: "View Docs",
    link: "/documentation",
  },
]

export default function SupportPage() {
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
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance mb-6">How Can We Help?</h1>
          <p className="text-xl text-muted-foreground text-balance leading-relaxed mb-8">
            Get answers to your questions and support when you need it
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for help articles, guides, and FAQs..."
                className="pl-12 h-14 text-lg bg-card border-border"
              />
            </div>
          </div>
        </div>

        {/* Support Channels */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Get Support</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel) => {
              const Icon = channel.icon
              return (
                <Link
                  key={channel.title}
                  href={channel.link}
                  className="group rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-all hover:shadow-lg"
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{channel.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{channel.description}</p>
                  <span className="text-sm text-primary font-medium group-hover:underline">{channel.action}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-xl border border-border bg-card p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <HelpCircle className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Getting Started Guide</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Learn how to set up your account and make your first call
              </p>
              <Link href="/documentation" className="text-sm text-primary hover:underline">
                Read Guide
              </Link>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">TCPA Compliance</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Understand compliance requirements and best practices
              </p>
              <Link href="/tcpa" className="text-sm text-primary hover:underline">
                Learn More
              </Link>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">System Status</h3>
              <p className="text-sm text-muted-foreground mb-4">Check current system status and uptime</p>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm text-green-600 dark:text-green-400">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-muted-foreground mb-6">
              Our support team is available Monday - Friday, 9:00 AM - 6:00 PM MST
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Contact Support
                </Button>
              </Link>
              <Link href="tel:480-364-8205">
                <Button size="lg" variant="outline">
                  Call 480-364-8205
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
