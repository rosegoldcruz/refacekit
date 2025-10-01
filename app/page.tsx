"use client"

import Link from "next/link"
import { ArrowRight, Phone, Zap, Shield, RefreshCw, Globe, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MarketingHome() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

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

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Benefits
            </button>
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/sign-in">
              <Button variant="ghost" className="text-sm font-medium">
                Agent Login
              </Button>
            </Link>
            <Link href="/pricing">
              <Button className="text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 md:px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm">
            <span className="text-primary font-medium">Integrates With Your Existing Tools</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6 leading-tight">
            Production-Ready Call Center That Works With <span className="text-primary">Your Stack</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground text-balance mb-10 max-w-3xl leading-relaxed">
            Automatically sync leads between your CRM (GoHighLevel, HubSpot, Salesforce) and dialer (VICIdial, Twilio,
            InterCloud 9). Make calls through your browser with WebRTC. TCPA compliant and ready to scale.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link href="/pricing">
              <Button
                size="lg"
                className="text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8"
              >
                View Pricing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="text-base font-medium h-12 px-8 bg-transparent">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border/40 bg-card/30 py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Browser-Based</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-primary">Real-Time</div>
              <div className="text-sm text-muted-foreground">Lead Sync</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-primary">TCPA</div>
              <div className="text-sm text-muted-foreground">Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-primary">Multi</div>
              <div className="text-sm text-muted-foreground">Client Ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container px-4 md:px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-4">
            Everything You Need to Scale Your Sales
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Built specifically for home services and contractor sales teams
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 hover:border-primary/50 transition-all">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <RefreshCw className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Automatic Lead Sync</h3>
            <p className="text-muted-foreground leading-relaxed">
              When leads fill out forms in your CRM, they instantly become dialable in your dialer. All call activity
              syncs back to your CRM as notes. Works with GoHighLevel, HubSpot, Salesforce, and more.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 hover:border-primary/50 transition-all">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">WebRTC Browser Calling</h3>
            <p className="text-muted-foreground leading-relaxed">
              Agents make calls directly from their web browsers. No desk phones, no special equipment, no downloads
              required.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 hover:border-primary/50 transition-all">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">TCPA Compliance Built-In</h3>
            <p className="text-muted-foreground leading-relaxed">
              Built-in DNC scrubbing and call recording features ensure you stay compliant with all regulations.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 hover:border-primary/50 transition-all">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Flexible Dialer Integration</h3>
            <p className="text-muted-foreground leading-relaxed">
              Connect with industry-leading dialers like VICIdial, Twilio, or InterCloud 9. Predictive, power, and
              preview dialing modes for maximum efficiency.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 hover:border-primary/50 transition-all">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Simple Deployment</h3>
            <p className="text-muted-foreground leading-relaxed">
              Deploy on your preferred infrastructure. Works with DigitalOcean, AWS, or any cloud provider. Simple
              setup, easy maintenance, cost-effective scaling.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 hover:border-primary/50 transition-all">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Multi-Client Scalable</h3>
            <p className="text-muted-foreground leading-relaxed">
              Ready to scale across multiple clients and industries. Perfect for agencies and service providers.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="border-y border-border/40 bg-card/30 py-24 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-6">
                Why Home Services Teams Choose Us
              </h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Stop losing leads in the gap between your CRM and call center. Our seamless integration means every lead
                gets called, every call gets logged, and your team stays focused on closing deals—regardless of which
                tools you use.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Instant Lead Activation</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Form submissions in your CRM become dialable leads in seconds. Strike while the iron is hot, no
                      matter which platform you use.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Seamless CRM Integration</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      All call dispositions and notes automatically sync back to your CRM. One source of truth across
                      GoHighLevel, HubSpot, Salesforce, or your preferred platform.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">No Hardware Required</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      WebRTC technology means agents can work from anywhere with just a browser and internet connection.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Bring Your Own Tools</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Already invested in VICIdial, Twilio, or InterCloud 9? Keep using what works. We integrate with
                      your existing phone infrastructure.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl border border-border bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl font-bold mb-4 text-primary">5x</div>
                  <div className="text-2xl font-semibold mb-2">Faster Response Time</div>
                  <div className="text-muted-foreground">From lead capture to first call</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 md:px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-6">
            Ready to Transform Your Call Center?
          </h2>
          <p className="text-xl text-muted-foreground text-balance mb-10 leading-relaxed">
            Join home services teams using our platform to connect with more leads and close more deals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="inline-block"
            >
              <Button
                size="lg"
                className="text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8"
              >
                View Pricing Plans
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30 py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="hover:text-foreground transition-colors">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="/documentation" className="hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-foreground transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/tcpa" className="hover:text-foreground transition-colors">
                    TCPA Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-primary flex items-center justify-center">
                <Phone className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold">Aeon Ops</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 Aeon Ops. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
