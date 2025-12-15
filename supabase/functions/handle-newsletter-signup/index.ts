import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NewsletterSignupRequest {
  email: string;
  firstName?: string;
  source?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, firstName, source }: NewsletterSignupRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Processing newsletter signup:", { email, firstName, source });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Generate a discount code
    const discountCode = `WELCOME${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Store subscriber in database
    const { error: dbError } = await supabase
      .from("subscribers")
      .upsert(
        {
          email,
          first_name: firstName || null,
          source: source || "newsletter",
          discount_code: discountCode,
          status: "active",
        },
        { onConflict: "email" }
      );

    if (dbError) {
      console.error("Database error:", dbError);
      // Continue anyway - we still want to send the email
    }

    // Send welcome email
    const emailResponse = await resend.emails.send({
      from: "Luna Rituals <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to The Ritual! 🌙",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #FAF8F5; font-family: Georgia, 'Times New Roman', serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="color: #8B6B54; font-size: 28px; font-weight: normal; margin: 0;">Luna Rituals</h1>
            </div>
            
            <div style="background-color: #FFFFFF; border-radius: 8px; padding: 40px; border: 1px solid #EBDDD1;">
              <h2 style="color: #3D3D3D; font-size: 24px; font-weight: normal; margin: 0 0 20px 0;">
                ${firstName ? `Welcome, ${firstName}!` : "Welcome to The Ritual!"}
              </h2>
              
              <p style="color: #6B6B6B; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Thank you for joining our community. We're so glad you're here.
              </p>
              
              <p style="color: #6B6B6B; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Each week, you'll receive curated reflections, new affirmations, and thoughtfully selected finds to support your journey toward inner peace.
              </p>
              
              <div style="background-color: #FAF8F5; border-radius: 8px; padding: 24px; margin: 24px 0; text-align: center;">
                <p style="color: #6B6B6B; font-size: 14px; margin: 0 0 8px 0;">Your exclusive welcome gift:</p>
                <p style="color: #8B6B54; font-size: 24px; font-weight: bold; margin: 0 0 8px 0;">${discountCode}</p>
                <p style="color: #6B6B6B; font-size: 14px; margin: 0;">Use this code for 30% off your first affirmation bundle</p>
              </div>
              
              <p style="color: #6B6B6B; font-size: 16px; line-height: 1.6; margin: 0;">
                With warmth,<br>
                <span style="color: #8B6B54;">The Luna Rituals Team</span>
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 32px;">
              <p style="color: #9B9B9B; font-size: 12px; margin: 0;">
                © 2024 Luna Rituals. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Successfully subscribed",
        discountCode 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in handle-newsletter-signup:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
