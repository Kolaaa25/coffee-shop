import { Link } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, Menu, TrendingUp } from 'lucide-react';

const AdminPortfolio = () => {
  const features = [
    {
      icon: LayoutDashboard,
      title: 'Dashboard',
      description: 'Real-time analytics, sales tracking, and order statistics',
      path: '/admin/dashboard',
      color: 'from-blue-500 to-blue-600',
      stats: 'Live Stats'
    },
    {
      icon: Menu,
      title: 'Menu Management',
      description: 'Full CRUD operations for menu items with image support',
      path: '/admin/menu',
      color: 'from-green-500 to-green-600',
      stats: '16 Items'
    },
    {
      icon: ShoppingBag,
      title: 'Orders',
      description: 'Manage orders, update status, view details in real-time',
      path: '/admin/orders',
      color: 'from-purple-500 to-purple-600',
      stats: 'Real-time Updates'
    },
    {
      icon: Package,
      title: 'Inventory',
      description: 'Stock management with low stock alerts and value tracking',
      path: '/admin/inventory',
      color: 'from-orange-500 to-orange-600',
      stats: 'Smart Alerts'
    },
    {
      icon: Users,
      title: 'Customers',
      description: 'View customer database with registration dates',
      path: '/admin/customers',
      color: 'from-pink-500 to-pink-600',
      stats: 'User Management'
    },
    {
      icon: Settings,
      title: 'Settings',
      description: 'System configuration and preferences',
      path: '/admin/settings',
      color: 'from-gray-500 to-gray-600',
      stats: 'Configuration'
    }
  ];

  const techStack = [
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'SQLite', icon: '💾' },
    { name: 'Express', icon: '🚂' },
    { name: 'Tailwind CSS', icon: '🎨' },
    { name: 'Zustand', icon: '🐻' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brown-light/10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brown via-brown-dark to-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Portfolio Project - Full Stack Admin Panel</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              ☕ Coffee Shop Admin Panel
            </h1>
            <p className="text-xl text-cream mb-8 leading-relaxed">
              Full-stack admin dashboard with real-time data management, 
              inventory tracking, and comprehensive order processing system
            </p>
            
            {/* Info Box */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 text-left max-w-2xl mx-auto border border-white/20">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Quick Links to Main Site
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  to="/menu"
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <div>
                    <p className="font-semibold">Explore Menu</p>
                    <p className="text-sm text-cream/80">Browse our coffee selection</p>
                  </div>
                </Link>
                <Link
                  to="/about"
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold">Our Story</p>
                    <p className="text-sm text-cream/80">Learn about our journey</p>
                  </div>
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/admin/dashboard"
                className="bg-white text-brown px-8 py-4 rounded-lg font-bold text-lg hover:bg-cream transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center gap-2"
              >
                <LayoutDashboard size={24} />
                Open Dashboard
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brown-dark text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center gap-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View Source Code
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-4">Admin Features</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Comprehensive management system with modern UI/UX and real-time functionality
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={index}
                to={feature.path}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-brown transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex items-center gap-2 text-brown font-medium">
                  <span>{feature.stats}</span>
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-gradient-to-r from-gray-900 to-brown-dark text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Tech Stack</h2>
          <div className="flex flex-wrap gap-6 justify-center max-w-4xl mx-auto">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-3 hover:bg-white/20 transition-all transform hover:scale-105"
              >
                <span className="text-2xl">{tech.icon}</span>
                <span className="font-medium text-lg">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Key Highlights</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 text-blue-900">🎨 Modern UI/UX</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Responsive design for all devices</li>
                <li>✓ Intuitive navigation and layouts</li>
                <li>✓ Beautiful animations and transitions</li>
                <li>✓ Professional color schemes</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 text-green-900">⚡ Real-time Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Live order status updates</li>
                <li>✓ Dynamic inventory tracking</li>
                <li>✓ Instant data synchronization</li>
                <li>✓ Real-time statistics</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 text-purple-900">🔧 Full CRUD Operations</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Create, Read, Update, Delete</li>
                <li>✓ Image upload and preview</li>
                <li>✓ Form validation</li>
                <li>✓ Error handling</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 text-orange-900">📊 Data Management</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ SQLite database integration</li>
                <li>✓ RESTful API architecture</li>
                <li>✓ Data validation and sanitization</li>
                <li>✓ Efficient query optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-brown to-brown-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Explore?</h2>
          <p className="text-xl text-cream mb-8 max-w-2xl mx-auto">
            Experience the full functionality of this admin panel and see how it manages 
            a complete e-commerce coffee shop system
          </p>
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-3 bg-white text-brown px-10 py-4 rounded-lg font-bold text-lg hover:bg-cream transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <LayoutDashboard size={24} />
            Launch Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPortfolio;
