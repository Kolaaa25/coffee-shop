import { AlertCircle } from 'lucide-react';

const Inventory = () => {
  const items = [
    { id: 1, name: 'Кавові зерна Арабіка', quantity: 45, unit: 'кг', min: 20, status: 'ok' },
    { id: 2, name: 'Молоко', quantity: 15, unit: 'л', min: 20, status: 'low' },
    { id: 3, name: 'Цукор', quantity: 8, unit: 'кг', min: 10, status: 'low' },
    { id: 4, name: 'Одноразові стакани', quantity: 450, unit: 'шт', min: 100, status: 'ok' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Інвентар</h1>

      <div className="card">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-left">
              <th className="pb-3 font-semibold">Товар</th>
              <th className="pb-3 font-semibold">Кількість</th>
              <th className="pb-3 font-semibold">Мін. запас</th>
              <th className="pb-3 font-semibold">Статус</th>
              <th className="pb-3 font-semibold">Дії</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b last:border-0">
                <td className="py-4">{item.name}</td>
                <td className="py-4">
                  {item.quantity} {item.unit}
                </td>
                <td className="py-4">{item.min} {item.unit}</td>
                <td className="py-4">
                  {item.status === 'low' ? (
                    <span className="flex items-center gap-2 text-red-600">
                      <AlertCircle size={16} />
                      Низький запас
                    </span>
                  ) : (
                    <span className="text-green-600">В наявності</span>
                  )}
                </td>
                <td className="py-4">
                  <button className="text-brown hover:underline">Поповнити</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
