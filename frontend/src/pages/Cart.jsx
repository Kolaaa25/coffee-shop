import { Link } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import CartItem from '../components/CartItem';
import { formatPrice } from '../utils/helpers';

const Cart = () => {
  const { items, getTotal, clearCart } = useCartStore();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-20 bg-gradient-to-b from-cream-light to-white">
        <div className="text-center animate-fade-in">
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="w-32 h-32 bg-gradient-to-br from-brown/20 to-brown-dark/20 rounded-full flex items-center justify-center mx-auto animate-float">
                <svg className="w-16 h-16 text-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Your cart is empty
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-md mx-auto">
            Looks like you haven't added any delicious items yet. Start exploring our menu!
          </p>
          <Link to="/menu" className="btn-primary px-10 py-4 text-lg hover-lift inline-flex items-center gap-2 shadow-xl">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
            </svg>
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-light via-white to-cream-light py-16 animate-fade-in">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-serif font-bold text-primary mb-3">
            Shopping Cart
          </h1>
          <p className="text-gray-600 text-lg">
            Review your items before checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={clearCart}
                className="flex items-center gap-2 text-red-500 hover:text-red-700 font-semibold transition-all hover:scale-105 px-4 py-2 hover:bg-red-50 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear Cart
              </button>
              
              <div className="text-gray-600">
                <span className="font-semibold">{items.length}</span> {items.length === 1 ? 'item' : 'items'}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white to-cream-light rounded-2xl shadow-2xl p-4 sm:p-5 sticky top-24 border border-gray-100">
              <div className="flex items-center gap-2 sm:gap-3 mb-6">
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-brown to-brown-dark rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-cream" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-primary leading-tight">
                  Order Summary
                </h2>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-2.5 border-b border-gray-200 min-w-0">
                  <span className="text-gray-600 text-xs flex-shrink-0">Subtotal</span>
                  <span className="font-semibold text-xs text-gray-900 whitespace-nowrap ml-2">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-gray-200 min-w-0">
                  <span className="text-gray-600 text-xs flex-shrink-0">Delivery Fee</span>
                  {total > 25 ? (
                    <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold text-xs text-green-600 whitespace-nowrap">FREE</span>
                    </div>
                  ) : (
                    <span className="font-semibold text-xs text-gray-900 whitespace-nowrap ml-2">{formatPrice(5)}</span>
                  )}
                </div>
                
                {total > 25 && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-green-700 font-medium">
                      Congrats! You've qualified for free delivery
                    </p>
                  </div>
                )}
                
                {total <= 25 && total > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-blue-700 font-medium">
                      Add {formatPrice(25 - total)} more for free delivery!
                    </p>
                  </div>
                )}
                
                <div className="bg-gradient-to-r from-brown/10 to-brown-dark/10 rounded-xl p-4 mt-4">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-base sm:text-lg font-bold text-primary flex-shrink-0">Total</span>
                    <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-brown to-brown-dark bg-clip-text text-transparent whitespace-nowrap">
                      {formatPrice(total > 25 ? total : total + 5)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Link 
                  to="/checkout" 
                  className="btn-primary w-full text-center text-lg py-4 hover-lift shadow-xl inline-flex items-center justify-center gap-2 group"
                >
                  <span>Proceed to Checkout</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>

                <Link
                  to="/menu"
                  className="btn-outline w-full text-center py-4 hover:bg-primary hover:text-cream inline-flex items-center justify-center gap-2 group"
                >
                  <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
              
              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-8 h-8 text-brown" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-gray-600 font-medium">Secure Checkout</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-8 h-8 text-brown" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                    </svg>
                    <span className="text-xs text-gray-600 font-medium">Fast Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
