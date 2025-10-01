import Link from "next/link"
import { ArrowRight, Check, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PricingPage() {
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
            <Link
              href="/#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#benefits"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Benefits
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-foreground transition-colors">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-sm font-medium">
                Agent Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Pricing Hero */}
      <section className="container px-4 md:px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm">
            <span className="text-primary font-medium">Simple, Transparent Pricing</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance mb-6">Plans and Pricing</h1>
          <p className="text-xl text-muted-foreground text-balance leading-relaxed">
            Choose the perfect plan for your team. All plans include VICIdial + GoHighLevel integration, WebRTC calling,
            and TCPA compliance.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Starter Plan */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover:border-primary/50 transition-all">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-bold">$99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground">Perfect for small teams getting started</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Up to 5 agents</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">GoHighLevel integration</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">WebRTC browser calling</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Basic call recording</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">TCPA compliance tools</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Email support</span>
              </li>
            </ul>

            <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80">Get Started</Button>
          </div>

          {/* Professional Plan - Recommended */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-primary bg-card p-8 shadow-xl shadow-primary/20">
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Recommended
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-bold">$249</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground">For growing teams that need more power</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Up to 15 agents</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Everything in Starter</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Advanced call recording</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Real-time analytics dashboard</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Custom call dispositions</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Priority support</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">API access</span>
              </li>
            </ul>

            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Enterprise Plan */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover:border-primary/50 transition-all">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-bold">$499</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground">For large teams and agencies</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Unlimited agents</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Everything in Professional</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Multi-client management</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">White-label options</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Dedicated account manager</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">24/7 phone support</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">Custom integrations</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">SLA guarantee</span>
              </li>
            </ul>

            <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-border/40 bg-card/30 py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold text-lg mb-2">Do I need any special hardware?</h3>
                <p className="text-muted-foreground">
                  No! Everything runs in the browser using WebRTC technology. Your agents just need a computer with
                  internet and a headset.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold text-lg mb-2">How does the GoHighLevel integration work?</h3>
                <p className="text-muted-foreground">
                  When a lead fills out a form in GHL, it automatically syncs to VICIdial as a dialable lead. When
                  agents make calls and set dispositions, that activity logs back to GHL as notes.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold text-lg mb-2">Is it really TCPA compliant?</h3>
                <p className="text-muted-foreground">
                  Yes! We include built-in DNC scrubbing, call recording features, and compliance tools to help you stay
                  within regulations.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold text-lg mb-2">Can I upgrade or downgrade my plan?</h3>
                <p className="text-muted-foreground">
                  You can change your plan at any time. Upgrades take effect immediately, and downgrades apply at your
                  next billing cycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 md:px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground text-balance mb-8">
            Start connecting with more leads today. No credit card required for demo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8"
              >
                Try Demo Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30 py-12">
        <div className="container px-4 md:px-6">
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
