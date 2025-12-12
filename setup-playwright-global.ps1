# Playwright Global Setup Script for Windows
# Run this script to set up global Playwright improvements

Write-Host "🚀 Setting up Global Playwright Configuration..." -ForegroundColor Cyan

# Create global Playwright config directory
$playwrightDir = "$env:USERPROFILE\.playwright"
if (-not (Test-Path $playwrightDir)) {
    New-Item -ItemType Directory -Path $playwrightDir -Force | Out-Null
    Write-Host "✅ Created directory: $playwrightDir" -ForegroundColor Green
}

# Create global config file
$configPath = "$playwrightDir\config.js"
$configContent = @"
// Global Playwright Configuration
// This applies to ALL projects unless overridden locally

module.exports = {
  use: {
    // Timeouts (increased for reliability)
    actionTimeout: 15000,        // 15s for actions
    navigationTimeout: 60000,    // 60s for navigation
    
    // Viewport (consistent across all projects)
    viewport: { 
      width: 1920, 
      height: 1080 
    },
    
    // User Agent (appear as real browser)
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    
    // Locale & Timezone
    locale: 'en-US',
    timezoneId: 'America/New_York',
    
    // Screenshots (on failure only - saves disk space)
    screenshot: 'only-on-failure',
    
    // Video (on failure only - saves disk space)
    video: 'retain-on-failure',
    
    // Trace (for debugging failures)
    trace: 'retain-on-failure',
    
    // Headless mode (set to false for debugging)
    headless: process.env.CI === 'true' ? true : false,
    
    // Accept downloads
    acceptDownloads: true,
    
    // Ignore HTTPS errors (useful for local dev)
    ignoreHTTPSErrors: process.env.NODE_ENV === 'development',
  },
  
  // Retry & timeout settings
  retries: process.env.CI ? 2 : 0,
  timeout: 60000,
  expect: {
    timeout: 10000,
    threshold: 0.2,
  },
  
  // Workers (1 = sequential, safer for debugging)
  workers: process.env.CI ? 2 : 1,
  
  // Output settings
  outputDir: 'test-results/',
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results.json' }],
  ],
};
"@

Set-Content -Path $configPath -Value $configContent -Force
Write-Host "✅ Created global config: $configPath" -ForegroundColor Green

# Create helpers directory
$helpersDir = "$playwrightDir\helpers"
if (-not (Test-Path $helpersDir)) {
    New-Item -ItemType Directory -Path $helpersDir -Force | Out-Null
    Write-Host "✅ Created helpers directory: $helpersDir" -ForegroundColor Green
}

# Create global helpers file
$helpersPath = "$helpersDir\index.js"
$helpersContent = @"
// Global Playwright Helpers
// Available to all projects

export async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      const delay = baseDelay * Math.pow(2, i);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

export async function waitForStable(page, selector, timeout = 10000) {
  await page.waitForSelector(selector, { state: 'visible', timeout });
  await page.waitForFunction(
    (sel) => {
      const el = document.querySelector(sel);
      return el && el.offsetHeight > 0 && !el.classList.contains('animating');
    },
    selector,
    { timeout }
  );
}

export async function takeDebugScreenshot(page, name) {
  const timestamp = Date.now();
  const path = `debug/\${name}-\${timestamp}.png`;
  await page.screenshot({ path, fullPage: true });
  console.log(`📸 Screenshot saved: \${path}`);
}
"@

Set-Content -Path $helpersPath -Value $helpersContent -Force
Write-Host "✅ Created global helpers: $helpersPath" -ForegroundColor Green

# Install Playwright browsers globally
Write-Host "`n📦 Installing Playwright browsers..." -ForegroundColor Cyan
npx playwright install chromium
Write-Host "✅ Playwright browsers installed" -ForegroundColor Green

# Set environment variables (add to PowerShell profile)
$profilePath = $PROFILE.CurrentUserAllHosts
$envVars = @"

# Playwright Global Settings
`$env:PLAYWRIGHT_BROWSERS_PATH = "0"
`$env:PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = "0"
"@

Write-Host "`n📝 Add these to your PowerShell profile ($profilePath):" -ForegroundColor Yellow
Write-Host $envVars -ForegroundColor Gray

Write-Host "`n✅ Global Playwright setup complete!" -ForegroundColor Green
Write-Host "📁 Config location: $configPath" -ForegroundColor Cyan
Write-Host "📚 See PLAYWRIGHT_GLOBAL_IMPROVEMENTS.md for details" -ForegroundColor Cyan

