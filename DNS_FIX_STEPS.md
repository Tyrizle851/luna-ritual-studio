# 🚀 Step-by-Step DNS Fix

## Step 1: Run Diagnostic (Copy/Paste This)

```powershell
# Copy this entire block and paste into PowerShell
Write-Host "Testing DNS..." -ForegroundColor Cyan
nslookup oaidalleapiprodscus.blob.core.windows.net
Write-Host ""
nslookup oaidalleapiprodscus.blob.core.windows.net 8.8.8.8
```

---

## Step 2: Apply Fix Based on Results

### If Google DNS (8.8.8.8) Works But System DNS Fails:

**Your DNS server is the problem.** Fix it:

```powershell
# Run PowerShell as Administrator
# Change DNS to Google (8.8.8.8)

# First, find your network adapter name:
Get-NetAdapter | Where-Object {$_.Status -eq "Up"} | Select-Object Name, InterfaceDescription

# Then set DNS (replace "Ethernet" with your adapter name from above):
netsh interface ip set dns "Ethernet" static 8.8.8.8
netsh interface ip add dns "Ethernet" 8.8.4.4 index=2

# Verify:
ipconfig /all
```

**For WiFi:**
```powershell
netsh interface ip set dns "Wi-Fi" static 8.8.8.8
netsh interface ip add dns "Wi-Fi" 8.8.4.4 index=2
```

---

### If Both Fail (Corporate Firewall):

Your network is blocking Azure blob storage. Options:

**Option A: Use VPN**
- Connect to a VPN that doesn't block Azure
- Re-run workflow

**Option B: Proxy Workaround**
- Set up a local proxy that can access Azure
- Configure n8n to use the proxy

**Option C: Contact IT**
- Request Azure blob storage (`*.blob.core.windows.net`) be whitelisted
- May need business justification

---

## Step 3: Verify Fix

After changing DNS:

```powershell
# Clear DNS cache
ipconfig /flushdns

# Test again
nslookup oaidalleapiprodscus.blob.core.windows.net

# Should return an IP address like:
# Address:  20.150.72.132
```

---

## Step 4: Re-test Workflow in n8n

If DNS now resolves, the workflow will:
1. Generate DALL-E image ✅
2. Download successfully ✅
3. Show DALL-E image in summary ✅

---

## Alternative: Download Images Manually

If DNS can't be fixed, you can:

1. Copy the DALL-E URL from workflow output
2. Open in browser (browser may use different DNS)
3. Download manually
4. Upload to GitHub assets

The workflow will use GitHub images automatically.

---

## Quick Test Command

```powershell
# Single command to test and show fix
$test = nslookup oaidalleapiprodscus.blob.core.windows.net 8.8.8.8 2>&1 | Out-String
if ($test -match "Address:") {
    Write-Host "✅ Azure blob storage is accessible via Google DNS" -ForegroundColor Green
    Write-Host "→ Change your DNS to 8.8.8.8 to fix the issue" -ForegroundColor Yellow
} else {
    Write-Host "❌ Even Google DNS can't access Azure" -ForegroundColor Red
    Write-Host "→ Your network/firewall is blocking Azure completely" -ForegroundColor Yellow
}
```

Run the diagnostic test I sent above and share the results. I'll guide you to the exact fix based on what we find.

