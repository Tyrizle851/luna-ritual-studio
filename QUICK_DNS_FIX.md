# ⚡ Quick DNS Fix - 3 Commands

## The Problem
Your computer can't find Azure blob storage servers (where DALL-E stores images).

## The Fix (Try This First)

### Option 1: PowerShell Script (Easiest)
1. **Right-click** PowerShell → **Run as Administrator**
2. Run this command:
```powershell
.\APPLY_DNS_FIX.ps1
```

---

### Option 2: Manual Commands (If Script Fails)

**Run PowerShell as Administrator**, then:

```powershell
# 1. Find your network adapter name
Get-NetAdapter | Where-Object {$_.Status -eq "Up"} | Select-Object Name

# 2. Set DNS (replace "Ethernet" with your adapter name)
netsh interface ip set dns "Ethernet" static 8.8.8.8
netsh interface ip add dns "Ethernet" 8.8.4.4 index=2

# 3. Clear DNS cache
ipconfig /flushdns

# 4. Test
nslookup oaidalleapiprodscus.blob.core.windows.net
```

**If you see an IP address**, it's fixed! ✅

---

### Option 3: GUI Method (No Commands)

1. Open **Settings** → **Network & Internet**
2. Click your connection (WiFi or Ethernet)
3. Click **Edit** under "DNS server assignment"
4. Select **Manual**
5. Turn on **IPv4**
6. Preferred DNS: `8.8.8.8`
7. Alternate DNS: `8.8.4.4`
8. Click **Save**

Then re-run your n8n workflow.

---

## Test If It Worked

```powershell
nslookup oaidalleapiprodscus.blob.core.windows.net
```

**Should show:**
```
Server:  google-public-dns-a.google.com
Address:  8.8.8.8

Name:    oaidalleapiprodscus.blob.core.windows.net
Address:  20.150.72.132  ← If you see this, DNS is fixed!
```

---

## After DNS is Fixed

Re-run your n8n workflow. The image will now download successfully:
- ✅ DALL-E generates image
- ✅ DNS resolves Azure domain
- ✅ Image downloads
- ✅ Shows in Dry Run Summary

No more fallback to GitHub images!

---

## If Still Failing

Some networks (corporate, school, public WiFi) block Azure blob storage for security. In that case:

1. **Use mobile hotspot** (bypass network restrictions)
2. **Use VPN** (different network route)
3. **Contact IT** (request whitelisting)

Or accept that your workflow will use GitHub images (which is fine - they work perfectly).

