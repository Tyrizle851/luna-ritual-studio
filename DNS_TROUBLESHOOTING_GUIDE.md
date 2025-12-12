# 🔧 DNS Error Fix Guide - Azure Blob Storage

## The Error
```
getaddrinfo ENOTFOUND oaidalleapiprodscus.blob.core.windows.net
```

**What's happening:** Your system cannot resolve Azure blob storage domain names to IP addresses.

---

## Quick Fixes (Try These First)

### Fix 1: Flush DNS Cache
```powershell
# Run in PowerShell as Administrator
ipconfig /flushdns
ipconfig /registerdns
```

### Fix 2: Change DNS to Google/Cloudflare
```powershell
# Set DNS to Google Public DNS
netsh interface ip set dns "Wi-Fi" static 8.8.8.8
netsh interface ip add dns "Wi-Fi" 8.8.4.4 index=2

# OR use Cloudflare DNS
netsh interface ip set dns "Wi-Fi" static 1.1.1.1
netsh interface ip add dns "Wi-Fi" 1.0.0.1 index=2
```

**Note:** Replace "Wi-Fi" with your network adapter name. Check with:
```powershell
netsh interface show interface
```

### Fix 3: Test DNS Resolution
```powershell
# Test if you can resolve Azure domains
nslookup oaidalleapiprodscus.blob.core.windows.net
nslookup oaidalleapiprodscus.blob.core.windows.net 8.8.8.8
```

If `nslookup` fails with default DNS but works with `8.8.8.8`, your ISP/corporate DNS is blocking Azure.

### Fix 4: Check Hosts File
```powershell
# Open hosts file
notepad C:\Windows\System32\drivers\etc\hosts
```

Check if there's an entry blocking `*.blob.core.windows.net`. Remove any such lines.

### Fix 5: Check Firewall
```powershell
# Check if Windows Firewall is blocking
Get-NetFirewallRule | Where-Object {$_.DisplayName -like "*blob*"}
```

If you're on a corporate network, your IT department may be blocking Azure blob storage.

---

## Advanced Fixes

### Fix 6: Reset Network Stack
```powershell
# Run as Administrator
netsh winsock reset
netsh int ip reset
ipconfig /release
ipconfig /renew
ipconfig /flushdns
```

**Then restart your computer.**

### Fix 7: Disable IPv6 (Sometimes Causes DNS Issues)
```powershell
# Temporarily disable IPv6
netsh interface ipv6 set teredo disabled
netsh interface ipv6 set 6to4 disabled
```

### Fix 8: Check if VPN/Proxy is Interfering
- Disable VPN temporarily
- Disable proxy in Windows Settings → Network & Internet → Proxy

---

## Workaround Solution (If DNS Fixes Don't Work)

If you're on a corporate network that blocks Azure blob storage, I can modify the workflow to:

1. **Store DALL-E URL but don't download immediately**
2. **Add a proxy/relay server option**
3. **Use a different download method**
4. **Save URLs for manual download**

Let me know which approach you prefer.

---

## Test DNS Resolution Now

Run this to diagnose:
```powershell
Write-Host "Testing DNS resolution..." -ForegroundColor Cyan
Write-Host ""

# Test with system DNS
$systemDNS = nslookup oaidalleapiprodscus.blob.core.windows.net 2>&1
if ($systemDNS -match "can't find") {
    Write-Host "❌ System DNS FAILED" -ForegroundColor Red
} else {
    Write-Host "✅ System DNS works" -ForegroundColor Green
}

# Test with Google DNS
$googleDNS = nslookup oaidalleapiprodscus.blob.core.windows.net 8.8.8.8 2>&1
if ($googleDNS -match "can't find") {
    Write-Host "❌ Google DNS FAILED" -ForegroundColor Red
} else {
    Write-Host "✅ Google DNS works" -ForegroundColor Green
}

# Test with Cloudflare DNS
$cloudflareDNS = nslookup oaidalleapiprodscus.blob.core.windows.net 1.1.1.1 2>&1
if ($cloudflareDNS -match "can't find") {
    Write-Host "❌ Cloudflare DNS FAILED" -ForegroundColor Red
} else {
    Write-Host "✅ Cloudflare DNS works" -ForegroundColor Green
}

Write-Host ""
Write-Host "Checking current DNS servers..." -ForegroundColor Cyan
Get-DnsClientServerAddress -AddressFamily IPv4 | Format-Table
```

Run this in PowerShell and share the results. This will tell us if it's a DNS server issue or a firewall block.

