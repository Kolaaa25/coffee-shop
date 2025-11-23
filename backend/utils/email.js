import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

// Debug: Check environment variables
console.log('🔍 Checking SendGrid configuration...');
console.log('SENDGRID_API_KEY exists:', !!process.env.SENDGRID_API_KEY);
console.log('SENDGRID_FROM_EMAIL:', process.env.SENDGRID_FROM_EMAIL);

// Initialize SendGrid
let emailConfigured = false;

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  emailConfigured = true;
  console.log('✅ SendGrid API configured');
} else {
  console.warn('⚠️  SENDGRID_API_KEY not configured - emails will not be sent');
}

// Helper to send email using SendGrid
async function sendEmail(mailOptions) {
  if (!emailConfigured) {
    console.warn('⚠️  SendGrid not configured, skipping email');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    // Convert nodemailer format to SendGrid format
    const msg = {
      to: mailOptions.to,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || 'noreply@coffeehouse.com',
        name: 'Coffee House'
      },
      subject: mailOptions.subject,
      html: mailOptions.html,
      text: mailOptions.text || mailOptions.html.replace(/<[^>]*>/g, ''), // Plain text version
      replyTo: mailOptions.replyTo || process.env.SENDGRID_FROM_EMAIL,
      // Anti-spam settings
      trackingSettings: {
        clickTracking: { enable: false },
        openTracking: { enable: false },
        subscriptionTracking: {
          enable: false
        }
      },
      mailSettings: {
        sandboxMode: { enable: false },
        bypassListManagement: { enable: false }
      },
      // Email categories for analytics
      categories: ['order-confirmation']
    };

    await sgMail.send(msg);
    console.log('✅ Email sent via SendGrid to:', mailOptions.to);
    return { success: true };
  } catch (error) {
    console.error('❌ SendGrid error:', error.message);
    if (error.response) {
      console.error('SendGrid response:', error.response.body);
    }
    return { success: false, error: error.message };
  }
}

// Send order confirmation email
export const sendOrderConfirmation = async (orderData) => {
  const { email, name, orderNumber, items, totalAmount, deliveryAddress } = orderData;

  const itemsList = items
    .map(
      (item) =>
        `<tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>`
    )
    .join('');

  const mailOptions = {
    to: email,
    subject: `Order Confirmation #${orderNumber} - Coffee House`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0;
            padding: 0;
            background: #f5f5f5;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: #fff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #2C1810 0%, #4A2C1F 100%);
            color: #F5EDE0; 
            padding: 40px 30px; 
            text-align: center; 
          }
          .header h1 { 
            margin: 0; 
            font-size: 32px; 
            font-weight: 700;
          }
          .header p { 
            margin: 10px 0 0; 
            font-size: 18px; 
            opacity: 0.9;
          }
          .content { 
            padding: 40px 30px; 
          }
          .success-badge {
            background: #10B981;
            color: white;
            padding: 8px 20px;
            border-radius: 20px;
            display: inline-block;
            font-weight: 600;
            font-size: 14px;
            margin-bottom: 20px;
          }
          .order-details { 
            background: linear-gradient(135deg, #F5EDE0 0%, #FAF7F2 100%);
            padding: 25px; 
            border-radius: 12px; 
            margin: 25px 0;
            border: 1px solid #E8DCC8;
          }
          .order-number {
            font-size: 24px;
            font-weight: 700;
            color: #8B6F47;
            margin-bottom: 15px;
          }
          .items-table { 
            width: 100%; 
            margin: 20px 0;
            border-collapse: collapse;
          }
          .items-table th {
            background: #2C1810;
            color: #F5EDE0;
            padding: 12px;
            text-align: left;
            font-weight: 600;
          }
          .items-table th:last-child,
          .items-table td:last-child {
            text-align: right;
          }
          .items-table td {
            padding: 12px;
            border-bottom: 1px solid #eee;
          }
          .total-row { 
            background: #FFF9F0;
            font-size: 20px; 
            font-weight: 700; 
            color: #8B6F47; 
          }
          .delivery-info {
            background: #EFF6FF;
            border-left: 4px solid #3B82F6;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .delivery-info strong {
            color: #1E40AF;
            display: block;
            margin-bottom: 8px;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #8B6F47 0%, #6B5232 100%);
            color: white;
            padding: 14px 32px;
            text-decoration: none;
            border-radius: 8px;
            margin: 20px 0;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 4px 12px rgba(139, 111, 71, 0.3);
          }
          .info-box {
            background: #F0FDF4;
            border-left: 4px solid #10B981;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .footer { 
            text-align: center; 
            padding: 30px; 
            color: #666;
            background: #f9fafb;
            border-top: 1px solid #e5e7eb;
          }
          .footer p {
            margin: 5px 0;
            font-size: 14px;
          }
          .social-links {
            margin: 15px 0;
          }
          .social-links a {
            display: inline-block;
            margin: 0 8px;
            color: #8B6F47;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>☕ Coffee House</h1>
            <p>Order Confirmation</p>
          </div>
          <div class="content">
            <div class="success-badge">✓ Order Confirmed</div>
            <h2 style="color: #2C1810; margin: 0 0 10px;">Thank you, ${name}!</h2>
            <p style="font-size: 16px; color: #666;">We've received your order and we're getting it ready with care.</p>
            
            <div class="order-details">
              <div class="order-number">Order #${orderNumber}</div>
              <p style="margin: 0; color: #666; font-size: 14px;">
                <strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            ${deliveryAddress ? `
            <div class="delivery-info">
              <strong>📍 Delivery Address</strong>
              <p style="margin: 5px 0 0;">${deliveryAddress}</p>
            </div>
            ` : ''}
            
            <table class="items-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th style="text-align: center;">Quantity</th>
                  <th style="text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsList}
                <tr class="total-row">
                  <td colspan="2" style="padding: 15px;"><strong>Total Amount</strong></td>
                  <td style="padding: 15px;"><strong>$${totalAmount.toFixed(2)}</strong></td>
                </tr>
              </tbody>
            </table>
            
            <div class="info-box">
              <strong style="color: #10B981;">✓ What happens next?</strong>
              <p style="margin: 8px 0 0; color: #666;">
                Our expert baristas are preparing your order with premium beans and artisan care. 
                You'll receive another email when your order is on its way!
              </p>
            </div>

            <center>
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/profile" class="button">View Order Status</a>
            </center>
            
            <p style="margin-top: 30px; color: #666; font-size: 14px;">
              <strong>Questions about your order?</strong><br>
              Contact our customer service team at <a href="mailto:${process.env.SENDGRID_FROM_EMAIL}" style="color: #8B6F47; text-decoration: none;">${process.env.SENDGRID_FROM_EMAIL}</a>
              <br>We're here to help Monday-Sunday, 8 AM - 8 PM
            </p>
            
            <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
              This email was sent because you placed an order at Coffee House. 
              Your order details are confidential and intended only for you.
              <br><br>
              Coffee House - Premium Coffee & Beverages<br>
              Order ID: ${orderNumber}
            </p>
          </div>
          <div class="footer">
            <p style="font-weight: 600; color: #2C1810;">Thank you for choosing Coffee House!</p>
            <div class="social-links">
              <a href="#">Facebook</a> • 
              <a href="#">Instagram</a> • 
              <a href="#">Twitter</a>
            </div>
            <p>© ${new Date().getFullYear()} Coffee House. All rights reserved.</p>
            <p>123 Coffee Street, Bean City, BC 12345</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  return await sendEmail(mailOptions);
};

// Send contact form email
export const sendContactFormEmail = async (contactData) => {
  const { name, email, subject, message } = contactData;

  const mailOptions = {
    from: `Coffee House Contact <${process.env.SENDGRID_FROM_EMAIL || process.env.EMAIL_USER || 'noreply@coffeehouse.com'}>`,
    to: process.env.SENDGRID_FROM_EMAIL || process.env.EMAIL_USER || 'matehakola@gmail.com',
    replyTo: email,
    subject: `Contact Form: ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2C1810; color: #F5EDE0; padding: 20px; }
          .content { padding: 30px; background: #fff; }
          .info { background: #F5EDE0; padding: 15px; border-radius: 8px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
          </div>
          <div class="content">
            <div class="info">
              <p><strong>From:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
            <h3>Message:</h3>
            <p>${message}</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  return await sendEmail(mailOptions);
};

// Verify email configuration
export const verifyEmailConfig = async () => {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('⚠️  SENDGRID_API_KEY not configured');
    console.warn('💡 Add SENDGRID_API_KEY to environment variables');
    return false;
  }

  if (!emailConfigured) {
    console.warn('⚠️  SendGrid not initialized');
    return false;
  }

  console.log('✅ SendGrid email service is ready');
  console.log(`📧 From email: ${process.env.SENDGRID_FROM_EMAIL || 'not set'}`);
  return true;
};
