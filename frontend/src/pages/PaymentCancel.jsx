import { Link } from 'react-router-dom';

const PaymentCancel = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 animate-fade-in">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Cancel Icon */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-serif font-bold text-primary mb-4">
            Payment Cancelled
          </h1>

          <p className="text-gray-600 mb-6">
            Your payment was cancelled. No charges were made to your account.
            Your cart items are still saved.
          </p>

          <div className="bg-cream rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              If you experienced any issues during checkout, please contact our
              support team for assistance.
            </p>
          </div>

          <div className="space-y-3">
            <Link to="/cart" className="btn-primary w-full text-center block">
              Return to Cart
            </Link>
            <Link
              to="/menu"
              className="btn-outline w-full text-center block"
            >
              Continue Shopping
            </Link>
            <Link
              to="/contact"
              className="text-brown hover:text-brown-dark font-medium transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
