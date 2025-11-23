import { useCartStore } from '../stores/cartStore';
import { formatPrice } from '../utils/helpers';

const CartItem = ({ item }) => {
  const { removeItem, increaseQuantity, decreaseQuantity } = useCartStore();

  return (
    <div className="bg-gradient-to-r from-white to-cream-light rounded-2xl shadow-lg hover:shadow-2xl p-6 flex flex-col md:flex-row items-center gap-6 animate-slide-in transition-all duration-300 hover-lift border border-gray-100">
      {/* Image */}
      <div className="relative group shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brown/20 to-brown-dark/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <img
          src={item.image}
          alt={item.name}
          className="w-32 h-32 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=300&fit=crop&q=80';
          }}
        />
        <div className="absolute top-2 right-2 bg-brown text-white px-2 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
          x{item.quantity}
        </div>
      </div>

      {/* Details */}
      <div className="flex-grow text-center md:text-left">
        <h3 className="text-2xl font-serif font-bold text-primary mb-2 group-hover:text-brown transition-colors">
          {item.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center gap-2 justify-center md:justify-start">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Unit Price:</span>
          <span className="text-brown font-bold text-lg">{formatPrice(item.price)}</span>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-4 bg-cream-light px-6 py-3 rounded-xl shadow-inner">
        <button
          onClick={() => decreaseQuantity(item.id)}
          className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light text-cream rounded-full hover:shadow-lg transition-all flex items-center justify-center font-bold text-xl hover:scale-110 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
          </svg>
        </button>
        <div className="text-center">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Qty</div>
          <span className="text-2xl font-bold text-primary">{item.quantity}</span>
        </div>
        <button
          onClick={() => increaseQuantity(item.id)}
          className="w-10 h-10 bg-gradient-to-br from-brown to-brown-dark text-cream rounded-full hover:shadow-lg transition-all flex items-center justify-center font-bold text-xl hover:scale-110 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeItem(item.id)}
        className="text-red-500 hover:text-red-700 transition-all p-3 hover:bg-red-50 rounded-xl group/btn"
        title="Remove item"
      >
        <svg
          className="w-7 h-7 group-hover/btn:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>

      {/* Subtotal */}
      <div className="text-center md:text-right min-w-[120px] bg-gradient-to-br from-brown/10 to-brown-dark/10 px-6 py-4 rounded-xl">
        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Subtotal</div>
        <p className="text-xl font-bold bg-gradient-to-r from-brown to-brown-dark bg-clip-text text-transparent">
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
