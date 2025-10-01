"use client"

import Link from "next/link"
import { Phone, ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Phone className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">CallCenter Pro</span>
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
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: January 2025</p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using CallCenter Pro's services, you agree to be bound by these Terms of Service. If
                  you do not agree to these terms, you may not access or use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Description of Services</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  CallCenter Pro provides a cloud-based call center platform that integrates with CRM systems and
                  dialing platforms. Our services include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>WebRTC browser-based calling</li>
                  <li>Automatic lead synchronization with CRM platforms</li>
                  <li>Call recording and analytics</li>
                  <li>Team management and reporting tools</li>
                  <li>TCPA compliance features</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Account Registration</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">To use our services, you must:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Be at least 18 years of age</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Notify us immediately of any unauthorized access</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Acceptable Use</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">You agree not to:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Violate any laws, including TCPA, GDPR, and telemarketing regulations</li>
                  <li>Make unsolicited calls to numbers on Do Not Call lists</li>
                  <li>Use the service for fraudulent or illegal activities</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt the service</li>
                  <li>Resell or redistribute our services without permission</li>
                  <li>Use automated systems to scrape or collect data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Billing and Payment</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Subscription fees are billed monthly or annually based on your selected plan. You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Provide valid payment information</li>
                  <li>Pay all fees when due</li>
                  <li>Accept automatic renewal unless cancelled</li>
                  <li>Pay any applicable taxes</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Refunds are provided at our discretion. You may cancel your subscription at any time, effective at the
                  end of the current billing period.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">TCPA Compliance</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You are solely responsible for ensuring your use of our services complies with the Telephone Consumer
                  Protection Act (TCPA) and all applicable telemarketing laws. This includes obtaining proper consent
                  before calling consumers, maintaining Do Not Call lists, and following call time restrictions. We
                  provide tools to assist with compliance, but you bear ultimate responsibility for your calling
                  practices.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content, features, and functionality of our services are owned by CallCenter Pro and protected by
                  copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or
                  create derivative works without our express written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Data Ownership</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You retain ownership of all data you upload or create using our services, including call recordings,
                  lead information, and customer data. We claim no ownership rights to your data. Upon termination, you
                  may export your data within 30 days.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Service Availability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We strive for 99.9% uptime but do not guarantee uninterrupted service. We may perform maintenance,
                  updates, or experience outages. We are not liable for any damages resulting from service
                  interruptions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by law, CallCenter Pro shall not be liable for any indirect,
                  incidental, special, consequential, or punitive damages, including lost profits, data loss, or
                  business interruption, arising from your use of our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to indemnify and hold harmless CallCenter Pro from any claims, damages, or expenses arising
                  from your use of our services, violation of these terms, or infringement of any third-party rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may suspend or terminate your account at any time for violation of these terms, non-payment, or any
                  reason at our discretion. Upon termination, your right to use the services immediately ceases.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time. We will notify you of material changes via
                  email or through the platform. Continued use of our services after changes constitutes acceptance of
                  the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms are governed by the laws of the State of Arizona, without regard to conflict of law
                  principles. Any disputes shall be resolved in the courts of Arizona.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  For questions about these Terms of Service, contact us:
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
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
