const Customers = () => {
  const customers = [
    { id: 1, name: 'Іван Петренко', email: 'ivan@mail.com', orders: 24, loyalty: 'Gold' },
    { id: 2, name: 'Марія Коваль', email: 'maria@mail.com', orders: 18, loyalty: 'Silver' },
    { id: 3, name: 'Петро Сидоренко', email: 'petro@mail.com', orders: 8, loyalty: 'Bronze' },
  ];

  const getLoyaltyColor = (level) => {
    switch (level) {
      case 'Gold': return 'bg-yellow-100 text-yellow-700';
      case 'Silver': return 'bg-gray-100 text-gray-700';
      case 'Bronze': return 'bg-orange-100 text-orange-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Клієнти</h1>

      <div className="card">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-left">
              <th className="pb-3 font-semibold">Ім'я</th>
              <th className="pb-3 font-semibold">Email</th>
              <th className="pb-3 font-semibold">Замовлень</th>
              <th className="pb-3 font-semibold">Рівень лояльності</th>
              <th className="pb-3 font-semibold">Дії</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b last:border-0">
                <td className="py-4">{customer.name}</td>
                <td className="py-4">{customer.email}</td>
                <td className="py-4">{customer.orders}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${getLoyaltyColor(customer.loyalty)}`}>
                    {customer.loyalty}
                  </span>
                </td>
                <td className="py-4">
                  <button className="text-brown hover:underline">Переглянути</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
