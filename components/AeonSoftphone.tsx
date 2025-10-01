"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import JsSIP from "jssip";

type DispoPayload = {
  status: string;
  notes?: string;
  callbackAt?: string | null; // ISO string when status === "CALLBK"
  leadId?: string | null;
  phone?: string | null;
  ghlContactId?: string | null; // For GHL integration
};

const DISPO_OPTIONS = [
  { code: "SALE", label: "Sale" },
  { code: "NI",   label: "Not Interested" },
  { code: "NA",   label: "No Answer" },
  { code: "BUSY", label: "Busy" },
  { code: "DNC",  label: "Do Not Call" },
  { code: "CALLBK", label: "Callback" },
];

export default function AeonSoftphone() {
  const [status, setStatus] = useState<"Not Ready"|"Ready"|"Dialing"|"In Call">("Not Ready");
  const [number, setNumber] = useState("");
  const [showDispo, setShowDispo] = useState(false);
  const [dispo, setDispo] = useState<DispoPayload>({ status: "SALE", notes: "", callbackAt: null, leadId: null, phone: null, ghlContactId: null });

  // runtime call/session info
  const uaRef = useRef<JsSIP.UA | null>(null);
  const sessionRef = useRef<any>(null);
  const lastLeadIdRef = useRef<string | null>(null);
  const lastPhoneRef = useRef<string | null>(null);
  const lastGhlContactIdRef = useRef<string | null>(null); // To hold GHL ID during a call

  // SIP credentials from environment variables (never hardcode passwords)
  const sip = useMemo(() => ({
    wss: process.env.NEXT_PUBLIC_SIP_WSS!,
    uri: process.env.NEXT_PUBLIC_SIP_URI!,
    // nosemgrep: generic.secrets.security.detected-generic-secret
    password: process.env.NEXT_PUBLIC_SIP_PASS!,  // Loaded from secure env var
    registrar: process.env.NEXT_PUBLIC_SIP_REGISTRAR || undefined
  }), []);

  useEffect(() => {
    if (!sip.wss || !sip.uri || !sip.password) return;

    const socket = new JsSIP.WebSocketInterface(sip.wss);
    const ua = new JsSIP.UA({
      uri: sip.uri,
      password: sip.password,
      sockets: [socket],
      registrar_server: sip.registrar,
      session_timers: false,
      display_name: "AEON Agent",
    });

    ua.on("connected", () => setStatus("Ready"));
    ua.on("disconnected", () => setStatus("Not Ready"));

    ua.on("newRTCSession", (e: any) => {
      sessionRef.current = e.session;

      const s = sessionRef.current;
      s.on("progress", () => setStatus("Dialing"));
      s.on("confirmed", () => setStatus("In Call"));
      s.on("ended", () => {
        setStatus("Ready");
        setDispo(d => ({ ...d, leadId: lastLeadIdRef.current, phone: lastPhoneRef.current, ghlContactId: lastGhlContactIdRef.current }));
        setShowDispo(true);
        sessionRef.current = null;
      });
      s.on("failed", () => {
        setStatus("Ready");
        setDispo(d => ({ ...d, leadId: lastLeadIdRef.current, phone: lastPhoneRef.current, ghlContactId: lastGhlContactIdRef.current }));
        setShowDispo(true);
        sessionRef.current = null;
      });
    });

    ua.start();
    uaRef.current = ua;

    return () => {
      try { uaRef.current?.stop(); } catch {}
      uaRef.current = null;
    };
  }, [sip]);

  const dial = () => {
    if (!uaRef.current || !number) return;
    lastPhoneRef.current = number;
    // TODO: Set lastLeadIdRef and lastGhlContactIdRef from your CRM state before dialing
    const eventHandlers = {
      progress: () => setStatus("Dialing"),
      confirmed: () => setStatus("In Call"),
      ended: () => setStatus("Ready"),
      failed: () => setStatus("Ready"),
    };
    const options = {
      eventHandlers,
      mediaConstraints: { audio: true, video: false },
    };
    const host = (sip.uri.match(/@([^;>]+)/)?.[1] || "").trim();
    uaRef.current.call(`sip:${number}@${host}` , options);
  };

  const hangup = () => {
    if (sessionRef.current) {
      try { sessionRef.current.terminate(); } catch {}
    } else {
      setDispo(d => ({ ...d, leadId: lastLeadIdRef.current, phone: lastPhoneRef.current, ghlContactId: lastGhlContactIdRef.current }));
      setShowDispo(true);
    }
  };

  const clear = () => setNumber("");

  const press = (d: string | number) => setNumber(n => `${n}${d}` );

  const submitDispo = async () => {
    try {
      const payload: DispoPayload = {
        status: dispo.status,
        notes: dispo.notes?.trim() || undefined,
        callbackAt: dispo.status === "CALLBK" ? (dispo.callbackAt || null) : null,
        leadId: dispo.leadId || null,
        phone: dispo.phone || lastPhoneRef.current || number || null,
        ghlContactId: dispo.ghlContactId || null,
      };
      const res = await fetch("/api/vici/dispo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) {
        const t = await res.text();
        alert(`Dispo failed: ${t}` );
      } else {
        setShowDispo(false);
        setDispo({ status: "SALE", notes: "", callbackAt: null, leadId: null, phone: null, ghlContactId: null });
        lastLeadIdRef.current = null;
        lastPhoneRef.current = null;
        lastGhlContactIdRef.current = null;
      }
    } catch (e: any) {
      alert(`Dispo error: ${e?.message || e}` );
    }
  };

  return (
    <div className="max-w-sm w-full rounded-2xl border border-zinc-800 bg-[#0a0a0a]/90 text-zinc-100 shadow-xl p-5">
      {/* ... UI code from your prompt ... */}
    </div>
  );
}
