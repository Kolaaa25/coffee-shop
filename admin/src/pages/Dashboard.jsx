import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, ShoppingBag, Users } from 'lucide-react';

const Dashboard = () => {
  // Демо дані для графіків
  const salesData = [
    { name: 'Пн', sales: 4200 },
    { name: 'Вт', sales: 3800 },
    { name: 'Ср', sales: 5100 },
    { name: 'Чт', sales: 4700 },
    { name: 'Пт', sales: 6200 },
    { name: 'Сб', sales: 8500 },
    { name: 'Нд', sales: 7800 },
  ];

  const topProducts = [
    { name: 'Еспресо', sales: 145 },
    { name: 'Капучино', sales: 132 },
    { name: 'Латте', sales: 121 },
    { name: 'Макіато', sales: 98 },
  ];

  const stats = [
    { label: 'Продажі сьогодні', value: '₴8,450', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Замовлення', value: '64', icon: ShoppingBag, color: 'bg-blue-500' },
    { label: 'Клієнти', value: '892', icon: Users, color: 'bg-purple-500' },
    { label: 'Зріст', value: '+12%', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Дашборд</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Продажі за тиждень</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#8B6F47" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Топ продукти</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#8B6F47" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
