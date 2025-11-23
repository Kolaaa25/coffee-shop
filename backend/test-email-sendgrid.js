import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔍 Testing SendGrid email...');
console.log('SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? 'EXISTS (length: ' + process.env.SENDGRID_API_KEY.length + ')' : 'NOT SET');
console.log('SENDGRID_FROM_EMAIL:', process.env.SENDGRID_FROM_EMAIL);

if (!process.env.SENDGRID_API_KEY) {
  console.error('❌ SENDGRID_API_KEY is not set!');
  process.exit(1);
}

if (!process.env.SENDGRID_FROM_EMAIL) {
  console.error('❌ SENDGRID_FROM_EMAIL is not set!');
  process.exit(1);
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'tanyababiy25@gmail.com', // Ваш email
  from: process.env.SENDGRID_FROM_EMAIL, // Має бути той самий email, що ви верифікували в SendGrid
  subject: '🧪 Test Email from Coffee Shop',
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px;">
        <h1 style="color: #2C1810;">✅ SendGrid Test Successful!</h1>
        <p>This is a test email from your Coffee Shop backend.</p>
        <p><strong>If you received this, SendGrid is working correctly!</strong></p>
        <p style="color: #666; margin-top: 20px;">Sent at: ${new Date().toLocaleString()}</p>
      </div>
    </div>
  `,
};

console.log('📧 Sending test email...');
console.log('To:', msg.to);
console.log('From:', msg.from);

sgMail
  .send(msg)
  .then((response) => {
    console.log('✅ Email sent successfully!');
    console.log('Status Code:', response[0].statusCode);
    console.log('Headers:', response[0].headers);
    console.log('\n🎉 Success! Check your inbox at tanyababiy25@gmail.com');
  })
  .catch((error) => {
    console.error('❌ Error sending email:');
    console.error('Error message:', error.message);
    if (error.response) {
      console.error('Error body:', error.response.body);
    }
  });
