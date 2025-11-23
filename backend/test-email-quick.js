// Quick email test - запусти це щоб протестувати email
import { sendOrderConfirmation } from './utils/email.js';

const testEmail = async () => {
  console.log('\n🧪 Testing email configuration...\n');
  
  console.log('Environment variables:');
  console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✅ Set' : '❌ Missing');
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Set' : '❌ Missing');
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('\n❌ Email credentials not configured!');
    console.log('Add these to Render Environment Variables:');
    console.log('EMAIL_USER=matehakola@gmail.com');
    console.log('EMAIL_PASS=your_app_password_from_gmail');
    process.exit(1);
  }
  
  console.log('\n📧 Sending test email...\n');
  
  try {
    await sendOrderConfirmation({
      email: process.env.EMAIL_USER, // Send to yourself
      name: 'Test User',
      orderNumber: 'TEST-123',
      items: [
        { name: 'Espresso', price: 3.50, quantity: 1 },
        { name: 'Cappuccino', price: 4.50, quantity: 2 }
      ],
      totalAmount: 12.50,
      deliveryAddress: '123 Test Street, Test City'
    });
    
    console.log('\n✅ Email sent successfully!');
    console.log('Check your inbox:', process.env.EMAIL_USER);
    
  } catch (error) {
    console.error('\n❌ Email failed:', error.message);
    console.error('Full error:', error);
    
    if (error.message.includes('Invalid login')) {
      console.log('\n💡 Solution: Generate Gmail App Password:');
      console.log('1. Go to: https://myaccount.google.com/apppasswords');
      console.log('2. Create new App Password for "Mail"');
      console.log('3. Copy 16-char code (no spaces!)');
      console.log('4. Add to Render: EMAIL_PASS=your_code');
    }
    
    process.exit(1);
  }
};

testEmail();
