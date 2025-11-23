import { Plus } from 'lucide-react';

const Users = () => {
  const users = [
    { id: 1, name: 'Олена Адмін', email: 'admin@coffee.com', role: 'Admin', status: 'Активний' },
    { id: 2, name: 'Ігор Менеджер', email: 'manager@coffee.com', role: 'Manager', status: 'Активний' },
    { id: 3, name: 'Катя Баріста', email: 'barista@coffee.com', role: 'Barista', status: 'Активний' },
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-700';
      case 'Manager': return 'bg-blue-100 text-blue-700';
      case 'Barista': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Користувачі системи</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Додати користувача
        </button>
      </div>

      <div className="card">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-left">
              <th className="pb-3 font-semibold">Ім'я</th>
              <th className="pb-3 font-semibold">Email</th>
              <th className="pb-3 font-semibold">Роль</th>
              <th className="pb-3 font-semibold">Статус</th>
              <th className="pb-3 font-semibold">Дії</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b last:border-0">
                <td className="py-4">{user.name}</td>
                <td className="py-4">{user.email}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-4">
                  <span className="text-green-600">{user.status}</span>
                </td>
                <td className="py-4">
                  <button className="text-brown hover:underline mr-3">Редагувати</button>
                  <button className="text-red-600 hover:underline">Деактивувати</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
