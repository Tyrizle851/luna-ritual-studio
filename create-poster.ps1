# Script to create hero video poster image
# This script extracts the first frame from hero-video.mp4

$videoPath = "public\hero-video.mp4"
$outputPath = "public\hero-poster.jpg"

Write-Host "Creating poster image from video..." -ForegroundColor Cyan

# Check if ffmpeg is installed
$ffmpegInstalled = Get-Command ffmpeg -ErrorAction SilentlyContinue

if ($ffmpegInstalled) {
    # Extract frame at 0.5 seconds (adjust if needed)
    ffmpeg -i $videoPath -ss 00:00:00.5 -vframes 1 -q:v 2 $outputPath -y
    Write-Host "✓ Poster created successfully at $outputPath" -ForegroundColor Green
} else {
    Write-Host "✗ FFmpeg not found. Installing via winget..." -ForegroundColor Yellow

    # Try to install ffmpeg via winget
    $wingetInstalled = Get-Command winget -ErrorAction SilentlyContinue

    if ($wingetInstalled) {
        Write-Host "Installing FFmpeg..." -ForegroundColor Cyan
        winget install ffmpeg

        # Retry poster creation
        ffmpeg -i $videoPath -ss 00:00:00.5 -vframes 1 -q:v 2 $outputPath -y
        Write-Host "✓ Poster created successfully at $outputPath" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "Please install FFmpeg manually:" -ForegroundColor Yellow
        Write-Host "1. Download from: https://ffmpeg.org/download.html" -ForegroundColor White
        Write-Host "2. Or use winget: winget install ffmpeg" -ForegroundColor White
        Write-Host "3. Then run this script again" -ForegroundColor White
        Write-Host ""
        Write-Host "Alternatively, create poster manually:" -ForegroundColor Yellow
        Write-Host "1. Open hero-video.mp4 in any video player" -ForegroundColor White
        Write-Host "2. Pause at a good frame (around 0.5 seconds)" -ForegroundColor White
        Write-Host "3. Take a screenshot and save as hero-poster.jpg" -ForegroundColor White
        Write-Host "4. Place it in the public folder" -ForegroundColor White
    }
}
