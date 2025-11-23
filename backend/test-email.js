import { sendOrderConfirmation } from './utils/email.js';

const testEmail = async () => {
  console.log('🧪 Testing email functionality...\n');

  const testOrder = {
    email: 'matehakola@gmail.com',
    name: 'Test User',
    orderNumber: '12345',
    items: [
      { name: 'Cappuccino', quantity: 2, price: 4.50 },
      { name: 'Chocolate Cake', quantity: 1, price: 5.99 }
    ],
    totalAmount: 14.99,
    deliveryAddress: '123 Test Street, Test City'
  };

  try {
    const result = await sendOrderConfirmation(testOrder);
    console.log('✅ Email sent successfully!');
    console.log('Result:', result);
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
  }
};

testEmail();
