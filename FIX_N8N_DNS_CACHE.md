# 🔧 Fix n8n DNS Cache Issue

## Diagnosis Complete ✅

Your DNS **IS** working:
```
✅ PowerShell can resolve: oaidalleapiprodscus.blob.core.windows.net
✅ Resolves to IP: 20.150.70.100
✅ Both system DNS and Google DNS work
```

But n8n still gets `ENOTFOUND` error.

**Why:** n8n (Node.js) has **cached the failed DNS lookup**. Node.js DNS cache doesn't auto-refresh.

---

## Solution: Restart n8n

### Method 1: Restart n8n Service

```powershell
# Find n8n process
Get-Process | Where-Object {$_.Name -like "*n8n*"}

# Stop n8n
Stop-Process -Name "n8n" -Force

# Wait 5 seconds
Start-Sleep -Seconds 5

# Start n8n again (however you normally start it)
n8n start
# OR
npm start
# OR (if Docker)
docker restart n8n
```

### Method 2: Restart via Task Manager
1. Open Task Manager (Ctrl+Shift+Esc)
2. Find "Node.js" or "n8n" process
3. Right-click → End Task
4. Start n8n again

### Method 3: Restart Computer (Nuclear Option)
If other methods don't work, a full restart clears all DNS caches.

---

## After Restart: Test Workflow Again

1. ✅ n8n will have fresh DNS cache
2. ✅ Will resolve Azure blob storage
3. ✅ DALL-E images will download
4. ✅ Summary will show generated images

---

## If Still Failing After Restart

Then it's an IPv6 vs IPv4 issue. We can force n8n to use IPv4:

### Option A: Set Environment Variable

Before starting n8n:
```powershell
$env:NODE_OPTIONS="--dns-result-order=ipv4first"
n8n start
```

### Option B: Disable IPv6 Temporarily

```powershell
# Run as Administrator
netsh interface ipv6 set teredo disabled
netsh interface ipv6 set 6to4 disabled

# Restart n8n
```

### Option C: Add to n8n Startup

Edit your n8n startup script to include:
```bash
NODE_OPTIONS=--dns-result-order=ipv4first n8n start
```

---

## Verification

After restarting n8n, run your workflow again. You should see:
```
pinterest_media: {
  url: "https://oaidalleapiprodscus.blob.core.windows.net/...", ✅
  type: "image", ✅
  source: "dalle3" ✅  (not github_fallback)
}
```

No more `ENOTFOUND` errors!

---

## Why This Happens

Node.js caches DNS lookups for performance. When the first lookup failed (before your DNS was properly configured), Node.js cached that failure. The cache doesn't expire until the process restarts.

**Simple fix:** Restart n8n = Fresh DNS cache = Problem solved!

🎯 **Restart n8n and re-test your workflow**

