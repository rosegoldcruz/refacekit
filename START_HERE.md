# 🚀 Quick Start - VICIdial Connected Frontend

## Your frontend is now wired to VICIdial with ZERO placeholder data!

---

## 📋 Prerequisites

1. **Backend API must be running** on port 8001
2. **VICIdial must be installed** and configured
3. **Database** must be accessible

---

## 🎯 Start The Frontend

### **1. Install Dependencies (First Time Only)**
```bash
npm install
# or
pnpm install
```

### **2. Start Development Server**
```bash
npm run dev
# or
pnpm dev
```

Frontend will run on: **http://localhost:3000**

---

## 🌐 Available Pages

### **Main Dashboard (VICIdial Connected)**
```
http://localhost:3000/dashboard
```
Your existing v0.dev dashboard, now pulling real VICIdial data

### **VICIdial Dashboard (Clean UI)**
```
http://localhost:3000/dashboard/vicidial
```
Purpose-built dashboard showing real-time auto-dial functionality

---

## 🔌 What's Connected

### ✅ Real-Time Data (Updates Every 2 Seconds):
- Agent status (READY/PAUSED/INCALL)
- Current active calls
- Lead information
- Campaign statistics

### ✅ Real Contacts/Leads:
- From `vicidial_list` table
- Search functionality
- Campaign filtering
- No mock data!

### ✅ Real-Time Statistics (Updates Every 5 Seconds):
- Total agents
- Active calls
- Calls today
- Sales today
- Average talk time
- Hopper count

---

## 🎮 How To Use

### **As An Agent:**

1. **Open Dashboard**
   ```
   http://localhost:3000/dashboard/vicidial
   ```

2. **Select Campaign**
   - Choose from dropdown (e.g., "HOMESERV")

3. **Click "GO READY"**
   - You're now in the auto-dial queue
   - VICIdial will send calls automatically

4. **Take Calls**
   - Call pops up automatically
   - Customer info displays
   - Call timer starts

5. **Disposition Call**
   - Click disposition button (Sale, Not Interested, etc.)
   - Agent automatically goes READY for next call

---

## 🔧 Configuration

### **Environment Variables:**

**.env.local** (already configured):
- `NEXT_PUBLIC_API_BASE_URL=http://147.182.253.110:8001`
- `NEXT_PUBLIC_DOMAIN=localhost:3000`
- `NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000`

**.env.production** (for deployment):
- `NEXT_PUBLIC_API_BASE_URL=https://api.aeonops.com`
- `NEXT_PUBLIC_DOMAIN=aeonops.com`
- `NEXT_PUBLIC_FRONTEND_URL=https://dialer.aeonops.com`

---

## 🧪 Test The Integration

### **1. Check Backend is Running:**
```bash
curl http://147.182.253.110:8001/health
# Should return: {"status":"ok"}
```

### **2. Test Agent Status:**
```bash
curl http://147.182.253.110:8001/agent/agent001/status
```

### **3. Test Campaigns:**
```bash
curl http://147.182.253.110:8001/campaigns
```

---

## 🐛 Troubleshooting

### **Issue: "Failed to fetch"**
✅ **Solution:** Make sure backend is running on port 8001
```bash
# Start backend:
cd /home/aeonops/aeonops/dialer/backend-api
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8001 --reload
```

### **Issue: "Agent not found"**
✅ **Solution:** Agent must be logged into VICIdial first
- Check `vicidial_live_agents` table
- Update `agent001` in code to match your agent username

### **Issue: "No campaigns showing"**
✅ **Solution:** Check `vicidial_campaigns` table
```sql
SELECT campaign_id, campaign_name FROM vicidial_campaigns WHERE active='Y';
```

---

## 📱 Features Implemented

### ✅ **Agent Controls**
- GO READY button
- PAUSE button  
- Campaign selector
- Real-time status badge

### ✅ **Call Management**
- Incoming call notifications
- Lead info display
- Disposition buttons
- Call history

### ✅ **Statistics Dashboard**
- Active agents
- Calls today
- Sales count
- Hopper count
- Campaign stats

### ✅ **Contacts List**
- Real leads from database
- Search functionality
- Click-to-dial (via existing softphone)
- Campaign filtering

---

## 🚀 Deploy To Production

### **1. Build for Production:**
```bash
npm run build
```

### **2. Start Production Server:**
```bash
npm start
```

### **3. Or Deploy to Vercel:**
```bash
vercel deploy
```

Make sure to set environment variables in Vercel dashboard:
- `NEXT_PUBLIC_API_BASE_URL=https://api.aeonops.com`
- `NEXT_PUBLIC_DOMAIN=aeonops.com`
- `NEXT_PUBLIC_FRONTEND_URL=https://dialer.aeonops.com`

---

## 🎉 You're All Set!

Your frontend is now fully connected to VICIdial's auto-dialing engine. 

**No placeholder data - everything is REAL and updates in real-time!**
