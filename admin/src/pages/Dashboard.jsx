import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, ShoppingBag, Users } from 'lucide-react';
import axios from '../utils/axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    todaySales: 0,
    todayOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get('/stats/dashboard');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Демо дані для графіків (поки що)
  const salesData = [
    { name: 'Пн', sales: 4200 },
    { name: 'Вт', sales: 3800 },
    { name: 'Ср', sales: 5100 },
    { name: 'Чт', sales: 4700 },
    { name: 'Пт', sales: 6200 },
    { name: 'Сб', sales: 8500 },
    { name: 'Нд', sales: 7800 },
  ];

  const topProducts = [
    { name: 'Еспресо', sales: 145 },
    { name: 'Капучино', sales: 132 },
    { name: 'Латте', sales: 121 },
    { name: 'Макіато', sales: 98 },
  ];

  const statsCards = [
    { label: 'Загальний дохід', value: loading ? '...' : `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'bg-green-500' },
    { label: 'Продажі сьогодні', value: loading ? '...' : `$${stats.todaySales.toFixed(2)}`, icon: TrendingUp, color: 'bg-blue-500' },
    { label: 'Всього замовлень', value: loading ? '...' : stats.totalOrders.toString(), icon: ShoppingBag, color: 'bg-orange-500' },
    { label: 'Всього клієнтів', value: loading ? '...' : stats.totalCustomers.toString(), icon: Users, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Дашборд</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Продажі за тиждень</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#8B6F47" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Топ продукти</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#8B6F47" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
