"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, ArrowLeft, Sparkles, Zap, Database, Cloud, Code, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const integrations = [
  {
    name: "GoHighLevel",
    logo: "/images/highlevel-logo.png",
    category: "CRM & Marketing",
    description: "All-in-one marketing and CRM platform for agencies",
    size: "large",
    icon: Sparkles,
  },
  {
    name: "Asterisk",
    logo: "/images/asterisk-logo.png",
    category: "VoIP Infrastructure",
    description: "Open-source communications framework",
    size: "medium",
    icon: Phone,
  },
  {
    name: "Twilio",
    logo: "/images/twilio-logo.png",
    category: "Communications API",
    description: "Cloud communications platform for voice, SMS, and video",
    size: "large",
    icon: MessageSquare,
  },
  {
    name: "OpenAI",
    logo: "/images/openai-logo.png",
    category: "AI & Machine Learning",
    description: "Advanced AI models for natural language processing",
    size: "medium",
    icon: Sparkles,
  },
  {
    name: "Anthropic",
    logo: "/images/anthropic-logo.png",
    category: "AI & Machine Learning",
    description: "Claude AI for safe and reliable AI assistance",
    size: "medium",
    icon: Sparkles,
  },
  {
    name: "LiveKit",
    logo: "/images/livekit-logo.png",
    category: "Real-Time Communications",
    description: "WebRTC infrastructure for video and audio",
    size: "medium",
    icon: Phone,
  },
  {
    name: "Vercel",
    logo: "/images/vercel-logo.png",
    category: "Hosting & Deployment",
    description: "Platform for frontend frameworks and static sites",
    size: "small",
    icon: Cloud,
  },
  {
    name: "DigitalOcean",
    logo: "/images/digitalocean-logo.png",
    category: "Cloud Infrastructure",
    description: "Cloud computing platform for developers",
    size: "small",
    icon: Cloud,
  },
  {
    name: "MariaDB & MySQL",
    logo: "/images/mariadb-mysql-logo.png",
    category: "Database",
    description: "Relational database management systems",
    size: "medium",
    icon: Database,
  },
  {
    name: "Python",
    logo: "/images/python-logo.png",
    category: "Programming Language",
    description: "Versatile programming language for backend development",
    size: "small",
    icon: Code,
  },
  {
    name: "Next.js",
    logo: "/images/nextjs-logo.png",
    category: "Web Framework",
    description: "React framework for production-grade applications",
    size: "small",
    icon: Code,
  },
  {
    name: "Clerk",
    logo: "/images/clerk-logo.png",
    category: "Authentication",
    description: "Complete user management and authentication",
    size: "small",
    icon: Zap,
  },
  {
    name: "DID For Sale",
    logo: "/images/didforsale-logo.png",
    category: "Phone Numbers",
    description: "VoIP phone number provider",
    size: "medium",
    icon: Phone,
  },
  {
    name: "RefaceKit",
    logo: "/images/refacekit-logo.png",
    category: "Cabinet Refacing",
    description: "DIY cabinet refacing solutions",
    size: "small",
    icon: Zap,
  },
  {
    name: "VIP Cabinets",
    logo: "/images/vip-cabinets-logo.png",
    category: "Premium Cabinets",
    description: "High-end cabinet manufacturing",
    size: "small",
    icon: Sparkles,
  },
]

export default function IntegrationsPage() {
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
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Our Tech Stack</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance mb-6">
            Powered by Industry-Leading Technologies
          </h1>
          <p className="text-xl text-muted-foreground text-balance leading-relaxed">
            We integrate the best tools and platforms to deliver a seamless, scalable, and powerful call center solution
          </p>
        </div>

        {/* Bento Grid - Dynamic Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {integrations.map((integration, index) => {
            const Icon = integration.icon
            const sizeClasses = {
              large: "md:col-span-2 md:row-span-2",
              medium: "md:col-span-2",
              small: "md:col-span-1",
            }

            return (
              <div
                key={integration.name}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 ${sizeClasses[integration.size as keyof typeof sizeClasses]}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative p-6 h-full flex flex-col">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="text-xs">
                      {integration.category}
                    </Badge>
                    <Icon className="h-5 w-5 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Logo */}
                  <div className="flex-1 flex items-center justify-center my-6">
                    <div className="relative w-full h-24 flex items-center justify-center">
                      <Image
                        src={integration.logo || "/placeholder.svg"}
                        alt={integration.name}
                        width={200}
                        height={96}
                        className="object-contain max-h-24 w-auto transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-auto">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {integration.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{integration.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Categories Overview */}
        <div className="mt-20 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Technology Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">AI & Automation</h3>
              <p className="text-sm text-muted-foreground">
                OpenAI and Anthropic power our intelligent call routing and conversation analysis
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Communications</h3>
              <p className="text-sm text-muted-foreground">
                Twilio, Asterisk, and LiveKit provide robust voice and video infrastructure
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Data & Storage</h3>
              <p className="text-sm text-muted-foreground">
                MariaDB and MySQL ensure reliable data management and storage
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Cloud className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Infrastructure</h3>
              <p className="text-sm text-muted-foreground">
                Vercel and DigitalOcean provide scalable hosting and deployment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/40 bg-card/30 py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance mb-6">
              Ready to Experience Our Platform?
            </h2>
            <p className="text-lg text-muted-foreground text-balance mb-8">
              See how our integrated tech stack delivers a seamless call center experience
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/pricing">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  View Pricing
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline">
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
