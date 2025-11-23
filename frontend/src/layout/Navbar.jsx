import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const cartCount = useCartStore((state) => state.getCount());
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-gradient-to-r from-primary via-primary-light to-primary text-cream shadow-2xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-brown to-brown-dark rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
              <img src="/espresso.png" alt="Coffee Icon" className="w-8 h-8" />
            </div>
            <span className="text-2xl font-bold font-serif group-hover:text-brown transition-colors">
              Coffee House
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative hover:text-brown transition-colors duration-300 font-medium text-lg group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brown transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Link
              to="/admin/dashboard"
              className="relative bg-brown hover:bg-brown-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              Admin Panel
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative hover:text-brown transition-all duration-300 group p-2"
            >
              <svg
                className="w-7 h-7 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-brown to-brown-dark text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse-glow">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 hover:text-brown transition-colors duration-300 font-medium group"
                >
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  {user?.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-brown hover:bg-brown-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-brown hover:bg-brown-dark text-white px-8 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 pt-2 animate-slide-up bg-white/5 rounded-b-2xl backdrop-blur-lg">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-3 px-4 hover:bg-white/10 hover:text-brown transition-all duration-200 rounded-lg mx-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/cart"
              className="flex items-center justify-between py-3 px-4 hover:bg-white/10 hover:text-brown transition-all duration-200 rounded-lg mx-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="bg-brown text-white text-xs rounded-full px-3 py-1 font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 py-3 px-4 bg-brown hover:bg-brown-dark text-white transition-all duration-200 rounded-lg mx-2 mt-2 font-medium shadow-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              Admin Panel
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="block py-3 px-4 hover:bg-white/10 hover:text-brown transition-all duration-200 rounded-lg mx-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block py-3 px-4 hover:bg-white/10 hover:text-brown transition-all duration-200 rounded-lg mx-2 text-left w-full font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block py-3 px-4 bg-brown hover:bg-brown-dark text-white transition-all duration-200 rounded-lg mx-2 mt-2 text-center font-medium shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
