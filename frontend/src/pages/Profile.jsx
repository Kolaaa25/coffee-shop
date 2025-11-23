import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { orderService } from '../services/orders';
import { formatPrice, formatDate } from '../utils/helpers';
import Loading from '../components/Loading';

const Profile = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getMyOrders();
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="py-20 animate-fade-in">
      <div className="container-custom max-w-4xl">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-serif font-bold text-primary mb-2">
                My Profile
              </h1>
              <p className="text-gray-600">Manage your account and orders</p>
            </div>
            <button onClick={handleLogout} className="btn-secondary">
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Name</p>
              <p className="text-lg font-semibold text-primary">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Email</p>
              <p className="text-lg font-semibold text-primary">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-serif font-bold text-primary mb-6">
            Order History
          </h2>

          {loading ? (
            <Loading />
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                No orders yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start ordering to see your order history here
              </p>
              <Link to="/menu" className="btn-primary">
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-600">
                        Order #{order.id}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-700">
                          {item.name} x {item.quantity}
                        </span>
                        <span className="font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">
                        Total Amount
                      </span>
                      <span className="text-xl font-bold text-brown">
                        {formatPrice(order.total || 0)}
                      </span>
                    </div>
                  </div>

                  {order.deliveryDetails && (
                    <div className="mt-4 pt-4 border-t text-sm text-gray-600">
                      <p className="font-semibold mb-1">Delivery Address:</p>
                      <p>
                        {order.deliveryDetails.address},{' '}
                        {order.deliveryDetails.city},{' '}
                        {order.deliveryDetails.zipCode}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
