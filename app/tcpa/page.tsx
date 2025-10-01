"use client"

import Link from "next/link"
import { Phone, ArrowLeft, Shield, CheckCircle2, AlertTriangle, FileText, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function TCPAPage() {
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
          <Badge className="mb-4 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
            Compliance First
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance mb-6">TCPA Compliance</h1>
          <p className="text-xl text-muted-foreground text-balance leading-relaxed">
            Understanding and maintaining compliance with the Telephone Consumer Protection Act
          </p>
        </div>

        {/* What is TCPA */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">What is TCPA?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Telephone Consumer Protection Act (TCPA) is a federal law that restricts telemarketing calls,
                  auto-dialed calls, prerecorded calls, text messages, and unsolicited faxes. It protects consumers from
                  unwanted communications and imposes strict requirements on businesses making outbound calls.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Requirements */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Key TCPA Requirements</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Prior Express Written Consent</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You must obtain written consent before making marketing calls using an automatic telephone dialing
                    system (ATDS) or prerecorded messages. Consent must be clear, conspicuous, and not bundled with
                    other agreements.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Do Not Call Registry</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You must scrub your calling lists against the National Do Not Call Registry every 31 days. Consumers
                    who register their numbers must not be called for marketing purposes unless they have an established
                    business relationship.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Calling Time Restrictions</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Telemarketing calls are prohibited before 8:00 AM or after 9:00 PM in the recipient's local time
                    zone. This applies to all marketing calls, regardless of consent status.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Caller ID Requirements</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You must transmit accurate caller ID information, including your phone number and, when available,
                    your name. Spoofing or falsifying caller ID is prohibited and can result in severe penalties.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Internal DNC List</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Maintain your own internal Do Not Call list. When a consumer requests not to be called, you must
                    honor that request and add them to your list within a reasonable time (typically 30 days).
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Record Keeping</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Maintain records of consent, DNC requests, and calling activity for at least 4 years. This
                    documentation is critical for defending against TCPA claims and demonstrating compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Penalties */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="rounded-2xl border-2 border-orange-500/20 bg-orange-500/5 p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-8 w-8 text-orange-500 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-4">TCPA Penalties</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  TCPA violations carry significant penalties:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-orange-600 dark:text-orange-400">$500 - $1,500</span>
                    <span>per violation (call or text message)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-orange-600 dark:text-orange-400">Treble damages</span>
                    <span>for willful or knowing violations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-orange-600 dark:text-orange-400">Class action lawsuits</span>
                    <span>can result in millions of dollars in damages</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* How We Help */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How Aeon Ops Helps You Stay Compliant</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Automatic DNC Scrubbing</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our platform automatically scrubs your calling lists against the National DNC Registry and your internal
                DNC list before dialing.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Consent Management</h3>
              <p className="text-muted-foreground leading-relaxed">
                Track and store consent records for each contact, including date, time, and method of consent obtained.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Call Time Enforcement</h3>
              <p className="text-muted-foreground leading-relaxed">
                Automatically prevent calls outside of permitted hours based on the recipient's time zone.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Call Recording & Logging</h3>
              <p className="text-muted-foreground leading-relaxed">
                Comprehensive call recording and activity logs provide documentation for compliance audits and legal
                defense.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Compliance Alerts</h3>
              <p className="text-muted-foreground leading-relaxed">
                Real-time alerts notify you of potential compliance issues, such as expired DNC scrubs or missing
                consent records.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Compliance Reporting</h3>
              <p className="text-muted-foreground leading-relaxed">
                Generate detailed compliance reports showing DNC scrubbing, consent status, and calling activity for
                audits.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-lg mb-3">Important Disclaimer</h3>
            <p className="text-muted-foreground leading-relaxed">
              This information is provided for educational purposes only and does not constitute legal advice. TCPA
              regulations are complex and subject to change. You are solely responsible for ensuring your calling
              practices comply with all applicable laws. We strongly recommend consulting with a qualified attorney
              specializing in telecommunications law to ensure full compliance.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Questions About TCPA Compliance?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our team can help you understand how to use our platform's compliance features effectively
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Contact Us
              </Button>
            </Link>
            <Link href="/support">
              <Button size="lg" variant="outline">
                Visit Support Center
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
