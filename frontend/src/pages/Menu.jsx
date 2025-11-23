import { useEffect, useState } from 'react';
import { menuService } from '../services/menu';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { coffeeIcon, menuHeaderImage } from '../config/icons';

const Menu = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        console.log('🍽️ [Menu] Starting to fetch menu items...');
        const response = await menuService.getAllItems();
        console.log('🍽️ [Menu] Menu response:', response);
        setItems(response.data);
        setFilteredItems(response.data);
        console.log('✅ [Menu] Menu items loaded:', response.data.length, 'items');
      } catch (error) {
        console.error('❌ [Menu] Error fetching menu:', error);
        console.error('❌ [Menu] Error details:', {
          message: error.message,
          response: error.response,
          request: error.request
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const filterByCategory = (category) => {
    setActiveCategory(category);
    if (category === 'all') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter((item) => item.category === category));
    }
  };

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'coffee', label: 'Coffee' },
    { id: 'dessert', label: 'Desserts' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-cream-light to-white">
      {/* Hero Section */}
      <div 
        className="relative h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] xl:h-[80vh] overflow-hidden" 
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(44, 25, 15, 0.6), rgba(139, 111, 71, 0.5)), url('${menuHeaderImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Additional overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-brown/20"></div>
        
        <div className="container-custom relative z-10 h-full flex items-center justify-center px-4 sm:px-6 md:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <div className="mb-4 sm:mb-6 md:mb-8 backdrop-blur-sm bg-white/10 rounded-full inline-block p-3 sm:p-4 md:p-5">
              <img 
                src={coffeeIcon}
                alt="Coffee Icon"
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto animate-float drop-shadow-xl transition-all duration-300"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-serif font-bold mb-3 sm:mb-4 md:mb-6 lg:mb-8 leading-tight text-white px-2" 
                style={{
                  textShadow: '0 4px 8px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3), 0 8px 16px rgba(0,0,0,0.2)'
                }}>
              Our Menu
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto font-light leading-relaxed px-4 sm:px-6 md:px-8 text-white backdrop-blur-sm bg-black/20 rounded-xl md:rounded-2xl py-3 sm:py-4 md:py-5"
               style={{
                 textShadow: '0 2px 4px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.4)'
               }}>
              Explore our carefully curated selection of premium coffee and artisan desserts,
              crafted with passion and expertise
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12 md:mb-16 px-2">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => filterByCategory(category.id)}
              className={`group relative px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-brown to-brown-dark text-cream shadow-2xl scale-105'
                  : 'bg-white text-primary border-2 border-brown hover:border-brown-dark shadow-lg hover:shadow-xl'
              }`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {activeCategory === category.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-brown to-brown-dark rounded-xl md:rounded-2xl animate-pulse-glow"></div>
              )}
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                {category.id === 'all' && (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                )}
                {category.id === 'coffee' && (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 110 4H4a2 2 0 01-2-2zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 110 4H4a2 2 0 01-2-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                  </svg>
                )}
                {category.id === 'dessert' && (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                  </svg>
                )}
                {category.label}
              </span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <Loading />
        ) : (
          <>
            {filteredItems.length === 0 ? (
              <div className="text-center py-20">
                <div className="mb-6">
                  <svg className="w-24 h-24 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-2xl text-gray-600 font-medium">No items found in this category</p>
                <p className="text-gray-500 mt-2">Try selecting a different category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-0">
                {filteredItems.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
