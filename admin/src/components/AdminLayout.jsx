import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Coffee,
  ShoppingBag,
  Users,
  Package,
  Megaphone,
  UserCog,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import useAuthStore from '../stores/authStore';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Дашборд' },
    { path: '/menu', icon: Coffee, label: 'Меню' },
    { path: '/orders', icon: ShoppingBag, label: 'Замовлення' },
    { path: '/customers', icon: Users, label: 'Клієнти' },
    { path: '/inventory', icon: Package, label: 'Інвентар' },
    { path: '/marketing', icon: Megaphone, label: 'Маркетинг' },
    { path: '/users', icon: UserCog, label: 'Користувачі' },
    { path: '/settings', icon: Settings, label: 'Налаштування' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white shadow-lg transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img src="public/espresso.png" alt="Logo" className="w-10 h-10" />
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold text-brown">Coffee House</h1>
                <p className="text-xs text-gray-500">Адмін панель</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-item ${
                  isActive ? 'sidebar-item-active' : 'sidebar-item-inactive'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={logout}
            className="sidebar-item sidebar-item-inactive w-full"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Вийти</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
              <div className="w-10 h-10 bg-brown rounded-full flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
