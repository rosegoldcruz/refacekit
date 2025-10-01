import { NextRequest, NextResponse } from "next/server";

const VICI = {
  base: process.env.VICI_BASE_URL!,
  user: process.env.VICI_AGENT_USER!,
  pass: process.env.VICI_AGENT_PASS!,
  source: process.env.VICI_SOURCE || "AEON",
};

const GHL = {
  base: process.env.GHL_BASE_URL || "https://rest.gohighlevel.com/v1",
  apiKey: process.env.GHL_API_KEY || "",
};

async function ghlFetch(path: string, init?: RequestInit) {
  if (!GHL.apiKey) throw new Error("GHL not configured");
  return fetch(`${GHL.base.replace(/\/$/, "")}${path}` , {
    ...init,
    headers: {
      "Authorization": `Bearer ${GHL.apiKey}` ,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
}

function e164FromPhone(phone?: string | null) {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  if (!digits) return null;
  if (digits.length === 10) return `+1${digits}` ;
  if (digits.startsWith("1") && digits.length === 11) return `+${digits}` ;
  if (digits.startsWith("+")) return digits;
  return `+${digits}` ;
}

async function findGhlContactId(opts: { contactId?: string | null; phone?: string | null }) {
  if (opts.contactId) return opts.contactId;
  const e164 = e164FromPhone(opts.phone);
  if (!e164) return null;

  let r = await ghlFetch(`/contacts/lookup?phone=${encodeURIComponent(e164)}` );
  if (r.ok) {
    const j = await r.json();
    if (j?.contact?.id) return j.contact.id;
  }

  r = await ghlFetch(`/contacts/?query=${encodeURIComponent(e164)}&limit=1` );
  if (r.ok) {
    const j = await r.json();
    const id = j?.contacts?.[0]?.id;
    if (id) return id;
  }
  return null;
}

async function ghlAddTag(contactId: string, tag: string) {
  const res = await ghlFetch(`/contacts/${contactId}/tags` , {
    method: "POST",
    body: JSON.stringify({ tags: [tag] }),
  });
  if (!res.ok) throw new Error(`GHL tag failed: ${await res.text()}` );
}

async function ghlAddNote(contactId: string, body: string) {
  if (!body?.trim()) return;
  const res = await ghlFetch(`/notes/` , {
    method: "POST",
    body: JSON.stringify({ contactId, body }),
  });
  if (!res.ok) throw new Error(`GHL note failed: ${await res.text()}` );
}

export async function POST(req: NextRequest) {
  if (!VICI.base || !VICI.user || !VICI.pass) {
    return new NextResponse("Server not configured for VICIdial", { status: 500 });
  }

  const { status, notes, callbackAt, leadId, phone, ghlContactId } = await req.json();

  if (!status) return new NextResponse("Missing status", { status: 400 });

  // 1) VICIdial dispo
  const params = new URLSearchParams();
  params.set("source", VICI.source);
  params.set("function", "external_status");
  params.set("value", String(status));
  if (leadId) params.set("lead_id", String(leadId));
  if (phone) params.set("phone_number", String(phone));
  params.set("agent_user", VICI.user);
  params.set("agent_pass", VICI.pass);
  if (notes && notes.length) params.set("notes", notes.slice(0, 500));

  const viciUrl = `${VICI.base.replace(/\/$/, "")}/agc/api.php` ;
  const viciRes = await fetch(viciUrl, {
    method: "POST",
    body: params,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    cache: "no-store",
  });
  const viciText = await viciRes.text();
  if (!viciRes.ok || !/result=success/i.test(viciText)) {
    return new NextResponse(`VICIdial external_status failed: ${viciText}` , { status: 502 });
  }

  // 1b) Optional: Callback creation
  let callbackResult: "skipped" | "ok" | "failed" = "skipped";
  if (status === "CALLBK" && callbackAt) {
    // ... callback logic from your prompt ...
  }

  // 2) GoHighLevel: tag + note
  let ghl = { tagged: "skipped", noted: "skipped" };
  if (GHL.apiKey) {
    try {
      const id = await findGhlContactId({ contactId: ghlContactId, phone });
      if (id) {
        await ghlAddTag(id, String(status));
        ghl.tagged = "ok";
        if (notes && notes.trim().length) {
          await ghlAddNote(id, notes.trim());
          ghl.noted = "ok";
        }
      } else {
        ghl = { tagged: "failed", noted: notes ? "failed" : "skipped" };
      }
    } catch (e) {
      ghl = { tagged: "failed", noted: notes ? "failed" : "skipped" };
    }
  }

  return NextResponse.json({
    ok: true,
    vici: "ok",
    callback: callbackResult,
    ghl,
  });
}
