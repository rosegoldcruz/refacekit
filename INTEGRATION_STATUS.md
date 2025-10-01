# 🚀 VICIdial + Asterisk + GoHighLevel Integration Status

## ✅ COMPLETED (Backend)

### 1. VICIdial External API Integration
- **File:** `/dialer/backend-api/vicidial_agent.py`
- **Functions:**
  - `external_dial()` - Places manual dial calls through VICIdial Non-Agent API
  - `external_status()` - Submits call dispositions to VICIdial
- **Endpoints:**
  - `POST /dial/manual` - Trigger manual outbound call
  - `POST /disposition/submit` - Submit disposition (VICIdial + GHL sync)

### 2. GoHighLevel CRM Integration  
- **File:** `/dialer/backend-api/gohighlevel.py`
- **API Key:** Configured and active
- **Functions:**
  - `find_or_create_contact()` - GHL contact lookup/creation
  - `sync_sale_disposition()` - Creates opportunity, tags as "Sale"
  - `sync_callback_disposition()` - Creates scheduled task
  - `sync_dnc_disposition()` - Marks contact as DNC, removes from workflows
  - `sync_generic_disposition()` - Tags + timeline notes for other statuses
- **Status Mappings:**
  - SALE → GHL Opportunity (Won) + Tags
  - CB → GHL Task (scheduled callback)
  - DNC → GHL DND + Archive
  - NA/NI/B/VM → GHL Tags + Notes

### 3. Disposition Sync Workflow
**Endpoint:** `POST /disposition/submit`
1. Submit to VICIdial via `external_status` API
2. Update `vicidial_list.status` directly in DB
3. Sync to GoHighLevel via REST API
4. Return combined success/failure status

---

## ✅ COMPLETED (Frontend)

### 1. WebRTC Softphone Hook
- **File:** `/dialer-frontend/crm-dashboard/hooks/use-softphone.ts`
- **Library:** SIP.js v0.21.2
- **Features:**
  - SIP registration to Asterisk via WSS
  - Outbound calling with `call(phoneNumber, leadId, contactName)`
  - Inbound call handling with `answer()`
  - Call state management (idle → ringing → connected → ended)
  - Audio streaming via WebRTC
  - Call duration timer
  - Auto-cleanup on unmount

### 2. Mandatory Disposition Modal
- **File:** `/dialer-frontend/crm-dashboard/components/modals/mandatory-disposition-modal.tsx`
- **Dispositions:** SALE, CB, NI, NA, B, DNC
- **Features:**
  - **BLOCKS UI** - Cannot close without selecting disposition
  - Callback date/time picker (shown for CB status)
  - Notes field
  - Submits to `/disposition/submit` (VICIdial + GHL)
  - Auto-clears form after submit

### 3. Manual Dial API Function
- **File:** `/dialer-frontend/crm-dashboard/lib/vicidial-api.ts`
- **Function:** `manualDial(phoneNumber, agentUser, campaignId, leadId?)`
- **Returns:** `{ success, message, call_id }`

---

## ⚠️ PENDING (Integration Wiring)

### **NEXT STEPS:**

#### Step 1: Wire Manual Dial Button
**Location:** `/dialer-frontend/crm-dashboard/components/crm-dashboard.tsx`

**Current:** Button does nothing  
**Need:** 
```tsx
import { useSoftphone } from '@/hooks/use-softphone'
import { manualDial } from '@/lib/vicidial-api'
import { MandatoryDispositionModal } from '@/components/modals/mandatory-disposition-modal'

// Initialize softphone
const softphone = useSoftphone({
  sipServer: process.env.NEXT_PUBLIC_SIP_SERVER || '147.182.253.110',
  sipUsername: agentUser,
  sipPassword: process.env.NEXT_PUBLIC_SIP_PASSWORD || '1234',
  sipExtension: agentUser,
  autoRegister: true
})

// Manual dial handler
const handleManualDial = async () => {
  const result = await manualDial(dialedNumber, agentUser, campaignId)
  if (result.success) {
    // Trigger softphone to connect
    await softphone.call(dialedNumber, currentLead?.lead_id, currentLead?.name)
  }
}
```

#### Step 2: Auto-Launch Disposition Modal on Hangup
```tsx
const [showDispositionModal, setShowDispositionModal] = useState(false)

useEffect(() => {
  if (softphone.callState === 'ended' && softphone.currentCall) {
    // Call just ended - FORCE disposition modal
    setShowDispositionModal(true)
  }
}, [softphone.callState])

// Disposition modal
<MandatoryDispositionModal
  isOpen={showDispositionModal}
  onClose={(dispo) => {
    if (dispo) {
      // Disposition submitted successfully
      setShowDispositionModal(false)
      softphone.endCall() // Clear call data
    }
  }}
  phoneNumber={softphone.currentCall?.phoneNumber || ''}
  leadId={softphone.currentCall?.leadId}
  contactName={softphone.currentCall?.contactName}
  campaignId={campaignId}
  agentUser={agentUser}
/>
```

#### Step 3: Replace Fake Call State with Real Softphone State
```tsx
// REMOVE these fake state variables:
// const [callStatus, setCallStatus] = useState("idle")
// const [callDuration, setCallDuration] = useState(0)

// USE real softphone state instead:
const callStatus = softphone.callState
const callDuration = softphone.callDuration
const isRegistered = softphone.isRegistered
```

#### Step 4: Wire Hangup Button
```tsx
<Button onClick={softphone.hangup} variant="destructive">
  <PhoneOff className="h-5 w-5" />
  Hang Up
</Button>
```

---

## 🔧 Environment Variables Needed

### Backend `.env`
```bash
VICIDIAL_API_URL=http://localhost/agc/api_non_agent.php
VICIDIAL_API_USER=6666
VICIDIAL_API_PASS=1234
GHL_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Frontend `.env.local`
```bash
NEXT_PUBLIC_SIP_SERVER=147.182.253.110
NEXT_PUBLIC_SIP_PASSWORD=1234
NEXT_PUBLIC_API_BASE_URL=http://147.182.253.110:8001
```

---

## 📊 Testing Checklist

- [ ] Manual dial button triggers VICIdial external_dial
- [ ] Softphone registers to Asterisk via WSS
- [ ] Audio streams work (can hear caller)
- [ ] Hangup button ends call
- [ ] Disposition modal BLOCKS UI after hangup
- [ ] Disposition syncs to VICIdial DB
- [ ] Disposition syncs to GoHighLevel
- [ ] SALE creates GHL opportunity
- [ ] CB creates GHL scheduled task
- [ ] DNC marks contact as DNC in GHL

---

## 🎯 Final Goal

**Agent workflow:**
1. Click "Manual Dial" or answer incoming call
2. Softphone connects via WebRTC (audio streams)
3. Talk to customer
4. Click "Hang Up"
5. **MANDATORY disposition modal appears**
6. Select disposition + add notes
7. Submit → Syncs to VICIdial + GoHighLevel
8. Modal closes, ready for next call

**No placeholders. No fake data. Everything real.**
