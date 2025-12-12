"""
Simple script to open Etsy browser for login
Works with or without playwright-stealth
"""

from playwright.sync_api import sync_playwright
import time
import random

print("\n" + "="*60)
print("🌐 Opening Etsy Browser for Login")
print("="*60 + "\n")

try:
    from playwright_stealth import stealth_sync
    STEALTH_AVAILABLE = True
    print("✅ playwright-stealth detected - using stealth mode")
except ImportError:
    STEALTH_AVAILABLE = False
    print("⚠️  playwright-stealth not found - using standard mode")
    print("   (You can install it with: pip install playwright-stealth)")

with sync_playwright() as p:
    # Launch browser with stealth args
    browser = p.chromium.launch(
        headless=False,  # MUST be False for Etsy
        args=[
            '--disable-blink-features=AutomationControlled',
            '--no-sandbox',
            '--disable-dev-shm-usage',
        ]
    )
    
    # Create context with realistic fingerprint
    context = browser.new_context(
        viewport={'width': 1920, 'height': 1080},
        user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        locale='en-US',
        timezone_id='America/New_York',
        extra_http_headers={
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
        }
    )
    
    page = context.new_page()
    
    # Apply stealth if available
    if STEALTH_AVAILABLE:
        try:
            stealth_sync(page)
            print("✅ Stealth patches applied")
        except Exception as e:
            print(f"⚠️  Could not apply stealth: {e}")
    
    # Inject basic anti-detection script
    page.add_init_script("""
        Object.defineProperty(navigator, 'webdriver', {get: () => undefined});
        window.chrome = {runtime: {}, loadTimes: function() {}, csi: function() {}, app: {}};
    """)
    
    print("\n" + "🔐 "*30)
    print("🔐 PLEASE LOG INTO ETSY NOW")
    print("🔐 "*30)
    print("\nNavigating to Etsy...")
    
    # Navigate to Etsy
    page.goto('https://www.etsy.com/sell')
    time.sleep(2)
    
    print("\n✅ Browser opened!")
    print("   - Please log into Etsy")
    print("   - I'll detect when you're logged in automatically")
    print("   - Press Ctrl+C when done to close\n")
    
    # Wait for login detection
    max_wait = 300  # 5 minutes
    start_time = time.time()
    
    while time.time() - start_time < max_wait:
        try:
            current_url = page.url
            # Check for logged-in indicators
            if 'shop-manager' in current_url or \
               'your/shops' in current_url or \
               page.locator("text=Shop Manager").count() > 0 or \
               page.locator("text=Your Shop").count() > 0:
                print("\n✅ Login detected! You're ready to go!")
                print("   You can now run the full automation script.")
                break
        except:
            pass
        
        time.sleep(2)
    
    # Keep browser open
    print("\nBrowser will stay open. Press Ctrl+C to close when ready.\n")
    
    try:
        while True:
            time.sleep(10)
    except KeyboardInterrupt:
        print("\n✅ Closing browser...")
        browser.close()





