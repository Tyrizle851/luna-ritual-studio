import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Generate HTML email template for order confirmation with download links
 * @param {Object} orderDetails - Order details {orderNumber, customerEmail, items, total}
 * @returns {string} HTML email template
 */
function generateOrderEmailHTML(orderDetails) {
  const { orderNumber, customerEmail, items, total } = orderDetails;

  const itemsHTML = items.map(item => `
    <tr>
      <td style="padding: 20px 0; border-bottom: 1px solid #f0e9e1;">
        <div style="display: flex; align-items: center;">
          <div style="flex: 1;">
            <h3 style="margin: 0 0 8px 0; color: #8b7355; font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 600;">
              ${item.title}
            </h3>
            <p style="margin: 0; color: #666; font-size: 14px;">
              Quantity: ${item.quantity}
            </p>
          </div>
          <div style="text-align: right;">
            <a href="${item.downloadUrl}"
               style="display: inline-block; background: #8b7355; color: white; text-decoration: none;
                      padding: 10px 20px; border-radius: 4px; font-weight: 500; font-size: 14px;">
              Download
            </a>
          </div>
        </div>
      </td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your LunaRituals Affirmations Are Ready</title>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                 background-color: #faf8f5; color: #4a4a4a; line-height: 1.6;">

      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 20px;">

            <!-- Main Container -->
            <table role="presentation" style="max-width: 600px; width: 100%; background: white; border-radius: 8px;
                                               box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">

              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #f0e9e1 0%, #e8dcc8 100%); padding: 40px 40px 30px; text-align: center;">
                  <h1 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700;
                              color: #8b7355; letter-spacing: -0.5px;">
                    Your Affirmations Are Ready
                  </h1>
                  <p style="margin: 12px 0 0; font-size: 16px; color: #8b7355; font-weight: 300;">
                    Start your ritual
                  </p>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px;">

                  <p style="margin: 0 0 24px; font-size: 16px; color: #4a4a4a;">
                    Thank you for your purchase, ${customerEmail}!
                  </p>

                  <p style="margin: 0 0 32px; font-size: 15px; color: #666; line-height: 1.7;">
                    Your affirmations are ready to download. Each image is high-resolution and perfect for printing,
                    framing, or setting as your phone background. Save them to a special place where you'll see them daily.
                  </p>

                  <!-- Order Details -->
                  <div style="background: #faf8f5; border-radius: 6px; padding: 24px; margin-bottom: 32px;">
                    <h2 style="margin: 0 0 16px; font-family: 'Playfair Display', serif; font-size: 20px;
                                font-weight: 600; color: #8b7355;">
                      Order Details
                    </h2>
                    <table role="presentation" style="width: 100%; font-size: 14px;">
                      <tr>
                        <td style="padding: 8px 0; color: #666;">Order Number:</td>
                        <td style="padding: 8px 0; text-align: right; font-weight: 500; color: #4a4a4a;">#${orderNumber}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666;">Email:</td>
                        <td style="padding: 8px 0; text-align: right; font-weight: 500; color: #4a4a4a;">${customerEmail}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666;">Total:</td>
                        <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #8b7355; font-size: 16px;">
                          $${total.toFixed(2)}
                        </td>
                      </tr>
                    </table>
                  </div>

                  <!-- Downloads -->
                  <h2 style="margin: 0 0 20px; font-family: 'Playfair Display', serif; font-size: 22px;
                              font-weight: 600; color: #8b7355;">
                    Your Downloads
                  </h2>

                  <table role="presentation" style="width: 100%;">
                    ${itemsHTML}
                  </table>

                  <!-- Tips -->
                  <div style="margin-top: 40px; padding: 24px; background: #fef5e7; border-left: 4px solid #d4a574; border-radius: 4px;">
                    <h3 style="margin: 0 0 12px; font-family: 'Playfair Display', serif; font-size: 18px;
                                font-weight: 600; color: #8b7355;">
                      Tips for Your Ritual
                    </h3>
                    <ul style="margin: 0; padding-left: 20px; color: #666; line-height: 1.8;">
                      <li>Print your affirmations on high-quality paper for a tactile experience</li>
                      <li>Frame them and place in spaces you visit daily</li>
                      <li>Set as your phone wallpaper for gentle reminders throughout the day</li>
                      <li>Read them aloud each morning to set your intention</li>
                    </ul>
                  </div>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background: #faf8f5; padding: 32px 40px; text-align: center; border-top: 1px solid #f0e9e1;">
                  <p style="margin: 0 0 16px; font-size: 14px; color: #666;">
                    Need help? Reply to this email or visit our support page.
                  </p>
                  <p style="margin: 0; font-size: 13px; color: #999;">
                    LunaRituals &copy; ${new Date().getFullYear()} &middot; Rituals for the modern soul
                  </p>
                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>

    </body>
    </html>
  `;
}

/**
 * Generate HTML email template for lead magnet (free affirmation)
 * @param {string} customerEmail - Customer email
 * @param {string} downloadUrl - Download URL for the free affirmation
 * @returns {string} HTML email template
 */
function generateLeadMagnetEmailHTML(customerEmail, downloadUrl) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Free Affirmation Awaits</title>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                 background-color: #faf8f5; color: #4a4a4a; line-height: 1.6;">

      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 20px;">

            <table role="presentation" style="max-width: 600px; width: 100%; background: white; border-radius: 8px;
                                               box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #f0e9e1 0%, #e8dcc8 100%); padding: 40px; text-align: center;">
                  <h1 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700;
                              color: #8b7355;">
                    Welcome to LunaRituals
                  </h1>
                  <p style="margin: 16px 0 0; font-size: 18px; color: #8b7355; font-weight: 300; font-style: italic;">
                    Your free affirmation is here
                  </p>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px;">

                  <p style="margin: 0 0 24px; font-size: 16px; color: #4a4a4a;">
                    Hello ${customerEmail},
                  </p>

                  <p style="margin: 0 0 24px; font-size: 15px; color: #666; line-height: 1.8;">
                    Thank you for joining our community. As promised, here's your free affirmation:
                    <strong>"I am worthy of rest"</strong>.
                  </p>

                  <p style="margin: 0 0 32px; font-size: 15px; color: #666; line-height: 1.8;">
                    This gentle reminder is yours to keep. Print it, frame it, or set it as your daily reminder.
                    Rest is not earned &mdash; it's your birthright.
                  </p>

                  <!-- Download Button -->
                  <div style="text-align: center; margin: 40px 0;">
                    <a href="${downloadUrl}"
                       style="display: inline-block; background: #8b7355; color: white; text-decoration: none;
                              padding: 16px 40px; border-radius: 6px; font-weight: 500; font-size: 16px;
                              box-shadow: 0 4px 12px rgba(139, 115, 85, 0.3);">
                      Download Your Affirmation
                    </a>
                  </div>

                  <div style="margin-top: 40px; padding: 24px; background: #fef5e7; border-left: 4px solid #d4a574; border-radius: 4px;">
                    <h3 style="margin: 0 0 12px; font-family: 'Playfair Display', serif; font-size: 18px;
                                font-weight: 600; color: #8b7355;">
                      What's Next?
                    </h3>
                    <p style="margin: 0; color: #666; line-height: 1.7;">
                      Explore our collection of curated affirmations designed for modern souls seeking calm,
                      clarity, and connection. Each piece is thoughtfully crafted to bring beauty and intention
                      into your daily rituals.
                    </p>
                  </div>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background: #faf8f5; padding: 32px 40px; text-align: center; border-top: 1px solid #f0e9e1;">
                  <p style="margin: 0 0 16px; font-size: 14px; color: #666;">
                    We're honored to be part of your journey.
                  </p>
                  <p style="margin: 0; font-size: 13px; color: #999;">
                    LunaRituals &copy; ${new Date().getFullYear()} &middot; Rituals for the modern soul
                  </p>
                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>

    </body>
    </html>
  `;
}

/**
 * Send order confirmation email with download links
 * @param {Object} orderDetails - Order details {orderNumber, customerEmail, items, total}
 * @returns {Promise<Object>} Result of email send
 */
export async function sendOrderConfirmationEmail(orderDetails) {
  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: orderDetails.customerEmail,
      subject: 'Your LunaRituals affirmations are ready ✨',
      html: generateOrderEmailHTML(orderDetails),
    });

    return {
      success: true,
      messageId: result.id,
    };
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Send lead magnet email (free affirmation)
 * @param {string} customerEmail - Customer email
 * @param {string} downloadUrl - Download URL
 * @returns {Promise<Object>} Result of email send
 */
export async function sendLeadMagnetEmail(customerEmail, downloadUrl) {
  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: customerEmail,
      subject: 'Your free affirmation is here 🌙',
      html: generateLeadMagnetEmailHTML(customerEmail, downloadUrl),
    });

    return {
      success: true,
      messageId: result.id,
    };
  } catch (error) {
    console.error('Failed to send lead magnet email:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export default resend;
