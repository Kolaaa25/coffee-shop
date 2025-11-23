import { useState, useEffect } from 'react';
import axios from '../utils/axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/orders');
      console.log('📦 Orders fetched:', response.data);
      setOrders(response.data);
    } catch (err) {
      console.error('❌ Error fetching orders:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const statusMap = {
      'pending': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Нове' },
      'paid': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Оплачено' },
      'processing': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Готується' },
      'completed': { bg: 'bg-green-100', text: 'text-green-700', label: 'Готово' },
      'cancelled': { bg: 'bg-red-100', text: 'text-red-700', label: 'Скасовано' },
    };
    return statusMap[status] || { bg: 'bg-gray-100', text: 'text-gray-700', label: status };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Замовлення</h1>
        <div className="card text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown mx-auto"></div>
          <p className="mt-4 text-gray-600">Завантаження замовлень...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Замовлення</h1>
        <div className="card text-center py-12">
          <p className="text-red-600 mb-4">❌ {error}</p>
          <button 
            onClick={fetchOrders}
            className="btn-primary"
          >
            Спробувати знову
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Замовлення</h1>
        <button 
          onClick={fetchOrders}
          className="btn-secondary"
        >
          🔄 Оновити
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-600 text-lg mb-2">📦 Немає замовлень</p>
          <p className="text-gray-500 text-sm">Замовлення з'являться тут після оформлення покупки</p>
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="pb-3 font-semibold">ID</th>
                <th className="pb-3 font-semibold">Клієнт</th>
                <th className="pb-3 font-semibold">Email</th>
                <th className="pb-3 font-semibold">Товарів</th>
                <th className="pb-3 font-semibold">Сума</th>
                <th className="pb-3 font-semibold">Статус</th>
                <th className="pb-3 font-semibold">Дата</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const statusInfo = getStatusColor(order.status);
                return (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-4 font-medium">#{order.id}</td>
                    <td className="py-4">{order.user_name || 'N/A'}</td>
                    <td className="py-4 text-sm text-gray-600">{order.user_email}</td>
                    <td className="py-4 text-sm">
                      {Array.isArray(order.items) ? order.items.length : 0} шт.
                    </td>
                    <td className="py-4 font-semibold">${order.total?.toFixed(2) || '0.00'}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${statusInfo.bg} ${statusInfo.text}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-600">{formatDate(order.created_at)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
