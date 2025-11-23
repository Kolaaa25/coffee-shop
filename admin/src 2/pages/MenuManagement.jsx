import { Plus } from 'lucide-react';
import { useState } from 'react';

const MenuManagement = () => {
  const [items] = useState([
    { id: 1, name: 'Еспресо', price: 45, category: 'Кава', stock: 'В наявності' },
    { id: 2, name: 'Капучино', price: 65, category: 'Кава', stock: 'В наявності' },
    { id: 3, name: 'Латте', price: 70, category: 'Кава', stock: 'В наявності' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Управління меню</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Додати позицію
        </button>
      </div>

      <div className="card">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-left">
              <th className="pb-3 font-semibold">Назва</th>
              <th className="pb-3 font-semibold">Ціна</th>
              <th className="pb-3 font-semibold">Категорія</th>
              <th className="pb-3 font-semibold">Статус</th>
              <th className="pb-3 font-semibold">Дії</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b last:border-0">
                <td className="py-4">{item.name}</td>
                <td className="py-4">₴{item.price}</td>
                <td className="py-4">{item.category}</td>
                <td className="py-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {item.stock}
                  </span>
                </td>
                <td className="py-4">
                  <button className="text-brown hover:underline mr-3">Редагувати</button>
                  <button className="text-red-600 hover:underline">Видалити</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenuManagement;
