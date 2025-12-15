import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from 'npm:resend@3.0.0'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || 're_d7ie8dUn_ZiytdQ6WXgwwWxA4TEVt3CBq'
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const resend = new Resend(RESEND_API_KEY)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, firstName, source = 'newsletter' } = await req.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Valid email is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

    // Generate discount code for popup signups (30% off)
    const discountCode = source === 'popup'
      ? `WELCOME${Math.random().toString(36).substring(2, 8).toUpperCase()}`
      : null

    console.log('Processing signup:', { email, firstName, source, discountCode })

    // Try to insert subscriber
    const { data: subscriber, error: dbError } = await supabase
      .from('subscribers')
      .insert([
        {
          email: email.toLowerCase().trim(),
          first_name: firstName?.trim() || null,
          source,
          discount_code: discountCode,
          status: 'active'
        }
      ])
      .select()
      .single()

    // Handle duplicate email
    if (dbError && dbError.code === '23505') {
      console.log('Email already exists, returning existing subscriber')

      const { data: existing } = await supabase
        .from('subscribers')
        .select('*')
        .eq('email', email.toLowerCase().trim())
        .single()

      return new Response(
        JSON.stringify({
          success: true,
          message: 'You\'re already subscribed!',
          discountCode: existing?.discount_code
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error(`Database error: ${dbError.message}`)
    }

    console.log('Subscriber added to database:', subscriber)

    // Send welcome email via Resend
    const emailName = firstName || 'friend'
    const emailSubject = discountCode
      ? '✨ Your 30% Off Code is Here!'
      : '✨ Welcome to Luna Rituals'

    const emailHtml = discountCode
      ? getWelcomeEmailWithDiscount(emailName, discountCode)
      : getWelcomeEmail(emailName)

    console.log('Sending email via Resend...')

    const emailResult = await resend.emails.send({
      from: 'Luna Rituals <onboarding@resend.dev>',
      to: [email],
      subject: emailSubject,
      html: emailHtml,
    })

    console.log('Email sent successfully:', emailResult)

    return new Response(
      JSON.stringify({
        success: true,
        discountCode,
        message: discountCode
          ? 'Check your inbox for your discount code!'
          : 'Welcome! Check your inbox.',
        emailId: emailResult.data?.id
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error in newsletter signup:', error)

    return new Response(
      JSON.stringify({
        error: 'Failed to process signup',
        details: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})

// Email template for regular newsletter signup
function getWelcomeEmail(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: #2e2c2a;
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
        }
        .header {
          background: linear-gradient(135deg, #A97E63 0%, #8B6950 100%);
          padding: 40px 20px;
          text-align: center;
        }
        .logo {
          font-family: 'Georgia', serif;
          font-size: 32px;
          color: #ffffff;
          margin: 0;
        }
        .content {
          padding: 40px 30px;
        }
        h2 {
          color: #2e2c2a;
          font-size: 24px;
          margin-bottom: 20px;
        }
        .benefits {
          background: #FAF7F4;
          padding: 30px;
          border-radius: 12px;
          margin: 30px 0;
        }
        .benefits ul {
          margin: 0;
          padding-left: 20px;
        }
        .benefits li {
          margin: 10px 0;
          color: #47433f;
        }
        .cta {
          text-align: center;
          margin: 30px 0;
        }
        .button {
          display: inline-block;
          background: #A97E63;
          color: #ffffff !important;
          padding: 14px 32px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
        }
        .footer {
          background: #FAF7F4;
          padding: 30px 20px;
          text-align: center;
          font-size: 14px;
          color: #8B7968;
        }
        .footer a {
          color: #A97E63;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="logo">Luna Rituals</h1>
        </div>

        <div class="content">
          <h2>Welcome to the ritual, ${name}! ✨</h2>

          <p>Thank you for joining our community of women building calm, beautiful lives.</p>

          <div class="benefits">
            <h3 style="margin-top: 0;">What you'll receive:</h3>
            <ul>
              <li>Weekly affirmations delivered to your inbox</li>
              <li>Curated lifestyle finds and wellness tips</li>
              <li>Early access to new collections</li>
              <li>Exclusive member discounts</li>
            </ul>
          </div>

          <div class="cta">
            <a href="https://lunarituals.com/shop" class="button">Start Shopping</a>
          </div>

          <p style="margin-top: 30px;">With love,<br><strong>The Luna Rituals Team</strong></p>
        </div>

        <div class="footer">
          <p><strong>Luna Rituals</strong> | Affirmations for Intentional Living</p>
          <p style="margin-top: 10px;">
            <a href="https://lunarituals.com">Visit our website</a> |
            <a href="https://lunarituals.com/contact">Contact us</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Email template for popup signup with discount
function getWelcomeEmailWithDiscount(name: string, code: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: #2e2c2a;
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
        }
        .header {
          background: linear-gradient(135deg, #A97E63 0%, #8B6950 100%);
          padding: 40px 20px;
          text-align: center;
        }
        .logo {
          font-family: 'Georgia', serif;
          font-size: 32px;
          color: #ffffff;
          margin: 0;
        }
        .content {
          padding: 40px 30px;
          text-align: center;
        }
        h2 {
          color: #2e2c2a;
          font-size: 28px;
          margin-bottom: 20px;
        }
        .discount-box {
          background: linear-gradient(135deg, #FAF7F4 0%, #F0EBE3 100%);
          padding: 40px 20px;
          border: 3px dashed #A97E63;
          border-radius: 12px;
          margin: 30px 0;
        }
        .discount-label {
          font-size: 14px;
          color: #8B7968;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 15px;
        }
        .code {
          font-size: 42px;
          font-weight: bold;
          color: #A97E63;
          letter-spacing: 4px;
          margin: 10px 0;
          font-family: 'Courier New', monospace;
        }
        .discount-description {
          font-size: 16px;
          color: #47433f;
          margin-top: 15px;
        }
        .cta {
          margin: 30px 0;
        }
        .button {
          display: inline-block;
          background: #A97E63;
          color: #ffffff !important;
          padding: 16px 40px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
        }
        .footer {
          background: #FAF7F4;
          padding: 30px 20px;
          text-align: center;
          font-size: 14px;
          color: #8B7968;
        }
        .footer a {
          color: #A97E63;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="logo">Luna Rituals</h1>
        </div>

        <div class="content">
          <h2>Your 30% Off Code, ${name}! 🎁</h2>

          <p>Welcome to Luna Rituals! We're so glad you're here.</p>

          <div class="discount-box">
            <div class="discount-label">Your Exclusive Discount Code</div>
            <div class="code">${code}</div>
            <div class="discount-description">
              Use at checkout for <strong>30% off your first bundle</strong>
            </div>
          </div>

          <div class="cta">
            <a href="https://lunarituals.com/shop?tab=bundles" class="button">Shop Bundles Now</a>
          </div>

          <p style="margin-top: 40px; font-size: 14px; color: #8B7968;">
            This code is exclusively yours. Save it for when you're ready to shop!
          </p>
        </div>

        <div class="footer">
          <p><strong>Luna Rituals</strong> | Affirmations for Intentional Living</p>
          <p style="margin-top: 10px;">
            <a href="https://lunarituals.com">Visit our website</a> |
            <a href="https://lunarituals.com/contact">Contact us</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}
