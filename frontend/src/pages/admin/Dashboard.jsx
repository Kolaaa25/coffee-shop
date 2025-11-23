import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import { statsAPI, ordersAPI } from '../../services/admin';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    todaySales: 0,
    todayOrders: 0,
    totalCustomers: 0,
    totalOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('week'); // day, week, month

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterOrdersByTime();
  }, [timeFilter, allOrders]);

  const fetchData = async () => {
    try {
      const [statsData, ordersData] = await Promise.all([
        statsAPI.getDashboard(),
        ordersAPI.getAll(),
      ]);
      
      setStats(statsData);
      setAllOrders(ordersData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterOrdersByTime = () => {
    const now = new Date();
    let filtered = [];

    switch (timeFilter) {
      case 'day':
        filtered = allOrders.filter(order => {
          const orderDate = new Date(order.created_at);
          return orderDate.toDateString() === now.toDateString();
        });
        break;
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filtered = allOrders.filter(order => {
          const orderDate = new Date(order.created_at);
          return orderDate >= weekAgo;
        });
        break;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        filtered = allOrders.filter(order => {
          const orderDate = new Date(order.created_at);
          return orderDate >= monthAgo;
        });
        break;
      default:
        filtered = allOrders;
    }

    setRecentOrders(filtered.slice(0, 5));
  };

  const statsCards = [
    { label: 'Today Sales', value: `$${typeof stats.todaySales === 'number' ? stats.todaySales.toFixed(2) : '0.00'}`, icon: DollarSign, color: 'bg-green-500' },
    { label: 'Orders', value: stats.todayOrders, icon: ShoppingBag, color: 'bg-blue-500' },
    { label: 'Customers', value: stats.totalCustomers, icon: Users, color: 'bg-purple-500' },
    { label: 'Total Orders', value: stats.totalOrders, icon: TrendingUp, color: 'bg-orange-500' },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
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

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setTimeFilter('day')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  timeFilter === 'day'
                    ? 'bg-brown text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setTimeFilter('week')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  timeFilter === 'week'
                    ? 'bg-brown text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeFilter('month')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  timeFilter === 'month'
                    ? 'bg-brown text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Month
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="pb-3 font-semibold">Order ID</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Total</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="py-4 font-medium">#{order.id}</td>
                      <td className="py-4">{order.customer_name || order.user_name || `User #${order.user_id}`}</td>
                      <td className="py-4">${typeof order.total === 'number' ? order.total.toFixed(2) : '0.00'}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          order.status === 'completed' ? 'bg-green-100 text-green-700' :
                          order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4">{new Date(order.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-500">
                      No orders yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
