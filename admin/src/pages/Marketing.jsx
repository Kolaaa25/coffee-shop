import { Plus } from 'lucide-react';

const Marketing = () => {
  const promos = [
    { id: 1, code: 'COFFEE20', discount: '20%', uses: 145, status: 'Активний', expires: '2025-12-31' },
    { id: 2, code: 'WELCOME', discount: '10%', uses: 89, status: 'Активний', expires: '2026-01-15' },
    { id: 3, code: 'SUMMER23', discount: '15%', uses: 234, status: 'Закінчився', expires: '2025-09-30' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Маркетинг</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Створити промокод
        </button>
      </div>

      <div className="card">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-left">
              <th className="pb-3 font-semibold">Промокод</th>
              <th className="pb-3 font-semibold">Знижка</th>
              <th className="pb-3 font-semibold">Використань</th>
              <th className="pb-3 font-semibold">Статус</th>
              <th className="pb-3 font-semibold">Дійсний до</th>
              <th className="pb-3 font-semibold">Дії</th>
            </tr>
          </thead>
          <tbody>
            {promos.map((promo) => (
              <tr key={promo.id} className="border-b last:border-0">
                <td className="py-4 font-mono font-bold">{promo.code}</td>
                <td className="py-4">{promo.discount}</td>
                <td className="py-4">{promo.uses}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    promo.status === 'Активний' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {promo.status}
                  </span>
                </td>
                <td className="py-4">{promo.expires}</td>
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

export default Marketing;
