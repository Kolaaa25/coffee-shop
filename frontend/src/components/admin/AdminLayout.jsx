import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Coffee,
  ShoppingBag,
  Users,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { coffeeIcon } from '../../config/icons';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/menu', icon: Coffee, label: 'Menu' },
    { path: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
    { path: '/admin/customers', icon: Users, label: 'Customers' },
    { path: '/admin/inventory', icon: Package, label: 'Inventory' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          ${isMobile 
            ? `fixed inset-y-0 left-0 z-50 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}` 
            : `${sidebarOpen ? 'w-64' : 'w-20'}`
          }
          bg-white shadow-lg transition-all duration-300 flex flex-col
        `}
      >
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img src={coffeeIcon} alt="Logo" className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0" />
            {(sidebarOpen || isMobile) && (
              <div className="min-w-0">
                <h1 className="text-lg md:text-xl font-bold text-brown truncate">Coffee House</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            )}
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-auto p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        <nav className="flex-1 p-3 md:p-4 space-y-1 md:space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-brown text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                {(sidebarOpen || isMobile) && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 md:p-4 border-t border-gray-200">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <LogOut size={20} className="flex-shrink-0" />
            {(sidebarOpen || isMobile) && <span>Back to Site</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen && !isMobile ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex items-center gap-2 md:gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  Administrator
                </p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-brown rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">
                A
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
