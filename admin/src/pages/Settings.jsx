const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Налаштування</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Загальні налаштування</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Назва закладу
              </label>
              <input
                type="text"
                defaultValue="Coffee House"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email для повідомлень
              </label>
              <input
                type="email"
                defaultValue="info@coffee.com"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Телефон
              </label>
              <input
                type="tel"
                defaultValue="+380 44 123 4567"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Налаштування платежів</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Мінімальна сума замовлення (₴)
              </label>
              <input
                type="number"
                defaultValue="100"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Безкоштовна доставка від (₴)
              </label>
              <input
                type="number"
                defaultValue="500"
                className="input-field"
              />
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm text-gray-700">Прийом готівки</span>
              </label>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Повідомлення</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-sm text-gray-700">Email про нові замовлення</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-sm text-gray-700">SMS повідомлення</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm text-gray-700">Push-сповіщення</span>
            </label>
          </div>
        </div>

        {/* Working Hours */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Робочі години</h2>
          <div className="space-y-3">
            <div className="flex gap-4">
              <input type="time" defaultValue="08:00" className="input-field flex-1" />
              <input type="time" defaultValue="22:00" className="input-field flex-1" />
            </div>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-sm text-gray-700">Працюємо у вихідні</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn-primary">Зберегти зміни</button>
      </div>
    </div>
  );
};

export default Settings;
