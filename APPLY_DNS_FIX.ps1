# DNS Fix Script for Azure Blob Storage Access
# Run this in PowerShell as Administrator

Write-Host ""
Write-Host "══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  DNS FIX FOR AZURE BLOB STORAGE" -ForegroundColor White
Write-Host "══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Step 1: Find active network adapter
Write-Host "Step 1: Finding your network adapter..." -ForegroundColor Yellow
$adapter = Get-NetAdapter | Where-Object {$_.Status -eq "Up"} | Select-Object -First 1
Write-Host "  Active adapter: $($adapter.Name)" -ForegroundColor Green
Write-Host ""

# Step 2: Flush DNS cache
Write-Host "Step 2: Flushing DNS cache..." -ForegroundColor Yellow
ipconfig /flushdns | Out-Null
Write-Host "  ✅ DNS cache cleared" -ForegroundColor Green
Write-Host ""

# Step 3: Set DNS to Google Public DNS
Write-Host "Step 3: Setting DNS to Google (8.8.8.8)..." -ForegroundColor Yellow
$adapterName = $adapter.Name

try {
    netsh interface ip set dns $adapterName static 8.8.8.8
    netsh interface ip add dns $adapterName 8.8.4.4 index=2
    Write-Host "  ✅ DNS changed to Google DNS" -ForegroundColor Green
} catch {
    Write-Host "  ❌ Failed to change DNS (may need Administrator)" -ForegroundColor Red
    Write-Host "  Run PowerShell as Administrator and try again" -ForegroundColor Yellow
}
Write-Host ""

# Step 4: Test resolution
Write-Host "Step 4: Testing if Azure is now accessible..." -ForegroundColor Yellow
$test = nslookup oaidalleapiprodscus.blob.core.windows.net 2>&1 | Out-String

if ($test -match "Address:" -and $test -notmatch "can't find") {
    Write-Host "  ✅ SUCCESS! Azure blob storage is now accessible" -ForegroundColor Green
    Write-Host ""
    Write-Host "══════════════════════════════════════════════════════" -ForegroundColor Green
    Write-Host "  ✅ DNS FIXED - Re-run your n8n workflow now!" -ForegroundColor White
    Write-Host "══════════════════════════════════════════════════════" -ForegroundColor Green
} else {
    Write-Host "  ❌ Still failing - your network may be blocking Azure" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possible causes:" -ForegroundColor Yellow
    Write-Host "  • Corporate firewall blocking Azure domains" -ForegroundColor White
    Write-Host "  • ISP blocking Azure blob storage" -ForegroundColor White
    Write-Host "  • VPN interfering with DNS" -ForegroundColor White
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "  1. Try disabling VPN (if using one)" -ForegroundColor White
    Write-Host "  2. Try different network (mobile hotspot)" -ForegroundColor White
    Write-Host "  3. Contact your network admin" -ForegroundColor White
}

Write-Host ""

