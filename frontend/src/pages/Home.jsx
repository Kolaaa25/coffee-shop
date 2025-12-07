import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { menuService } from '../services/menu';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { coffeeIcon } from '../config/icons';

const Home = () => {
  const [popularItems, setPopularItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        const response = await menuService.getPopularItems();
        setPopularItems(response.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching popular items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularItems();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section with Parallax */}
      <section
        className="relative min-h-screen flex items-center justify-center text-white parallax overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(44, 25, 15, 0.20), rgba(139, 111, 71, 0.20)), url(https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&h=1080&fit=crop&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Animated Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-brown/30 gradient-animate"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 md:top-20 left-5 md:left-10 w-20 h-20 md:w-32 md:h-32 bg-brown/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 md:bottom-20 right-5 md:right-10 w-24 h-24 md:w-40 md:h-40 bg-brown/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        
        <div className="relative z-10 text-center px-4 animate-slide-up max-w-5xl py-20">
          <div className="mb-4 md:mb-6">
            <img src={coffeeIcon} alt="Coffee Icon" className="w-16 h-16 md:w-24 md:h-24 mx-auto animate-float" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif font-bold mb-4 md:mb-6 text-gradient-light leading-tight">
            Premium Crafted Coffee
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 md:mb-10 max-w-3xl mx-auto font-light tracking-wide">
            Experience the finest selection of artisan coffee and handmade desserts,
            <br className="hidden md:block" />
            crafted with passion and precision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/menu" className="btn-primary text-base md:text-lg px-8 md:px-10 py-3 md:py-4 hover-lift shadow-2xl">
              Explore Menu
            </Link>
            <Link to="/about" className="btn-outline text-base md:text-lg px-8 md:px-10 py-3 md:py-4 bg-white/10 hover:bg-white/20 border-white text-white">
              Our Story
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Features Section with Icons */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary-light to-brown text-cream relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-48 h-48 md:w-96 md:h-96 bg-cream rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-brown rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center mb-12 md:mb-16 text-cream px-4">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 px-4">
            {/* Premium Beans */}
            <div className="text-center group hover-lift bg-white/10 p-6 md:p-8 rounded-2xl glass-effect">
              <div className="mb-6 relative inline-block">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-brown to-brown-dark rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:animate-pulse-glow">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-cream" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-bold mb-3">
                Premium Beans
              </h3>
              <p className="text-cream-dark leading-relaxed text-sm md:text-base">
                Sourced from the finest coffee regions worldwide, roasted to perfection
              </p>
            </div>

            {/* Fast Delivery */}
            <div className="text-center group hover-lift bg-white/10 p-6 md:p-8 rounded-2xl glass-effect">
              <div className="mb-6 relative inline-block">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-brown to-brown-dark rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:animate-pulse-glow">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-cream" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-bold mb-3">
                Fast Delivery
              </h3>
              <p className="text-cream-dark leading-relaxed text-sm md:text-base">
                Fresh coffee delivered right to your doorstep within 30 minutes
              </p>
            </div>

            {/* Expert Baristas */}
            <div className="text-center group hover-lift bg-white/10 p-6 md:p-8 rounded-2xl glass-effect">
              <div className="mb-6 relative inline-block">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-brown to-brown-dark rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:animate-pulse-glow">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-cream" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-bold mb-3">
                Expert Baristas
              </h3>
              <p className="text-cream-dark leading-relaxed text-sm md:text-base">
                Crafted by award-winning coffee artisans with years of experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-cream-light to-white">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-16 px-4">
            <h2 className="section-title inline-block">
              <span className="text-gradient">Popular Products</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
              Discover our most beloved coffee creations, handpicked by our community
            </p>
          </div>

          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 px-4">
                {popularItems.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
              
              <div className="text-center mt-12 md:mt-16 px-4">
                <Link to="/menu" className="btn-primary px-8 md:px-12 py-3 md:py-4 text-base md:text-lg hover-lift inline-flex items-center gap-2 shadow-xl">
                  View Full Menu
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-primary text-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '30px 30px, 50px 50px',
            backgroundPosition: '0 0, 25px 25px'
          }}></div>
        </div>
        
        <div className="container-custom relative z-10 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div className="group">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-brown group-hover:scale-110 transition-transform">10K+</div>
              <div className="text-sm sm:text-base md:text-lg text-cream-dark">Happy Customers</div>
            </div>
            <div className="group">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-brown group-hover:scale-110 transition-transform">50+</div>
              <div className="text-sm sm:text-base md:text-lg text-cream-dark">Coffee Varieties</div>
            </div>
            <div className="group">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-brown group-hover:scale-110 transition-transform">15+</div>
              <div className="text-sm sm:text-base md:text-lg text-cream-dark">Years Experience</div>
            </div>
            <div className="group">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-brown group-hover:scale-110 transition-transform">98%</div>
              <div className="text-sm sm:text-base md:text-lg text-cream-dark">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Parallax */}
      <section
        className="py-24 md:py-40 text-white relative overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1920&h=800&fit=crop&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll', // Better for mobile
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"></div>
        
        <div className="container-custom text-center relative z-10 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 md:mb-8">
              <img src={coffeeIcon} alt="Coffee Icon" className="w-16 h-16 md:w-20 md:h-20 mx-auto opacity-90 animate-float" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold mb-6 md:mb-8 leading-tight">
              Start Your Coffee Journey Today
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 max-w-2xl mx-auto font-light">
              Join thousands of coffee lovers who trust us for their daily brew.
              <br className="hidden sm:block" />
              Experience excellence in every cup.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <Link to="/menu" className="btn-primary text-lg md:text-xl px-8 md:px-12 py-4 md:py-5 hover-lift shadow-2xl inline-flex items-center gap-3 justify-center">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Order Now
              </Link>
              <Link to="/contact" className="bg-white/20 glass-effect text-white text-lg md:text-xl px-8 md:px-12 py-4 md:py-5 rounded-lg font-medium hover:bg-white/30 transition-all hover-lift shadow-2xl inline-flex items-center gap-3 justify-center">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Visit Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
