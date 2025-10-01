"use client"

import Link from "next/link"
import { Phone, ArrowLeft, Users, Target, Zap, Shield, Award, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
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
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance mb-6">
            Revolutionizing Call Center Technology
          </h1>
          <p className="text-xl text-muted-foreground text-balance leading-relaxed">
            We're building the future of call center operations with seamless integrations, powerful automation, and
            industry-leading technology
          </p>
        </div>

        {/* Mission Statement */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="rounded-2xl border border-border bg-card p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-muted-foreground text-center leading-relaxed">
              To empower sales teams and call centers with cutting-edge technology that eliminates friction between CRM
              systems and dialing platforms. We believe every lead deserves immediate attention, and every call should
              be logged automatically. Our platform bridges the gap between your favorite tools, letting you focus on
              what matters most: closing deals and building relationships.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Speed & Efficiency</h3>
              <p className="text-muted-foreground leading-relaxed">
                We optimize every millisecond from lead capture to first call, ensuring your team never misses an
                opportunity
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Compliance First</h3>
              <p className="text-muted-foreground leading-relaxed">
                TCPA compliance and data security are built into every feature, not added as an afterthought
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Customer Success</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your success is our success. We provide hands-on support and continuously improve based on your feedback
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Integration Excellence</h3>
              <p className="text-muted-foreground leading-relaxed">
                We work with your existing tools, not against them. Seamless integration with the platforms you already
                love
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Quality & Reliability</h3>
              <p className="text-muted-foreground leading-relaxed">
                Enterprise-grade infrastructure ensures 99.9% uptime and crystal-clear call quality
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Continuous Innovation</h3>
              <p className="text-muted-foreground leading-relaxed">
                We're constantly evolving our platform with new features, integrations, and AI-powered capabilities
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Aeon Ops was born from frustration. Our founder spent years managing call centers for home services
              companies and saw the same problem everywhere: leads were falling through the cracks between CRM systems
              and dialers.
            </p>
            <p>
              Sales reps would manually export leads from GoHighLevel, import them into VICIdial, make calls, then
              manually log everything back. It was slow, error-prone, and meant hot leads went cold while waiting for
              data entry.
            </p>
            <p>
              We knew there had to be a better way. So we built it. Aeon Ops automatically syncs leads between
              your CRM and dialer in real-time, logs all call activity back to your CRM, and works with the tools you
              already use. No more data entry. No more missed opportunities. Just more conversations and more closed
              deals.
            </p>
            <p>
              Today, we're proud to serve home services teams, contractors, and agencies across North America, helping
              them connect with more leads and grow their businesses.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Us on Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Whether you're a small team or a large enterprise, we're here to help you succeed
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/pricing">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                View Pricing
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
