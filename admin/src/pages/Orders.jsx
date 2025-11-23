import { useState } from 'react';

const Orders = () => {
  const [orders] = useState([
    { id: '#1234', customer: 'Іван Петренко', total: 245, status: 'Нове', date: '2025-11-19' },
    { id: '#1233', customer: 'Марія Коваль', total: 180, status: 'Готується', date: '2025-11-19' },
    { id: '#1232', customer: 'Петро Сидоренко', total: 320, status: 'Готово', date: '2025-11-18' },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Нове': return 'bg-blue-100 text-blue-700';
      case 'Готується': return 'bg-yellow-100 text-yellow-700';
      case 'Готово': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Замовлення</h1>

      <div className="card">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-left">
              <th className="pb-3 font-semibold">ID</th>
              <th className="pb-3 font-semibold">Клієнт</th>
              <th className="pb-3 font-semibold">Сума</th>
              <th className="pb-3 font-semibold">Статус</th>
              <th className="pb-3 font-semibold">Дата</th>
              <th className="pb-3 font-semibold">Дії</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b last:border-0">
                <td className="py-4 font-medium">{order.id}</td>
                <td className="py-4">{order.customer}</td>
                <td className="py-4">₴{order.total}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4">{order.date}</td>
                <td className="py-4">
                  <button className="text-brown hover:underline">Деталі</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
