import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('📧 SendGrid email service initialized');
} else {
  console.warn('⚠️  SENDGRID_API_KEY not found. Email service disabled.');
  console.warn('💡 Get free API key at: https://sendgrid.com/');
}

// Send order confirmation email
export const sendOrderConfirmation = async (orderData) => {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('⚠️  SendGrid not configured, skipping email');
    return { success: false, error: 'Email service unavailable' };
  }

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

  const msg = {
    to: email,
    from: process.env.EMAIL_USER || 'matehakola@gmail.com',
    subject: `✅ Order Confirmation #${orderNumber} - Coffee House`,
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
          }
          .footer { 
            text-align: center; 
            padding: 30px; 
            color: #666;
            background: #f9fafb;
            border-top: 1px solid #e5e7eb;
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
            <p style="font-size: 16px; color: #666;">We've received your order.</p>
            
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
            
            <center>
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/profile" class="button">View Order Status</a>
            </center>
            
            <p style="margin-top: 30px; color: #666;">
              Need help? Contact us at <a href="mailto:matehakola@gmail.com" style="color: #8B6F47;">matehakola@gmail.com</a>
            </p>
          </div>
          <div class="footer">
            <p style="font-weight: 600; color: #2C1810;">Thank you for choosing Coffee House!</p>
            <p>© ${new Date().getFullYear()} Coffee House. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log('✅ Order confirmation email sent via SendGrid to:', email);
    return { success: true };
  } catch (error) {
    console.error('❌ SendGrid error:', error.response?.body || error.message);
    return { success: false, error: error.message };
  }
};

// Send contact form email
export const sendContactFormEmail = async (contactData) => {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('⚠️  SendGrid not configured, skipping email');
    return { success: false, error: 'Email service unavailable' };
  }

  const { name, email, subject, message } = contactData;

  const msg = {
    to: process.env.EMAIL_USER || 'matehakola@gmail.com',
    from: process.env.EMAIL_USER || 'matehakola@gmail.com',
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

  try {
    await sgMail.send(msg);
    console.log('✅ Contact form email sent via SendGrid');
    return { success: true };
  } catch (error) {
    console.error('❌ SendGrid error:', error.response?.body || error.message);
    return { success: false, error: error.message };
  }
};

// Verify email configuration
export const verifyEmailConfig = async () => {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('⚠️  SENDGRID_API_KEY not configured');
    console.warn('💡 Get free API key at: https://signup.sendgrid.com/');
    console.warn('💡 Then add to Render: SENDGRID_API_KEY=your_key');
    return false;
  }

  console.log('✅ SendGrid email service is ready');
  console.log(`📧 Emails will be sent from: ${process.env.EMAIL_USER || 'matehakola@gmail.com'}`);
  return true;
};
