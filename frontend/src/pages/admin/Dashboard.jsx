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
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState('month'); // day, week, month

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterOrdersByTime();
  }, [timeFilter, allOrders]);

  const fetchData = async () => {
    try {
      setError(null);
      const [statsData, ordersData] = await Promise.all([
        statsAPI.getDashboard(),
        ordersAPI.getAll(),
      ]);
      
      console.log('Stats data:', statsData);
      console.log('Orders data:', ordersData);
      
      setStats(statsData || {
        todaySales: 0,
        todayOrders: 0,
        totalCustomers: 0,
        totalOrders: 0,
      });
      
      // Handle both array and object responses
      const orders = Array.isArray(ordersData) ? ordersData : (ordersData?.data || []);
      setAllOrders(orders);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
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

    setRecentOrders(filtered.slice(0, 10));
  };

  const statsCards = [
    { label: 'Total Sales', value: `$${typeof stats.totalRevenue === 'number' ? stats.totalRevenue.toFixed(2) : '0.00'}`, icon: DollarSign, color: 'bg-green-500' },
    { label: 'Today Orders', value: stats.todayOrders, icon: ShoppingBag, color: 'bg-blue-500' },
    { label: 'Customers', value: stats.totalCustomers, icon: Users, color: 'bg-purple-500' },
    { label: 'Total Orders', value: stats.totalOrders, icon: TrendingUp, color: 'bg-orange-500' },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown mx-auto mb-4"></div>
            <div className="text-xl text-gray-600">Loading dashboard...</div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">{error}</div>
            <button 
              onClick={fetchData}
              className="px-4 py-2 bg-brown text-white rounded-lg hover:bg-brown-dark"
            >
              Retry
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-md p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs md:text-sm text-gray-600 mb-1 truncate">{stat.label}</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900 truncate">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ml-2`}>
                    <Icon className="text-white" size={20} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              Recent Orders ({recentOrders.length})
            </h2>
            <div className="flex gap-1 md:gap-2 flex-wrap">
              <button
                onClick={() => setTimeFilter('day')}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm font-medium transition ${
                  timeFilter === 'day'
                    ? 'bg-brown text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setTimeFilter('week')}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm font-medium transition ${
                  timeFilter === 'week'
                    ? 'bg-brown text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeFilter('month')}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm font-medium transition ${
                  timeFilter === 'month'
                    ? 'bg-brown text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Month
              </button>
            </div>
          </div>
          
          {/* Mobile Cards View */}
          <div className="block md:hidden space-y-3">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order.id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">#{order.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'completed' || order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'processing' || order.status === 'preparing' ? 'bg-yellow-100 text-yellow-700' :
                      order.status === 'ready' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'confirmed' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {order.customer_name || order.user_name || `User #${order.user_id}`}
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">${typeof order.total === 'number' ? order.total.toFixed(2) : '0.00'}</span>
                    <span className="text-gray-500">{new Date(order.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-gray-500">
                No orders for this period
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
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
                          order.status === 'completed' || order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'processing' || order.status === 'preparing' ? 'bg-yellow-100 text-yellow-700' :
                          order.status === 'ready' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'confirmed' ? 'bg-purple-100 text-purple-700' :
                          'bg-gray-100 text-gray-700'
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
                      No orders for this period
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
