import { useEffect, useState, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { paymentService } from '../services/payment';
import { orderService } from '../services/orders';
import { useCartStore } from '../stores/cartStore';
import Loading from '../components/Loading';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [orderCreated, setOrderCreated] = useState(false);
  const { clearCart } = useCartStore();
  const orderCreationInProgress = useRef(false);

  useEffect(() => {
    const verifyPaymentAndCreateOrder = async () => {
      if (!sessionId || orderCreated || orderCreationInProgress.current) {
        setLoading(false);
        return;
      }

      // Check if order already created for this session
      const processedSession = sessionStorage.getItem(`order_${sessionId}`);
      if (processedSession) {
        console.log('✅ Order already processed for this session');
        setLoading(false);
        return;
      }

      // Mark as in progress to prevent duplicate calls
      orderCreationInProgress.current = true;

      try {
        // Verify payment session
        const paymentData = await paymentService.verifySession(sessionId);

        // Get cart items and delivery details from localStorage
        const savedCart = localStorage.getItem('cart-storage');
        const savedDeliveryDetails = localStorage.getItem('deliveryDetails');

        if (savedCart) {
          const cartData = JSON.parse(savedCart);
          const items = cartData.state?.items || [];
          
          if (items.length > 0) {
            const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            console.log('📦 Creating order with total:', total);
            
            const deliveryDetails = savedDeliveryDetails 
              ? JSON.parse(savedDeliveryDetails)
              : {
                  fullName: paymentData.session?.customerEmail || 'Guest',
                  email: paymentData.session?.customerEmail || 'guest@example.com',
                  address: 'N/A',
                  city: 'N/A',
                  zipCode: 'N/A',
                  phone: 'N/A'
                };

            await orderService.createOrder({
              items: items,
              totalAmount: total,
              deliveryDetails: deliveryDetails,
              paymentIntentId: sessionId,
            });

            // Mark this session as processed
            sessionStorage.setItem(`order_${sessionId}`, 'true');
            setOrderCreated(true);
            
            // Clear cart and delivery details after successful order
            clearCart();
            localStorage.removeItem('deliveryDetails');
            
            console.log('✅ Order created successfully');
          }
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        orderCreationInProgress.current = false; // Reset on error
      } finally {
        setLoading(false);
      }
    };

    verifyPaymentAndCreateOrder();
  }, [sessionId, orderCreated, clearCart]);

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 animate-fade-in">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-serif font-bold text-primary mb-4">
            Payment Successful!
          </h1>

          <p className="text-gray-600 mb-6">
            Thank you for your order! Your payment has been processed
            successfully. We'll start preparing your order right away.
          </p>

          <div className="bg-cream rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              A confirmation email has been sent to your email address with
              order details and tracking information.
            </p>
          </div>

          <div className="space-y-3">
            <Link to="/profile" className="btn-primary w-full text-center block">
              View Order History
            </Link>
            <Link
              to="/menu"
              className="btn-outline w-full text-center block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
