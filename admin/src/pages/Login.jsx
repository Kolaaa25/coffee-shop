import { useState } from 'react';
import { Coffee } from 'lucide-react';
import useAuthStore from '../stores/authStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Тимчасова авторизація (пізніше підключимо API)
    if (email === 'admin@coffee.com' && password === 'admin123') {
      const user = {
        id: 1,
        name: 'Адміністратор',
        email: email,
        role: 'Admin',
      };
      const token = 'demo-token-' + Date.now();
      login(user, token);
    } else {
      setError('Невірний email або пароль');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-dark via-brown to-brown-light flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-brown rounded-full mb-4">
            <Coffee size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-brown mb-2">Coffee House</h1>
          <p className="text-gray-600">Адміністративна панель</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="admin@coffee.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full py-3 text-lg">
            Увійти
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-900 font-medium mb-1">Демо-доступ:</p>
          <p className="text-xs text-blue-700">Email: admin@coffee.com</p>
          <p className="text-xs text-blue-700">Пароль: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
