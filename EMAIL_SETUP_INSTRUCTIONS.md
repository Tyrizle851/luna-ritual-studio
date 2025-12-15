# Email Automation Setup Instructions

## What's Been Done

✅ **Database Table Created** - `subscribers` table in Supabase
✅ **Edge Function Created** - `handle-newsletter-signup` for automated emails
✅ **Frontend Connected** - Both signup forms now call the API
✅ **Resend Integrated** - Using your API key for email delivery

---

## To Make It Live (3 Steps)

### Step 1: Apply Database Migration

**Option A: Using Supabase Dashboard (Easiest)**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click "SQL Editor" in left sidebar
4. Click "New Query"
5. Copy the contents of `supabase/migrations/20251215110714_create_subscribers.sql`
6. Paste and click "Run"
7. ✅ Done! The `subscribers` table is now created

**Option B: Using Supabase CLI**
```bash
cd "C:\Users\fordt\OneDrive\Desktop\luna-ritual-studio"
supabase db push
```

---

### Step 2: Deploy Edge Function

**Option A: Using Supabase Dashboard**
1. Go to "Edge Functions" in Supabase Dashboard
2. Click "Deploy new function"
3. Name: `handle-newsletter-signup`
4. Copy contents of `supabase/functions/handle-newsletter-signup/index.ts`
5. Paste and deploy

**Option B: Using Supabase CLI**
```bash
supabase functions deploy handle-newsletter-signup
```

---

### Step 3: Add Environment Variables

**In Supabase Dashboard:**
1. Go to Project Settings → Edge Functions
2. Click "Add new secret"
3. Add these secrets:

```
RESEND_API_KEY = re_d7ie8dUn_ZiytdQ6WXgwwWxA4TEVt3CBq
```

**In your local .env file (for testing):**
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## How It Works

### When Someone Signs Up:

1. **User enters email** → Form submits
2. **API call** → Hits Supabase Edge Function
3. **Database** → Subscriber saved to `subscribers` table
4. **Email sent** → Resend sends welcome email
5. **User sees** → Success toast notification
6. **User receives** → Email in inbox (check spam!)

### Two Signup Types:

**Newsletter Signup (Bottom of homepage):**
- Sends regular welcome email
- No discount code
- Saved with `source: 'newsletter'`

**Popup Signup (Modal):**
- Sends welcome email WITH 30% discount code
- Code is auto-generated (e.g., `WELCOME7F3A9B`)
- Saved with `source: 'popup'`
- Code stored in database for future reference

---

## Testing

### Test Locally:
```bash
# Start Supabase locally (if using CLI)
supabase start

# Test the function
curl -X POST http://localhost:54321/functions/v1/handle-newsletter-signup \
  -H "Content-Type: application/json" \
  -d '{"email":"your.email@gmail.com","firstName":"Test","source":"newsletter"}'
```

### Test in Production:
1. Go to your live website
2. Scroll to bottom and enter your email in newsletter form
3. Click "Join"
4. Check your inbox (might be in spam first time)
5. Check Supabase Dashboard → Table Editor → `subscribers` table

---

## Emails Sent To

Currently configured to send FROM:
- `onboarding@resend.dev` (Resend test domain)

**To use your own domain:**
1. Go to Resend Dashboard → Domains
2. Add your domain (e.g., `lunarituals.com`)
3. Add DNS records they provide
4. Update Edge Function to use: `hello@lunarituals.com`

---

## What Emails Look Like

**Newsletter Welcome Email:**
- Clean, branded design
- Luna Rituals header
- Welcome message
- What they'll receive
- "Start Shopping" CTA button

**Popup Welcome Email (with discount):**
- Same branding
- Big discount code in dashed box
- 30% OFF highlighted
- "Shop Bundles" CTA button

---

## View Subscribers

**In Supabase Dashboard:**
1. Go to Table Editor
2. Click `subscribers` table
3. See all subscribers, emails, dates, discount codes

**Export subscribers:**
- Click "Export" button in Table Editor
- Download as CSV for your email marketing tool

---

## Troubleshooting

**"Email not sending":**
- Check Resend dashboard for errors
- Verify API key is correct in Edge Function secrets
- Check spam folder

**"Database error":**
- Verify migration was applied successfully
- Check Table Editor to see if `subscribers` table exists

**"Function not found":**
- Verify Edge Function is deployed
- Check function name is exactly `handle-newsletter-signup`

**"CORS error":**
- Should be handled, but if issue persists, check Edge Function headers

---

## Next Steps (Optional)

- [ ] Set up custom domain in Resend
- [ ] Create unsubscribe flow
- [ ] Add email templates for weekly newsletter
- [ ] Set up analytics (track open rates, clicks)
- [ ] Create admin page to view subscribers
- [ ] Add double opt-in (confirmation email)

---

## Support

- Resend Docs: https://resend.com/docs
- Supabase Functions: https://supabase.com/docs/guides/functions
- Your Resend Dashboard: https://resend.com/emails

---

*Created: December 15, 2025*
