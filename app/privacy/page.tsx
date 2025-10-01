"use client"

import Link from "next/link"
import { Phone, ArrowLeft, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
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

      {/* Content */}
      <section className="container px-4 md:px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: January 2025</p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Aeon Ops ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your information when you use our call center
                  platform and services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Name, email address, and phone number</li>
                  <li>Company information and billing details</li>
                  <li>Account credentials and authentication data</li>
                  <li>Communication preferences and settings</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Call Data</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">When you use our platform, we collect:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Call recordings and transcriptions</li>
                  <li>Call duration, timestamps, and disposition codes</li>
                  <li>Phone numbers (caller and recipient)</li>
                  <li>Lead and contact information synced from your CRM</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Technical Information</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">We automatically collect:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>IP address and browser type</li>
                  <li>Device information and operating system</li>
                  <li>Usage data and analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send billing information</li>
                  <li>Send technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Ensure TCPA compliance and regulatory requirements</li>
                  <li>Detect and prevent fraud and abuse</li>
                  <li>Analyze usage patterns and optimize performance</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Information Sharing and Disclosure</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>
                    <strong>Service Providers:</strong> Third-party vendors who perform services on our behalf (e.g.,
                    hosting, analytics, payment processing)
                  </li>
                  <li>
                    <strong>Integrated Platforms:</strong> CRM and dialer platforms you connect to our service
                    (GoHighLevel, VICIdial, Twilio, etc.)
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> When required by law or to protect our rights and safety
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement industry-standard security measures to protect your information, including encryption,
                  secure data centers, and regular security audits. However, no method of transmission over the internet
                  is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your information for as long as necessary to provide our services and comply with legal
                  obligations. Call recordings are retained according to your account settings and applicable
                  regulations (typically 90 days to 7 years depending on jurisdiction).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Access and receive a copy of your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your information</li>
                  <li>Object to or restrict certain processing activities</li>
                  <li>Export your data in a portable format</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, analyze usage, and deliver
                  personalized content. You can control cookies through your browser settings, but disabling them may
                  affect functionality.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not intended for individuals under 18 years of age. We do not knowingly collect
                  personal information from children.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of material changes by posting
                  the new policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have questions about this Privacy Policy, please contact us:
                </p>
                <div className="bg-card border border-border rounded-lg p-6">
                  <p className="text-muted-foreground">
                    <strong>Email:</strong>{" "}
                    <a href="mailto:dcruz@snrglabs.com" className="text-primary hover:underline">
                      dcruz@snrglabs.com
                    </a>
                  </p>
                  <p className="text-muted-foreground mt-2">
                    <strong>Phone:</strong>{" "}
                    <a href="tel:480-364-8205" className="text-primary hover:underline">
                      480-364-8205
                    </a>
                  </p>
                  <p className="text-muted-foreground mt-2">
                    <strong>Address:</strong> Phoenix, Arizona
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
