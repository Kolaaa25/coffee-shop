import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { menuAPI } from '../../services/admin';
import { AlertCircle, Package, TrendingUp, Edit } from 'lucide-react';

const AdminInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [stockData, setStockData] = useState({ stock: 0, minStock: 0 });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const menuData = await menuAPI.getAll();
      console.log('📦 Fetched inventory:', menuData);
      
      // Load stock data from localStorage or use random for demo
      const inventoryData = menuData.map(item => {
        const savedStock = localStorage.getItem(`stock_${item.id}`);
        const savedMinStock = localStorage.getItem(`minStock_${item.id}`);
        
        return {
          ...item,
          stock: savedStock ? parseInt(savedStock) : Math.floor(Math.random() * 100) + 10,
          minStock: savedMinStock ? parseInt(savedMinStock) : 20
        };
      });
      
      setInventory(inventoryData);
    } catch (error) {
      console.error('❌ Error fetching inventory:', error);
      alert('Failed to fetch inventory!');
    } finally {
      setLoading(false);
    }
  };

  const handleEditStock = (item) => {
    setEditingItem(item);
    setStockData({ stock: item.stock, minStock: item.minStock });
    setShowModal(true);
  };

  const handleUpdateStock = () => {
    // Save to localStorage (in real app would save to database)
    localStorage.setItem(`stock_${editingItem.id}`, stockData.stock);
    localStorage.setItem(`minStock_${editingItem.id}`, stockData.minStock);
    
    // Update state
    setInventory(prev => prev.map(item => 
      item.id === editingItem.id 
        ? { ...item, stock: parseInt(stockData.stock), minStock: parseInt(stockData.minStock) }
        : item
    ));
    
    setShowModal(false);
    alert('Stock updated successfully!');
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  const lowStockCount = inventory.filter(item => item.stock < item.minStock).length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.stock * item.price), 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{inventory.length}</p>
              </div>
              <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center">
                <Package className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Low Stock Items</p>
                <p className="text-2xl font-bold text-red-600">{lowStockCount}</p>
              </div>
              <div className="bg-red-500 w-12 h-12 rounded-lg flex items-center justify-center">
                <AlertCircle className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Inventory Value</p>
                <p className="text-2xl font-bold text-green-600">${totalValue.toFixed(2)}</p>
              </div>
              <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-white" size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Stock Levels</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="pb-3 font-semibold">Product</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Price</th>
                  <th className="pb-3 font-semibold">Stock Level</th>
                  <th className="pb-3 font-semibold">Min Stock</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.length > 0 ? (
                  inventory.map((item) => (
                    <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                      <td className="py-4 font-medium">{item.name}</td>
                      <td className="py-4">
                        <span className="px-3 py-1 bg-brown bg-opacity-10 text-brown rounded-full text-sm capitalize">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 text-green-600 font-semibold">${item.price}</td>
                      <td className="py-4">
                        <span className={`font-bold ${item.stock < item.minStock ? 'text-red-600' : 'text-gray-900'}`}>
                          {item.stock}
                        </span>
                      </td>
                      <td className="py-4 text-gray-600">{item.minStock}</td>
                      <td className="py-4">
                        {item.stock < item.minStock ? (
                          <span className="flex items-center text-red-600 font-medium">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Low Stock
                          </span>
                        ) : item.stock < item.minStock * 2 ? (
                          <span className="text-yellow-600 font-medium">Medium</span>
                        ) : (
                          <span className="text-green-600 font-medium">Good</span>
                        )}
                      </td>
                      <td className="py-4">
                        <button 
                          onClick={() => handleEditStock(item)}
                          className="p-2 text-brown hover:bg-brown hover:bg-opacity-10 rounded transition"
                          title="Update Stock"
                        >
                          <Edit size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-gray-500">
                      No inventory items
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Update Stock Modal */}
        {showModal && editingItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Update Stock</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Product</p>
                  <p className="font-bold text-lg">{editingItem.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Stock Level
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stockData.stock}
                    onChange={(e) => setStockData({...stockData, stock: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Stock Level
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stockData.minStock}
                    onChange={(e) => setStockData({...stockData, minStock: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Alert when stock falls below this level
                  </p>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={handleUpdateStock}
                    className="flex-1 bg-brown text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition font-medium"
                  >
                    Update Stock
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminInventory;
