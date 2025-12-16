# Upscale all 24 affirmation images for print
# Uses Real-ESRGAN for AI upscaling to print quality

Write-Host "🚀 Luna Rituals - Print Image Upscaler" -ForegroundColor Cyan
Write-Host "======================================`n" -ForegroundColor Cyan

# Paths
$originalPath = "..\..\src\assets"
$outputPath = "..\..\src\assets\print-ready"

# Create output directory
New-Item -ItemType Directory -Force -Path $outputPath | Out-Null

# Check if Real-ESRGAN is installed
$realesrganPath = "C:\realesrgan\realesrgan-ncnn-vulkan.exe"

if (-not (Test-Path $realesrganPath)) {
    Write-Host "❌ Real-ESRGAN not found!" -ForegroundColor Red
    Write-Host "`nInstall instructions:" -ForegroundColor Yellow
    Write-Host "1. Download: https://github.com/xinntao/Real-ESRGAN/releases" -ForegroundColor Yellow
    Write-Host "2. Extract to C:\realesrgan\" -ForegroundColor Yellow
    Write-Host "3. Run this script again`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Real-ESRGAN found`n" -ForegroundColor Green

# Find all affirmation images
$images = Get-ChildItem -Path $originalPath -Filter "affirmation-digital-aff-*.png"

Write-Host "📋 Found $($images.Count) affirmation images`n" -ForegroundColor Cyan

foreach ($image in $images) {
    $affId = $image.Name -replace "affirmation-digital-", "" -replace ".png", ""
    Write-Host "🔄 Processing $affId..." -ForegroundColor Yellow

    # Upscale 4x with Real-ESRGAN
    $inputFile = $image.FullName
    $tempOutput = "$outputPath\temp-$affId.png"

    & $realesrganPath `
        -i $inputFile `
        -o $tempOutput `
        -s 4 `
        -n realesrgan-x4plus `
        -f png

    # Resize to exact print dimensions (5400 x 7200)
    # Using ImageMagick if available, otherwise manual step
    if (Get-Command magick -ErrorAction SilentlyContinue) {
        magick $tempOutput `
            -resize "5400x7200^" `
            -gravity center `
            -extent 5400x7200 `
            "$outputPath\print-$affId.png"

        Remove-Item $tempOutput
        Write-Host "  ✅ Upscaled and resized to 5400×7200" -ForegroundColor Green
    } else {
        Rename-Item $tempOutput "$outputPath\print-$affId.png"
        Write-Host "  ✅ Upscaled (manual resize needed)" -ForegroundColor Yellow
    }
}

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host "✨ Complete! Images ready in:" -ForegroundColor Green
Write-Host "   $outputPath`n" -ForegroundColor White
Write-Host "Next: Upload these to Printful" -ForegroundColor Cyan
