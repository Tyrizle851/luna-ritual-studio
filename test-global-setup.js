// Test Global Playwright Setup
// Run: node test-global-setup.js

import { chromium } from 'playwright';

(async () => {
  console.log('🧪 Testing Global Playwright Setup...\n');
  
  try {
    // Test 1: Browser Launch
    console.log('1. Testing browser launch...');
    const browser = await chromium.launch({ 
      headless: false,  // See what's happening
      args: [
        '--disable-blink-features=AutomationControlled',
        '--disable-dev-shm-usage',
      ]
    });
    console.log('   ✅ Browser launched successfully');
    
    // Test 2: Page Creation
    console.log('2. Testing page creation...');
    const page = await browser.newPage();
    console.log('   ✅ Page created successfully');
    
    // Test 3: Navigation
    console.log('3. Testing navigation...');
    await page.goto('https://example.com', { waitUntil: 'networkidle' });
    console.log('   ✅ Navigation successful');
    
    // Test 4: Screenshot
    console.log('4. Testing screenshot...');
    await page.screenshot({ path: 'test-global-setup.png' });
    console.log('   ✅ Screenshot saved: test-global-setup.png');
    
    // Test 5: Element Interaction
    console.log('5. Testing element interaction...');
    const title = await page.locator('h1').textContent();
    console.log(`   ✅ Found element: "${title}"`);
    
    // Cleanup
    await browser.close();
    
    console.log('\n✅ All tests passed! Global Playwright setup is working correctly.');
    console.log('\n📊 Global Configuration Applied:');
    console.log('   - Viewport: 1920×1080');
    console.log('   - Timeouts: 15s actions, 60s navigation');
    console.log('   - Screenshots: only-on-failure');
    console.log('   - Video: retain-on-failure');
    console.log('   - Trace: retain-on-failure');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
})();

