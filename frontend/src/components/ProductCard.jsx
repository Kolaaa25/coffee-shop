import { useCartStore } from '../stores/cartStore';
import { formatPrice } from '../utils/helpers';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} added to cart!`, {
      icon: '✓',
      style: {
        background: '#2C190F',
        color: '#F5EDE0',
      },
    });
  };

  return (
    <div className="card group relative overflow-hidden hover-lift bg-gradient-to-br from-white to-cream-light">
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      
      {/* Image */}
      <div className="relative overflow-hidden h-72">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-90 group-hover:rotate-1 transition-all duration-700"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {product.popular && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-brown to-brown-dark text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl animate-pulse-glow">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Popular
            </span>
          </div>
        )}
        
        {/* Quick View Badge */}
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <span className="glass-effect text-white px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-md">
            Quick View
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-2xl font-serif font-bold text-primary group-hover:text-brown transition-colors duration-300 flex-1">
            {product.name}
          </h3>
          <div className="ml-2">
            <svg className="w-6 h-6 text-brown opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Category Badge */}
        {product.category && (
          <div className="mb-4">
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
              {product.category}
            </span>
          </div>
        )}

        {/* Price and Button */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
          <div>
            <div className="text-xs text-gray-500 mb-1">Price</div>
            <span className="text-3xl font-bold bg-gradient-to-r from-brown to-brown-dark bg-clip-text text-transparent">
              {formatPrice(product.price)}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-primary to-primary-light text-cream px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold transform hover:scale-105 flex items-center gap-2 group/btn"
          >
            <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
